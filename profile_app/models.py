from django.db import models
from users.models import User 
# Create your models here.
#profile class
class Profile(models.Model):
     id_user = models.OneToOneField(User, on_delete=models.CASCADE)
     username = models.CharField(max_length=100)
     #friends list maybe?
     #profile picture portion
     profile_pic = models.ImageField(default='profile_pic_default.png',  upload_to='profile_pic')
     #username is displayed 
     def __str__(self):
         return self.username
#update profile function maybe