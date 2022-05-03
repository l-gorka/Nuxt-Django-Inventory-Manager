from rest_framework import serializers

from .models import Pen
from django.contrib.auth.models import User

class PenSerializer(serializers.ModelSerializer):
    class Meta():
        model = Pen
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff')
