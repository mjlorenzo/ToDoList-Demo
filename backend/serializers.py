# This file contains serializers to convert Python objects to JSON payloads

from rest_framework import serializers      # make sure the compiler knows what we're talking about
from backend.models import ToDoItem

# This serializer will convert a ToDoItem into its JSON representation and vice-versa
class ToDoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoItem
        fields = ('id', 'title', 'desc', 'complete', 'created')
