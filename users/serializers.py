
from rest_framework import serializers

from users.models import User


class RegisterSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('id','email')


# 회원가입 시리얼라이저
# class RegisterSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(
#         required = True,
#         validators=[UniqueValidator(queryset=User.objects.all())]
#     )
#     password = serializers.CharField(
#         write_only = True,
#         required = True,
#         validators = [validate_password],
#     )
#     password2 = serializers.CharField(
#         write_only = True,
#         required = True,
#     )
#     class Meta:
#         model = User
#         fields = ('username','email','password','password2')

#     def validate(self, data):
#         if data['password'] != data['password2']:
#             raise serializers.ValidationError(
#                 {"password":"Password field didn't match"}
#             )
#         return data
    
#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#         Token = Token.objects.create(user=user)
#         return user