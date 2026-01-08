from django.db import models
from django.db.models import Q

class MyModelManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(active=True)
    
    def data_table(self, conditions=None, limit=2, offset=0, order_by='id'):
        queryset = self.get_queryset()
        
        if conditions:
            queryset = queryset.filter(conditions)
        
        total_records = self.get_queryset().count()
        total_display = queryset.count()
        
        data = queryset.order_by(order_by)[offset:offset + limit]
        
        return data, total_records, total_display

class MyModel(models.Model):
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.IntegerField(default=1)
    updated_by = models.IntegerField(default=1)
    
    objects = MyModelManager()
    
    class Meta:
        abstract = True