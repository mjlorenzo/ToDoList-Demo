from django.shortcuts import render
from backend.models import ToDoItem
from backend.serializers import ToDoItemSerializer
from rest_framework import generics

class ToDoListCreate(generics.ListCreateAPIView):
    queryset = ToDoItem.objects.all()
    serializer_class = ToDoItemSerializer
