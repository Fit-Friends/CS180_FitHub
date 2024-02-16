#og from django.urls import path
from . import views
#from .views import profile 
from django.urls import path

'''urlpatterns = [
    path("", views.home, name="home"),
    path("todos/", views.todos, name="Todos"),
]'''


urlpatterns = [
    path("", views.index,name="home"),
]