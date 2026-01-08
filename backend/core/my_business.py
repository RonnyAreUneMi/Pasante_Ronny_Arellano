class MyBusiness:
    """Clase base para servicios de negocio"""
    
    def __init__(self, request=None):
        self.request = request
    
    def get_user_id(self):
        """Obtiene el ID del usuario autenticado"""
        if self.request and self.request.user.is_authenticated:
            return self.request.user.id
        return 1  # Usuario por defecto para desarrollo