from django.shortcuts import render
from backend.models import ToDoItem
from backend.serializers import (ToDoItemSerializer, CreateUserSerializer, 
                                UserReturnSerializer, LoginSerializer)
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from .permissions import OwnerOrNothing
from django.contrib.auth.models import AnonymousUser

# This view inherits from ModelViewSet, meaning it already supports basic CRUD functions
class ToDoViewSet(viewsets.ModelViewSet):
    serializer_class = ToDoItemSerializer

    # set access permissions
    permission_classes = (OwnerOrNothing,)
    # overriding this method will retrieve only the current user's todos
    def get_queryset(self):
        # return only todo items associated with the current user
        return ToDoItem.objects.filter(user=self.request.user)
        
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# This view creates an API endpoint for creating a user
class CreateUserView(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    # method handling incoming POST requests
    def post(self, request, *args, **kwargs):
        # returns an instance of the serializer associated with this view (CreateUserSerializer)
        serializer = self.get_serializer(data=request.data)
        # validate the incoming data
        # no need to check return value, if it would be false an exception will be raised anyway
        serializer.is_valid(raise_exception=True)
        # [QUESTION]: Is this where CreateUserSerializer.create() is called implicitly?
        new_user = serializer.save()
        # now return a Response object containing a brief, serialized representation of the created
        # user
        return Response({
            'user': UserReturnSerializer(new_user, context=self.get_serializer_context()).data
        })

# A view for logging in a user
class LoginUserView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    # POST method handler
    def post(self, request, *args, **kwargs):
        # get a serializer instance
        serializer = self.get_serializer(data=request.data)
        # validate the supplied credentials
        serializer.is_valid(raise_exception=True)
        # store the validated data
        user = serializer.validated_data
        # return a Response object with the corresponding user
        return Response({
            'user': UserReturnSerializer(user, context=self.get_serializer_context()).data
        })






