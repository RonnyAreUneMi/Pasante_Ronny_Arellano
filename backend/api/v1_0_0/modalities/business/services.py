from core.my_business import MyBusiness
from helpers.response_helper import ResponseHelper
from django.db.models import Q
from apps.academico.models import Modalidad
from api.v1_0_0.modalities.serializers import ModalidadSerializer
from apps.academico.forms import ModalidadForm

class ModalidadService(MyBusiness):
    def __init__(self, request):
        self.request = request
        self.response = ResponseHelper()
    
    def data_table(self):
        try:
            search = self.request.GET.get('search', '')
            limit = int(self.request.GET.get('limit', 10))
            offset = int(self.request.GET.get('offset', 0))
            order = self.request.GET.get('order', 'nombre')
            order_dir = self.request.GET.get('order_dir', 'asc')
            estado = self.request.GET.get('estado', None)
            
            conditions = Q(nombre__icontains=search)
            
            if estado is not None:
                conditions &= Q(estado=estado.lower() == 'true')
            
            order_by = f"-{order}" if order_dir == "desc" else order
            
            data, total_records, total_display = Modalidad.objects.data_table(
                conditions=conditions,
                limit=limit,
                offset=offset,
                order_by=order_by
            )
            
            if data:
                serialized = ModalidadSerializer(data, many=True, context={'request': self.request})
                self.response.set_success(True)
                self.response.set_data({
                    'data': serialized.data,
                    'recordsTotal': total_records,
                    'recordsFiltered': total_display
                })
            else:
                self.response.set_success(True)
                self.response.set_data({
                    'data': [],
                    'recordsTotal': 0,
                    'recordsFiltered': 0
                })
        except Exception as e:
            self.response.set_success(False)
            self.response.set_message(f"Error: {str(e)}")
        
        return self.response.get_response()
    
    def save(self):
        try:
            data = self.request.data
            instance_id = data.get('id', None)
            
            if instance_id:
                instance = Modalidad.objects.get(id=instance_id)
                form = ModalidadForm(data, instance=instance)
            else:
                form = ModalidadForm(data)
            
            if form.is_valid():
                modalidad = form.save(commit=False)
                modalidad.updated_by = self.get_user_id()
                if not instance_id:
                    modalidad.created_by = modalidad.updated_by
                modalidad.save()
                
                self.response.set_success(True)
                self.response.set_message("Modalidad guardada exitosamente")
                self.response.set_data(ModalidadSerializer(modalidad).data)
            else:
                self.response.set_success(False)
                self.response.set_message("Errores de validación")
                self.response.set_form_errors('modalidad_form', form.errors)
        except Exception as e:
            self.response.set_success(False)
            self.response.set_message(f"Error: {str(e)}")
        
        return self.response.get_response()
    
    def delete(self):
        try:
            instance_id = self.request.GET.get('id')
            modalidad = Modalidad.objects.get(id=instance_id)
            modalidad.active = False
            modalidad.save()
            
            self.response.set_success(True)
            self.response.set_message("Modalidad eliminada exitosamente")
        except Exception as e:
            self.response.set_success(False)
            self.response.set_message(f"Error: {str(e)}")
        
        return self.response.get_response()