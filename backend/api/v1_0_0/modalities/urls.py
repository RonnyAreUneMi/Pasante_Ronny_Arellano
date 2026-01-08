from rest_framework.routers import DefaultRouter
from .views import ModalidadViewSet

router = DefaultRouter()
router.register(r'', ModalidadViewSet, basename='modalidades')

urlpatterns = router.urls