from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import UserManager
# Create your models here.
class User(AbstractUser):
    username = None;
    email = models.EmailField(
        _('email adress'),
        unique = True,
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return self.email
#profile class
class Profile(models.Model):
     id = models.OneToOneField(User, on_delete=models.CASCADE)
     username = models.CharField(max_length=100)
     #friends list maybe?
     #profile picture portion
     profile_pic = models.ImageField(upload_to="images/")
     #username is displayed 
     def __str__(self):
         return self.username
#update profile function maybe