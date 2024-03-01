# Create your views here.
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from users.models import User
from users.serializers import RegisterSerializer
from drf_yasg.utils import swagger_auto_schema
# Create your views here.

class GetUserIdByEmail(APIView):
    #Example
    @swagger_auto_schema(
      operation_description="Get user id from email, need \"email\" data in body. ",
      operation_summary="Get user id from email",
      operation_id='',
      tags=['getuserid'],
      manual_parameters=[], #query_params, request_header를 작성하는 부분
      query_serializer=RegisterSerializer,#query_params, request_header 작성(Serializer로 자동 포맷할 경우)
      responses={}, #request_body도 responses와 같은 방법으로 작성, Mock-up 형태
      )
    def post(self,request):
        request_email = request.data['email']
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


