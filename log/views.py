
# Create your views here.

import datetime
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ExerciseLogGetSerializer, ExerciseLogPostSerializer
from .models import ExerciseLogModel
from rest_framework import status
from rest_framework.views import APIView
# Create your views here.

class ExercisePostLogView(APIView):
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
    def get(self,request,**kwargs):
        # if(request.data['token'] != ):
        #     return Response("Wrong token", status=status.HTTP_400_BAD_REQUEST)
 
        if(kwargs.get('user_id') is None):
            return Response("Need User Id", status=status.HTTP_400_BAD_REQUEST)
        log_id = kwargs.get('user_id')
        log_logs = ExerciseLogModel.objects.filter(user_id=log_id).order_by('date')[:7]
        log_serializer = ExerciseLogGetSerializer(log_logs,many=True)
        return Response(log_serializer.data,status=status.HTTP_200_OK)
