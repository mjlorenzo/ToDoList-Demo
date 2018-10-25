from rest_framework.pagination import PageNumberPagination

# custom pagination class just to configure how to use the existing PageNumberPagination
class BasicPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 10