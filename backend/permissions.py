# This class is a permission class for custom authentication behavior
# All permissions will be denied if the user is not also the creator of an object

from rest_framework import permissions

class OwnerOrNothing(permissions.BasePermission):

    # overriding this method defines permission for the whole view
    def has_permission(self, request, view):
        # only actual users can access the todo list
        return request.user.is_authenticated
    # overriding this method defines per-object level permissions
    # in this case, simply return the comparison between owner and the user making the request
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user