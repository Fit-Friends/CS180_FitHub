# Create your views here.
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from users.models import User
from users.serializers import RegisterSerializer
# Create your views here.

class GetUserIdByEmail(APIView):
    def post(self,request):
        request_email = request.data['user_email']
        print(request_email)
        if(request_email is None):
            return Response("Need User email", status=status.HTTP_400_BAD_REQUEST)
        queryset = User.objects.all()
        instance = queryset.get(email=request_email)
        # accountId_data = User.objects.filter(email=request_email)
        accountId_serializer = RegisterSerializer(instance)
        if accountId_serializer.data['email'] == None:
            return Response("there are no user", status=status.HTTP_400_BAD_REQUEST)
        return Response(accountId_serializer.data,status=status.HTTP_200_OK)