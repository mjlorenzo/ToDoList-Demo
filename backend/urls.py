# This file contains routing information to display the correct view and handle POST updates

from django.urls import path
from . import views

urlpatterns = [
    path('api/todo', views.ToDoListCreate.as_view()),
]