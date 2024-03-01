from django import forms
from django.db import models
from django.utils.translation import gettext_lazy as _

from FitFriendsServer import settings
# Create your models here.

class ExerciseLogModel(models.Model):
    index = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=False)
    date = models.DateTimeField('Created Time', auto_now_add=True, null=True)
    steps = models.IntegerField()
    pushups = models.IntegerField()
    situps = models.IntegerField()
    squarts = models.IntegerField()
    lunges = models.IntegerField()
    class Meta:
        db_table = "exerciseLog"


# class TokenCheck(models.Model):
#     token = models.CharField()
#     created =models.DateTimeField()
#     user_id = models.BigIntegerField()