from django.db import models

# Model representing a task for the to-do list
class ToDoItem(models.Model):
    title = models.CharField(max_length = 30)
    desc = models.CharField(max_length = 100)
    complete = models.BooleanField()
    created = models.DateTimeField(auto_now_add = True)

