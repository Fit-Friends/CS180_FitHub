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
    serializer = ProfileSerializer(instance=profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_image(request):
    profile = request.user.profile
    new_image = request.data.get('image') 
    if new_image:
        profile.image = new_image
        profile.save()
        return Response({"Profile image successfully updated."})
    else:
        return Response({"error"}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_name(request):
    profile = request.user.profile
    new_name = request.data.get('name') 
    if new_name:
        profile.username = new_name
        profile.save()
        return Response({"Username successfully updated."})
    else:
        return Response({"error"}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def return_profile(request):
    profile = request.user.profile
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)


    '''profile = request.user.profile
    new_image = request.data.get('image') 
    if new_image:
        serializer = ProfileSerializer(instance=profile, data={'image': new_image}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Profile image successfully updated."})
        else:
            return Response(serializer.errors, status=400)
    else:
        return Response({"error"}, status=400)'''