from django.shortcuts import render

# Create your views here.
#get and post functions
from django.http import HttpResponse
from django.http import FileResponse
from django.conf import settings
import os
    
from rest_framework.decorators import api_view, permission_classes
#from rest_framework.Response import Response
from django.http import JsonResponse
#from django.http import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_profile_data(request):
    profile = request.user.profile
    serializer = ProfileSerializer(profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data) #JsonResponse
    return JsonResponse(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_image(request):
    profile = request.user.profile
    new_image = request.data.get('image') 
    if new_image:
        serializer = ProfileSerializer(instance=profile, data={'image': new_image}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"Profile image successfully updated."})
        else:
            return JsonResponse(serializer.errors, status=400)
    else:
        return JsonResponse({"error"}, status=400)

#change username
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_name(request):
    profile = request.user.profile
    
    #get username from request
    new_username = request.data.get('new_username')
    #validate name
    serializer = ProfileSerializer(instance=Profile, data={'username' : new_username}, partial=True)
    if serializer.is_valid(raise_exception=True): 
    #save
        serializer.save()
        return JsonResponse({"Username successfully updated."})
    return JsonResponse({"Error saving data"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def return_profile(request):
    profile = request.user.profile
    serializer = ProfileSerializer(profile)
    return JsonResponse(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_name(request):
    profile = request.user.profile
    return JsonResponse({"username": profile.username})


'''
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_image(request):
    profile = request.user.profile
    image_path = os.path.join(
        
        
        settings.MEDIA_ROOT, str(profile.image))
    

    def get_upload_path(instance, profile_pic):
        return os.path.join('images', str(profile.image), profile_pic)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_image(request):
    profile = request.user.profile
    if profile.profile_pic:
        image_path = os.path.join('images', str(profile.image), profile_pic)
    return FileResponse(open(image_path, 'rb'), content_type ='images/jpeg')
    image_path = os.path.join(settings.MEDIA_ROOT, str(profile.profile_pic))
    '''