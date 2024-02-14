from rest_framework import serializers
from .models import ExerciseLogModel

class ExerciseLogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseLogModel
        fields = ('user_id','steps', 'pushups','situps','squarts','lunges')
    # user_id = serializers.IntegerField()
    # # date = serializers.DateTimeField(input_formats=["%Y-%m-%d"])
    # steps = serializers.IntegerField()
    # pushups = serializers.IntegerField()
    # situps = serializers.IntegerField()
    # squarts = serializers.IntegerField()
    # lunges = serializers.IntegerField()


class ExerciseLogGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseLogModel
        fields = ('user_id','date','steps', 'pushups','situps','squarts','lunges')
    # user_id = serializers.IntegerField()
    # # date = serializers.DateTimeField(input_formats=["%Y-%m-%d"])
    # steps = serializers.IntegerField()
    # pushups = serializers.IntegerField()
    # situps = serializers.IntegerField()
    # squarts = serializers.IntegerField()
    # lunges = serializers.IntegerField()
    