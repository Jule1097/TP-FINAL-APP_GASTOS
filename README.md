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
- **Búsqueda avanzada**: Filtrado en tiempo real por cualquier campo (ID, descripción, monto, método de pago, fecha, categoria)
- **Tabla interactiva**: 
  - Paginación configurable (10, 20, 50 registros por página)
  - Ordenamiento múltiple por columnas
  - Formato de moneda y fechas en español argentino
- **Actualización de datos**: Botón para refrescar la información
- **Agregar gastos**: Formulario dedicado para crear nuevos registros (ExpensesForm.vue)
- **Editar gastos**: Modal interactivo para actualizar registros existentes (ModalEdit.vue)

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
```text
TP-FINAL-APP_GASTOS-dev/
├── src/
│   ├── components/           # Componentes Vue
│   │   ├── Login.vue         # Componente de inicio de sesión
│   │   ├── Register.vue      # Componente de registro
│   │   ├── Gastos.vue        # Listado de gastos
│   │   ├── Estadisticas.vue  # Dashboard de estadísticas
│   │   ├── NavBar.vue        # Barra de navegación
│   │   ├── ModalEdit.vue     # Modal para editar gastos con validaciones
│   │   └── ExpensesForm.vue  # Formulario para agregar nuevos gastos
│   ├── services/             # Servicios de API
│   │   ├── user.service.js   # Servicio de usuarios
│   │   └── gastos.service.js # Servicio de gastos
│   ├── stores/               # Stores de Pinia
│   │   ├── authStore.js      # Store de autenticación
│   │   └── expenseStore.js   # Store de gastos
│   ├── routes/               # Configuración de rutas
│   │   └── router.js         # Router de Vue
│   ├── utils/                # Utilidades
│   │   └── auth.utils.js     # Utilidades de autenticación
│   ├── App.vue               # Componente raíz
│   └── main.js               # Punto de entrada
├── vercel.json               # Configuración para deploy en Vercel
├── package.json              # Dependencias y scripts
├── vite.config.js            # Configuración de Vite
└── README.md                 # Documentación
```

## 🔌 API Externa

La aplicación utiliza MockAPI como backend para almacenar datos:

## 📱 Rutas de la Aplicación

- `/` - Página de inicio de sesión, redirige al login si no hay autenticación (pública)
- `/login` - Página de inicio de sesión (pública)
- `/register` - Página de registro (pública)
- `/gastos` - Listado de gastos (requiere autenticación)
- `/expenses` - Formulario para agregar gastos (requiere autenticación)
- `/estadisticas` - Dashboard de estadísticas (requiere autenticación)

## 🔒 Seguridad

- Las contraseñas se encriptan usando bcryptjs antes de almacenarse
- Las rutas protegidas requieren autenticación
- El estado de autenticación se persiste de forma segura
- Validación de formularios en el cliente

## 🎨 Características de UI

- **Diseño responsivo**: Adaptable a diferentes tamaños de pantalla
- **Tema moderno**: Interfaz limpia con Bootstrap y PrimeVue
- **Gráficos interactivos**: Visualizaciones dinámicas con ApexCharts
- **Búsqueda en tiempo real**: Filtrado instantáneo de datos
- **Formato localizado**: Fechas y monedas en formato argentino (es-AR)

## 📊 Funcionalidades del Dashboard

### Métricas Calculadas
- Suma total de todos los gastos
- Promedio de gastos por transacción
- Cantidad total de registros
- Gasto máximo individual

### Visualizaciones
- **Gráfico de líneas**: Evolución de gastos por mes
- **Gráficos de barras**: Comparación por método de pago y descripción
- **Tabla resumen**: Análisis detallado por método de pago

## 👤 Uso de la Aplicación

1. **Registro**: Crea una cuenta nueva con email, nombre de usuario y contraseña
2. **Inicio de sesión**: Accede con tus credenciales
3. **Ver gastos**: Navega a la sección "Gastos" para ver todos los registros
4. **Agregar gasto**: Navega a "Agregar Gasto" para crear un nuevo registro
5. **Editar gasto**: Haz clic en el botón de editar en la tabla para abrir el modal
6. **Analizar**: Visita "Estadísticas" para ver gráficos y métricas
7. **Cerrar sesión**: Usa el botón en la barra de navegación

## 🚀 Deploy en Vercel

## 📝 Notas Adicionales

- La aplicación utiliza una API externa (MockAPI) para almacenar datos
- El estado de autenticación persiste entre sesiones del navegador
- Los gráficos se generan dinámicamente basados en los datos de gastos
- El formato de fechas y monedas está configurado para Argentina