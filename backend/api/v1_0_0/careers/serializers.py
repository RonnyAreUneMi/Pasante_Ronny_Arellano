from rest_framework import serializers
from helpers.model_helper import ModelSerializerHelper
from apps.academico.models import Carrera

class CarreraSerializer(ModelSerializerHelper):
    modalidad_nombre = serializers.CharField(source='modalidad.nombre', read_only=True)
    
    class Meta:
        model = Carrera
        fields = ['id', 'nombre', 'modalidad', 'modalidad_nombre', 'estado', 'created_at', 'updated_at']