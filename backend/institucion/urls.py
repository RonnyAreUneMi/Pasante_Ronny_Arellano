from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'message': 'API Sistema Académico v1.0',
        'endpoints': {
            'modalidades': '/api/v1/modalidades/',
            'carreras': '/api/v1/carreras/'
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.v1_0_0.urls')),
    path('', api_root),
]