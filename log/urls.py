from django import views
from django.contrib import admin
from django.urls import include, path

from log.views import ExerciseGetLogView, ExercisePostLogView

urlpatterns = [
    path('log/<int:user_id>', ExerciseGetLogView.as_view()),
    path('log/', ExercisePostLogView.as_view())
    # path('log',ExerciseLogView.as_view())
]
