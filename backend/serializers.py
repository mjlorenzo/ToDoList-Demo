# This file contains serializers to convert Python objects to JSON payloads

from rest_framework import serializers      # make sure the environment knows what we're talking about
from backend.models import ToDoItem

# This serializer will convert a ToDoItem into its JSON representation and vice-versa
# Because it is derived from ModelSerializer, it already supports create and update operations
class ToDoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoItem
        fields = ('id', 'desc', 'complete', 'created')


        

