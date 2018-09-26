from django.shortcuts import render
from rest_framework.views import APIView


def index(request):
    return render(request, "static/index.html")

