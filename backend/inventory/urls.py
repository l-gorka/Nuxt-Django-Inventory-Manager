from rest_framework.routers import DefaultRouter
from pens.views import PenViewSet, UserData
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin112/', admin.site.urls, name='admin'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('user/me/', UserData.as_view() )
]

router = DefaultRouter()
router.register('api/pens', PenViewSet, basename='pens')

urlpatterns += router.urls
