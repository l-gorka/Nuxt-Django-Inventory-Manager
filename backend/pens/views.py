from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import Pen
from .serializers import PenSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated

class PenViewSet(viewsets.ViewSet):
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
        
    def list(self, request):
        queryset = Pen.objects.all()
        serializer = PenSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Pen.objects.all()
        pen = get_object_or_404(queryset, pk=pk)
        serializer = PenSerializer(pen)
        return Response(serializer.data)

    def create(self, request):
        serializer = PenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response('Not valid', 400)
    
    def update(self, request, pk=None):
        queryset = Pen.objects.all()
        pen = get_object_or_404(queryset, pk=pk)
        serializer = PenSerializer(pen, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response('Not valid', 400)

    def destroy(self, request, pk=None):
        try:
            Pen.objects.get(pk=pk).delete()
            return Response('Item deleted', 202)
        except:
            return Response('Not valid', 400)


class UserData(APIView):

    def get(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except:
            return Response('not valid', 400)