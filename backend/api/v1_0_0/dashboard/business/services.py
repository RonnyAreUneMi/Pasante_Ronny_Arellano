from core.my_business import MyBusiness
from helpers.response_helper import ResponseHelper
from apps.academico.models import Carrera, Modalidad
from django.db.models import Count

class DashboardService(MyBusiness):
    def __init__(self, request):
        self.request = request
        self.response = ResponseHelper()
    
    def get_stats(self):
        try:
            # Carrera Stats
            total_carreras = Carrera.objects.count()
            carreras_activas = Carrera.objects.filter(estado=True).count()
            carreras_inactivas = total_carreras - carreras_activas
            
            # Modalidad Stats
            total_modalidades = Modalidad.objects.count()
            modalidades_activas = Modalidad.objects.filter(estado=True).count()
            modalidades_inactivas = total_modalidades - modalidades_activas
            
            # Recent Activity
            recent_careers = Carrera.objects.order_by('-updated_at')[:5]
            recent_modalities = Modalidad.objects.order_by('-updated_at')[:5]
            
            activity = []
            for item in recent_careers:
                activity.append({
                    'type': 'carrera',
                    'nombre': item.nombre,
                    'updated_at': item.updated_at,
                    'created_at': item.created_at,
                    'action': 'actualizada' if item.updated_at > item.created_at else 'creada'
                })
            
            for item in recent_modalities:
                activity.append({
                    'type': 'modalidad',
                    'nombre': item.nombre,
                    'updated_at': item.updated_at,
                    'created_at': item.created_at,
                    'action': 'actualizada' if item.updated_at > item.created_at else 'creada'
                })
            
            # Sort activity by updated_at descending
            activity.sort(key=lambda x: x['updated_at'], reverse=True)
            activity = activity[:5] # Keep only last 5
            
            self.response.set_success(True)
            self.response.set_data({
                'careers': {
                    'total': total_carreras,
                    'active': carreras_activas,
                    'inactive': carreras_inactivas
                },
                'modalities': {
                    'total': total_modalidades,
                    'active': modalidades_activas,
                    'inactive': modalidades_inactivas
                },
                'activity': activity
            })
        except Exception as e:
            self.response.set_success(False)
            self.response.set_message(f"Error: {str(e)}")
        
        return self.response.get_response()
