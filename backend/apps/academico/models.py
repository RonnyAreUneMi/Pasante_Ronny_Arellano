from core.my_model import MyModel
from django.db import models

class Modalidad(MyModel):
    nombre = models.CharField(max_length=100, unique=True)
    estado = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = "Modalidad"
        verbose_name_plural = "Modalidades"
        ordering = ['nombre']
    
    def __str__(self):
        return self.nombre

class Carrera(MyModel):
    nombre = models.CharField(max_length=150, unique=True)
    modalidad = models.ForeignKey(
        Modalidad, 
        on_delete=models.PROTECT,
        related_name='carreras'
    )
    estado = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = "Carrera"
        verbose_name_plural = "Carreras"
        ordering = ['nombre']
    
    def __str__(self):
        return self.nombre