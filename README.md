# Sistema de Gestión Académica UBE - Neumorphic Edition

Este es un sistema integral para la gestión de Carreras y Modalidades académicas, diseñado con una arquitectura empresarial robusta y una interfaz de usuario neumórfica de vanguardia.

## 🚀 Características Principales

- **Dashboard Inteligente**: Estadísticas en tiempo real con gráficos dinámicos (Chart.js).
- **CRUD Completo**: Gestión total de Carreras y Modalidades sin recarga de página (SPA).
- **UI Neumórfica Premium**: Diseño suave y moderno basado en sombras y luces.
- **Header Inteligente**: Se oculta al desplazarse hacia abajo y aparece al subir.
- **Búsqueda en Tiempo Real**: Filtrado dinámico de registros vinculado al backend.
- **Relaciones Protegidas**: Integridad referencial entre Carreras y Modalidades.

## 🛠️ Stack Tecnológico

- **Backend**: Django 5.0.1 + Django REST Framework.
- **Frontend**: React 18 + TypeScript + Tailwind CSS.
- **Base de Datos**: SQLite 3 (Desarrollo).
- **Comunicación**: Axios con respuestas estandarizadas.

## 📦 Instalación y Configuración

### 1. Requisitos Previos
- Python 3.10+
- Node.js 18+
- npm o yarn

### 2. Configuración del Backend
```bash
# Entrar a la carpeta backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar venv (Windows)
venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate

# Iniciar servidor
python manage.py runserver
```

### 3. Configuración del Frontend
```bash
# Entrar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

## 🏗️ Arquitectura de Software

El proyecto sigue el patrón **Domain-Driven Design (DDD)** para el backend:
- **/core**: Modelos base y lógica fundamental.
- **/api**: Endpoints, Controladores y Serializadores.
- **/apps**: Definición de modelos de negocio (Carreras/Modalidades).
- **/helpers**: Utilidades de respuesta estandarizada y formateo.

En el frontend se utiliza una estructura **Modular y Tipada**:
- **/src/pages**: Pantallas principales del sistema.
- **/src/components**: Componentes UI, Layout y Formularios.
- **/src/services**: Cliente API centralizado (Axios).
- **/src/types**: Definición estricta de interfaces TypeScript.

## 📝 Endpoints de la API

| Recurso | Método | Endpoint | Descripción |
| :--- | :--- | :--- | :--- |
| Carreras | GET | `/api/v1/carreras/data-table/` | Listado paginado y con búsqueda |
| Carreras | POST | `/api/v1/carreras/save/` | Crear o editar carrera |
| Modalidades | GET | `/api/v1/modalidades/data-table/` | Listado de modalidades |
| Dashboard | GET | `/api/v1/dashboard/` | Estadísticas globales |

## 👨‍💻 Desarrollo y Buenas Prácticas
- **TypeScript Estricto**: Para evitar errores de tipo en runtime.
- **Clean Code**: Nomenclatura consistente y separación de responsabilidades.
- **Neumorfismo**: Estilo visual implementado puramente con variables CSS en `index.css`.

---
*Desarrollado para la Evaluación Académica de Pasantía.*
