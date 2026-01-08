from helpers.response_helper import ResponseHelper
from api.v1_0_0.careers.business.services import CarreraService

class CarreraController:
    def __init__(self, request):
        self.request = request
        self.response = ResponseHelper()
    
    def data_table(self):
        service = CarreraService(self.request)
        return service.data_table()
    
    def save(self):
        service = CarreraService(self.request)
        return service.save()
    
    def delete(self):
        service = CarreraService(self.request)
        return service.delete()