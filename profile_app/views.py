from django.shortcuts import render

# Create your views here.
#get and post functions
    
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
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
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_image(request):
    profile = request.user.profile
    #code
    return Response({"Profile picture successfully updated."})

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
        return Response({"Username successfully updated."})
    return Response({"Error saving data"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def return_profile(request):
    profile = request.user.profile
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

