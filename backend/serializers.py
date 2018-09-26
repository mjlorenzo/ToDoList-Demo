# This file contains serializers to convert Python objects to JSON payloads

from rest_framework import serializers      # make sure the environment knows what we're talking about
from backend.models import ToDoItem, CustomUserModel
from django.contrib.auth import authenticate
from django.contrib.auth.models import UserManager

# This serializer will convert a ToDoItem into its JSON representation and vice-versa
# Because it is derived from ModelSerializer, it already supports create and update operations
class ToDoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoItem
        fields = ('id', 'desc', 'complete', 'created')

# This serializer will facilitate logging a user in
class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    # [QUESTION]: Honestly not entirely sure why the actual call to authenticate is within the serializer,
    # possibly not best software practice?
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Username and/or password incorrect")

# This serializer translates create user information to a User object, then creates a new user
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = ('id', 'username', 'password')

        def create(self, valid_data):
            user = UserManager.create_user(valid_data['username'], 
                                                       None, 
                                                       valid_data['password'])

            return user

# This serializer uses the same model, but is used to return selected information on successful
# login
class UserReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = ('id', 'username')

# Test serializer to check out database contents
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = ('id', 'username', 'password')

        

