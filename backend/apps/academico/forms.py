from django import forms
from apps.academico.models import Modalidad, Carrera

class ModalidadForm(forms.ModelForm):
    class Meta:
        model = Modalidad
        fields = ['nombre', 'estado']
    
    def clean_nombre(self):
        nombre = self.cleaned_data.get('nombre')
        if not nombre or nombre.strip() == '':
            raise forms.ValidationError("El nombre no puede estar vacío")
        
        instance_id = self.instance.id if self.instance else None
        if Modalidad.objects.filter(nombre=nombre).exclude(id=instance_id).exists():
            raise forms.ValidationError("Ya existe una modalidad con este nombre")
        
        return nombre.strip()

class CarreraForm(forms.ModelForm):
    class Meta:
        model = Carrera
        fields = ['nombre', 'modalidad', 'estado']
    
    def clean_nombre(self):
        nombre = self.cleaned_data.get('nombre')
        if not nombre or nombre.strip() == '':
            raise forms.ValidationError("El nombre no puede estar vacío")
        
        instance_id = self.instance.id if self.instance else None
        if Carrera.objects.filter(nombre=nombre).exclude(id=instance_id).exists():
            raise forms.ValidationError("Ya existe una carrera con este nombre")
        
        return nombre.strip()