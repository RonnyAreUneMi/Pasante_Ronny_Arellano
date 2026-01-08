from helpers.response_helper import ResponseHelper
from api.v1_0_0.modalities.business.services import ModalidadService

class ModalidadController:
    def __init__(self, request):
        self.request = request
        self.response = ResponseHelper()
    
    def data_table(self):
        service = ModalidadService(self.request)
        return service.data_table()
    
    def save(self):
        service = ModalidadService(self.request)
        return service.save()
    
    def delete(self):
        service = ModalidadService(self.request)
        return service.delete()