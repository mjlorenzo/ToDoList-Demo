from django.db import models
from django.contrib.auth.models import AbstractUser

# Create a custom user model, allows for flexibility in the future
class CustomUserModel(AbstractUser):
    pass
    
# Model representing a task for the to-do list
class ToDoItem(models.Model):
    desc = models.CharField(max_length = 100)
    complete = models.BooleanField()
    created = models.DateTimeField(auto_now_add = True)
    # This line links each ToDoItem with a corresponding user
    user = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE, related_name='todos')
