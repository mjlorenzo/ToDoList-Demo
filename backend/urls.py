# This file contains routing information to display the correct view and handle POST updates

from django.urls import path
from rest_framework import routers
from .views import ToDoViewSet

# Register a router to handle URL routing for todos
router = routers.SimpleRouter()
router.register('todos', ToDoViewSet, base_name='todos')

urlpatterns = router.urls