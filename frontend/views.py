from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

# This decorator ensures the CSRF cookie is set on every response
@ensure_csrf_cookie
# Simply serves the base HTML document for the React-Redux frontend
def index(request):
    return render(request, "layout.html")
