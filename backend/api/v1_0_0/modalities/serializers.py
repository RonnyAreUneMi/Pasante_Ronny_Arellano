from helpers.model_helper import ModelSerializerHelper
from apps.academico.models import Modalidad

class ModalidadSerializer(ModelSerializerHelper):
    class Meta:
        model = Modalidad
        fields = ['id', 'nombre', 'estado', 'created_at', 'updated_at']