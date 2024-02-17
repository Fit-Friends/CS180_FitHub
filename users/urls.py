from django.contrib import admin
from django.urls import include, path
from .views import ExerciseGetLogByIndexView #
urlpatterns = [
    path('register/', include('dj_rest_auth.registration.urls')),
    path('',include('dj_rest_auth.urls')),
    path('getlog/<int:index>/', ExerciseGetLogByIndexView.as_view(), name='get_log_by_index'),
]
