from django.http import JsonResponse


def index(request):
    return JsonResponse({'message': 'Hello from Frontend!'})
