from .views import save_profile_data, change_image, change_name, return_profile
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('save-profile/', save_profile_data, name='save_profile'),
    path('change-image/', change_image, name='change_image'),
    path('change-name/', change_name, name='change_name'),
    path('return-profile/', return_profile, name='return_profile')
    #may need to include upload
]