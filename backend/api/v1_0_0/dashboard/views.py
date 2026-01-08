from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from api.v1_0_0.dashboard.controllers.dashboard_controller import DashboardController

class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    
    def list(self, request):
        controller = DashboardController(request)
        result = controller.get_stats()
        return Response(result)
