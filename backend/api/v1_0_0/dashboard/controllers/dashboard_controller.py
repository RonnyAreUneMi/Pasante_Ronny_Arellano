from helpers.response_helper import ResponseHelper
from api.v1_0_0.dashboard.business.services import DashboardService

class DashboardController:
    def __init__(self, request):
        self.request = request
        self.response = ResponseHelper()
    
    def get_stats(self):
        service = DashboardService(self.request)
        return service.get_stats()
