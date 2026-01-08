from django.urls import path, include

urlpatterns = [
    path('modalidades/', include('api.v1_0_0.modalities.urls')),
    path('carreras/', include('api.v1_0_0.careers.urls')),
    path('dashboard/', include('api.v1_0_0.dashboard.urls')),
]