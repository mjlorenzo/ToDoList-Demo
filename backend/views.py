from .models import ToDoItem
from rest_framework import viewsets
from .permissions import OwnerOrNothing
from .serializers import ToDoItemSerializer

# This view inherits from ModelViewSet, meaning it already supports basic CRUD functions
class ToDoViewSet(viewsets.ModelViewSet):
    serializer_class = ToDoItemSerializer

    # set access permissions
    permission_classes = (OwnerOrNothing,)
    # overriding this method will retrieve only the current user's todos
    def get_queryset(self):
        # return only todo items associated with the current user
        return ToDoItem.objects.filter(user=self.request.user)
        
    # overriding this method will inject the additional ownership data for the to do item being created
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)





