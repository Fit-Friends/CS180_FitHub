from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

# Create your models here.

class TodoItem(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)


class Image(models.Model):
    caption = models.CharField(max_length=100)
    image = models.ImageField(upload_to="img/%y")
    def __str__(self):
        return self.caption