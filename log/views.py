
# Create your views here.

import datetime
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ExerciseLogGetSerializer, ExerciseLogPostSerializer
from .models import ExerciseLogModel
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema

# Create your views here.

class ExercisePostLogView(APIView):
    @swagger_auto_schema(
      operation_description="Post the exercise Log, need user_id, steps,pushups,situps,squarts,lunges data in body. ",
      operation_summary="Post the exercise Log",
      operation_id='',
      tags=['PostLog'],
      manual_parameters=[], #query_params, request_header를 작성하는 부분
      query_serializer=ExerciseLogPostSerializer,#query_params, request_header 작성(Serializer로 자동 포맷할 경우)
      responses={}, #request_body도 responses와 같은 방법으로 작성, Mock-up 형태
      )
    def post(self,request):
        # log_serializer = ExerciseLogSerializer(data=request.data)
        model = ExerciseLogPostSerializer(data={
            "user_id": request.data['user_id'],
            # "date": datetime.datetime.strptime(request.data['date'],"%Y-%m-%d").date(),
            "steps": request.data['steps'],
            "pushups" : request.data['pushups'],
            "situps" : request.data['situps'],
            "squarts" : request.data['squarts'],
            "lunges" : request.data['lunges']
            }
        )   
        if model.is_valid():
            model.save()
            return Response({"message":"Sucess","data":request.data},status=status.HTTP_200_OK)
        else:
            return Response({"message":"Fail, send proper data type"},status=status.HTTP_400_BAD_REQUEST)
        
class ExerciseGetLogView(APIView):
    @swagger_auto_schema(
      operation_description="Get Recent 7 exercise Log, require only 'userid' for parameter",
      operation_summary="Get Recent 7 exercise Log",
      operation_id='',
      tags=['getlog'],
      manual_parameters=[], #query_params, request_header를 작성하는 부분
    #   query_serializer=,#query_params, request_header 작성(Serializer로 자동 포맷할 경우)
      responses={}, #request_body도 responses와 같은 방법으로 작성, Mock-up 형태
      )
    def get(self,request,**kwargs):
        # if(request.data['token'] != ):
        #     return Response("Wrong token", status=status.HTTP_400_BAD_REQUEST)
 
        if(kwargs.get('user_id') is None):
            return Response("Need User Id", status=status.HTTP_400_BAD_REQUEST)
        log_id = kwargs.get('user_id')
        log_logs = ExerciseLogModel.objects.filter(user_id=log_id).order_by('date')[:7]
        log_serializer = ExerciseLogGetSerializer(log_logs,many=True)
        return Response(log_serializer.data,status=status.HTTP_200_OK)



class ExerciseGetLogByIndexView(RetrieveAPIView):
    #Ex: http://127.0.0.1:8000/getlog/3 -> give json data that has index 3
    serializer_class = ExerciseLogGetSerializer
    
    queryset = ExerciseLogModel.objects.all()
    lookup_field = 'index'

    def retrieve(self, request, *args, **kwargs):
        index = kwargs.get('index')
        try:
            log_instance = self.queryset.get(index=index)
            serializer = self.get_serializer(log_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ExerciseLogModel.DoesNotExist:
            return Response({"message": "Log not found"}, status=status.HTTP_404_NOT_FOUND)

#target log
@api_view(['GET'])
def target_log(request, index):
    try:
        log_entry = ExerciseLogModel.objects.get(index=index)
        log_data = {
            "user_id": log_entry.user_id,
            "steps": log_entry.steps,
            "pushups": log_entry.pushups,
            "situps": log_entry.situps,
            "squats": log_entry.squats,
            "lunges": log_entry.lunges,
            "index": log_entry.index,
            "date": log_entry.date.strftime("%Y-%m-%d %H:%M:%S")
        }
        return Response(log_data, status=status.HTTP_200_OK)
    except ExerciseLogModel.DoesNotExist:
        return Response({"message": "Log entry not found"}, status=status.HTTP_404_NOT_FOUND)
