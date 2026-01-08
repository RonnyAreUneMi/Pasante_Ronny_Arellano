from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from api.v1_0_0.careers.controllers.carrera_controller import CarreraController
from api.v1_0_0.careers.serializers import CarreraSerializer
from apps.academico.models import Carrera

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'], url_path='data-table')
    def data_table(self, request):
        controller = CarreraController(request)
        result = controller.data_table()
        return Response(result)
    
    @action(detail=False, methods=['post'])
    def save(self, request):
        controller = CarreraController(request)
        result = controller.save()
        return Response(result)
    
    @action(detail=False, methods=['delete'])
    def delete(self, request):
        controller = CarreraController(request)
        result = controller.delete()
        return Response(result)