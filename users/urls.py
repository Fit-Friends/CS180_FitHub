from django import views
from django.contrib import admin
from django.urls import include, path

from users.views import GetUserIdByEmail

urlpatterns = [
    path('register/', include('dj_rest_auth.registration.urls')),
    path('',include('dj_rest_auth.urls')),
    path('getid',GetUserIdByEmail.as_view())
]
