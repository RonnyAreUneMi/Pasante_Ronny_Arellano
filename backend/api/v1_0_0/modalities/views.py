from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from api.v1_0_0.modalities.controllers.modalidad_controller import ModalidadController
from api.v1_0_0.modalities.serializers import ModalidadSerializer
from apps.academico.models import Modalidad

class ModalidadViewSet(viewsets.ModelViewSet):
    queryset = Modalidad.objects.all()
    serializer_class = ModalidadSerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'], url_path='data-table')
    def data_table(self, request):
        controller = ModalidadController(request)
        result = controller.data_table()
        return Response(result)
    
    @action(detail=False, methods=['post'])
    def save(self, request):
        controller = ModalidadController(request)
        result = controller.save()
        return Response(result)
    
    @action(detail=False, methods=['delete'])
    def delete(self, request):
        controller = ModalidadController(request)
        result = controller.delete()
        return Response(result)