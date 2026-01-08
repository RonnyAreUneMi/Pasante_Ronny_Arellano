# Sistema de Gestión Académica UBE - Edición Premium

Este es un sistema integral para la gestión de **Carreras** y **Modalidades** académicas, desarrollado como parte de la evaluación de pasantía. El sistema destaca por su arquitectura limpia en el backend y una interfaz de usuario moderna con estilo neumórfico.

## 🚀 Características Principales

- **Dashboard**: Visualización de estadísticas generales.
- **Gestión de Carreras**: CRUD completo con validaciones.
- **Gestión de Modalidades**: Control total de modalidades de estudio.
- **Búsqueda y Filtrado**: Implementado en tiempo real desde el servidor.
- **Diseño Neumórfico**: Interfaz fluida y minimalista desarrollada con CSS puro.

## 🛠️ Stack Tecnológico

- **Backend**: Django 5.0.1 + Django REST Framework (Arquitectura DDD).
- **Frontend**: React 18 + TypeScript + Tailwind CSS (Estilo Neumórfico).
- **Base de Datos**: SQLite 3.
- **API**: Versionado v1.0.0.

## 📦 Instalación y Configuración

### 1. Requisitos Previos
- Python 3.10+
- Node.js 18+
- Git

### 2. Clonar y Configurar Backend
```bash
# Entrar a la carpeta backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate

# Iniciar servidor
python manage.py runserver
```

### 3. Configurar Frontend
```bash
# Entrar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

## 🌐 Información de la API

La API está versionada para asegurar estabilidad y escalabilidad futura.

- **URL Base Local**: `http://localhost:8000/api/v1/`
- **Formato de Respuesta**: JSON (Estandarizado con `/helpers/response_helper.py`).

### Endpoints Principales

| Recurso | Método | Endpoint | Descripción |
| :--- | :--- | :--- | :--- |
| **Carreras** | GET | `/carreras/data-table/` | Listado con búsqueda y filtrado |
| **Carreras** | POST | `/carreras/save/` | Crear o editar una carrera |
| **Carreras** | DELETE | `/carreras/delete/` | Eliminar una carrera |
| **Modalidades** | GET | `/modalidades/data-table/` | Listado de modalidades |
| **Modalidades** | POST | `/modalidades/save/` | Crear o editar modalidad |
| **Dashboard** | GET | `/dashboard/` | Estadísticas para el panel principal |

## 🏗️ Estructura del Proyecto

El backend utiliza una estructura basada en **Domain-Driven Design (DDD)** simplificado:
- `api/v1_0_0/`: Contiene la lógica de la API (Serializadores, Controladores, Rutas).
- `apps/academico/`: Definición de modelos Django.
- `core/`: Lógica base y mixins.
- `helpers/`: Clases de utilidad para respuestas consistentes.

## 🔑 Credenciales
*No se requiere autenticación para esta versión de evaluación (Permisos: `AllowAny`).*

---
*Desarrollado para la Evaluación de Pasantía - Ronny Arellano.*
