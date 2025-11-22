# 📊 App de Gestión de Gastos

Aplicación web desarrollada en Vue.js para la gestión y análisis de gastos personales. Permite registrar, visualizar y analizar gastos mediante un dashboard interactivo con gráficos y estadísticas.

## 🚀 Características Principales

### 🔐 Autenticación de Usuarios
- **Registro de usuarios**: Creación de cuenta con validación de email y contraseña
- **Inicio de sesión**: Autenticación segura con hash de contraseñas (bcrypt)
- **Gestión de sesión**: Persistencia de sesión con Pinia y almacenamiento local
- **Protección de rutas**: Middleware de autenticación para rutas protegidas

### 💰 Gestión de Gastos
- **Listado completo**: Visualización de todos los gastos registrados
- **Búsqueda avanzada**: Filtrado en tiempo real por cualquier campo (ID, descripción, monto, método de pago, fecha)
- **Tabla interactiva**: 
  - Paginación configurable (10, 20, 50 registros por página)
  - Ordenamiento múltiple por columnas
  - Formato de moneda y fechas en español argentino
- **Actualización de datos**: Botón para refrescar la información

### 📈 Dashboard de Estadísticas
- **Métricas principales**:
  - Total de gastos acumulados
  - Promedio de gastos
  - Cantidad total de registros
  - Gasto máximo registrado

- **Gráficos interactivos**:
  - **Gastos por mes**: Gráfico de líneas mostrando la evolución temporal
  - **Gastos por método de pago**: Gráfico de barras horizontales
  - **Gastos por descripción**: Top 10 descripciones más frecuentes
  - **Top 10 gastos**: Los gastos individuales más altos

- **Tabla de resumen**: Desglose detallado por método de pago con:
  - Cantidad de transacciones
  - Total gastado
  - Promedio por transacción
  - Porcentaje del total

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Vue.js 3.5.24**: Framework JavaScript progresivo
- **Vue Router 4.6.3**: Enrutamiento de la aplicación
- **Pinia 3.0.4**: Gestión de estado global
- **Pinia Plugin PersistedState 4.7.1**: Persistencia del estado en localStorage

### UI/UX
- **PrimeVue 4.4.1**: Biblioteca de componentes UI
- **PrimeIcons 7.0.0**: Iconos
- **Bootstrap 5.3.8**: Framework CSS para estilos responsivos
- **ApexCharts 5.3.6**: Librería de gráficos interactivos
- **Vue3-ApexCharts 1.10.0**: Integración de ApexCharts con Vue 3

### Utilidades
- **Axios 1.13.2**: Cliente HTTP para peticiones a la API
- **bcryptjs 3.0.3**: Encriptación de contraseñas

### Desarrollo
- **Vite 7.2.2**: Build tool y servidor de desarrollo
- **@vitejs/plugin-vue 6.0.1**: Plugin de Vite para Vue

## 📁 Estructura del Proyecto
