from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    #username = serializers.ReadOnlyField(source= '') maybe add a username
    class Meta:
        model = Profile
        fields = ('id_user', 'username', 'profile_pic')

