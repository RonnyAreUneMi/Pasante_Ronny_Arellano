from rest_framework.routers import DefaultRouter
from .views import CarreraViewSet

router = DefaultRouter()
router.register(r'', CarreraViewSet, basename='carreras')

urlpatterns = router.urls