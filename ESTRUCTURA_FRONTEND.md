# Estructura Frontend - Jira Light

Documentación de la arquitectura y estructura del frontend React con Vite.

---

## 📁 Estructura de Directorios

```
frontend/src/
├── components/          # Componentes React reutilizables
│   ├── Auth/           # Componentes de autenticación
│   ├── Board/          # Componentes del tablero Kanban
│   ├── Layout/         # Componentes de estructura principal
│   ├── Modals/         # Componentes de diálogos/modales
│   ├── Projects/       # Componentes de proyectos
│   ├── Tasks/          # Componentes de tareas
│   └── common/         # Componentes base reutilizables
│       ├── Buttons.jsx
│       ├── Cards.jsx
│       ├── Inputs.jsx
│       ├── Layout.jsx
│       └── Examples.jsx
│
├── hooks/              # Custom hooks
│   ├── useAuth.js      # Lógica de autenticación
│   ├── useProjects.js  # Lógica de proyectos
│   ├── useTasks.js     # Lógica de tareas
│   └── useAuth.js      # Hook ya existente
│
├── layout/             # Layouts principales
│   └── MainLayout.jsx  # Layout con navegación
│
├── pages/              # Páginas/Vistas
│   ├── Dashboard.jsx   # Dashboard principal
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── StyleGuide.jsx
│
├── services/           # Servicios API
│   ├── apiClient.js    # Instancia de axios configurada
│   ├── authService.js  # Llamadas de autenticación
│   ├── projectService.js # Llamadas de proyectos
│   ├── taskService.js  # Llamadas de tareas
│   ├── userService.js  # Llamadas de usuarios
│   └── api.js          # (existente)
│
├── store/              # Gestión de estado global
│   ├── context.jsx     # Context y Provider
│   ├── reducer.js      # Reducer de acciones
│   ├── index.js        # Hook useAppContext
│   ├── slices/         # (para futuras divisiones)
│   └── actions/        # (para futuras acciones)
│
├── styles/             # Estilos globales
│   └── index.css       # Tailwind + estilos base
│
├── utils/              # Utilidades y helpers
│   └── helpers.js
│
├── App.jsx             # Componente raíz
├── main.jsx            # Punto de entrada
└── tailwind.config.js  # Configuración de Tailwind

```

---

## 📋 Responsabilidades por Carpeta

### **1. Components/** 🧩
**Responsabilidad:** Almacenar componentes React reutilizables organizados por feature.

**Subcarpetas:**
- **Auth/** - Componentes de Login y Register
- **Board/** - Tablero Kanban con drag & drop
- **Projects/** - Componentes para mostrar y gestionar proyectos
- **Tasks/** - Componentes para tareas individuales
- **Modals/** - Diálogos y ventanas emergentes
- **common/** - Componentes base (botones, inputs, cards, layouts)

**Ejemplo de uso:**
```jsx
import { TaskCard } from '@/components/Tasks/TaskCard';
import { Board } from '@/components/Board/Board';
import { ProjectList } from '@/components/Projects/ProjectList';
```

---

### **2. Hooks/** 🎣
**Responsabilidad:** Custom hooks que encapsulan lógica de negocio y gestión de estado.

**Hooks disponibles:**
- **useAuth()** - Maneja login, register, logout y estado de usuario
- **useProjects()** - Operaciones CRUD de proyectos
- **useTasks()** - Operaciones CRUD de tareas

**Características:**
- Llamadas a API automáticas
- Manejo de loading y errores
- Integración con Context global
- Lógica centralizada reutilizable

**Ejemplo de uso:**
```jsx
const { projects, loading, createProject } = useProjects();
const { tasks, changeTaskStatus } = useTasks(projectId);
const { currentUser, login, logout } = useAuth();
```

---

### **3. Layout/** 🏗️
**Responsabilidad:** Layouts principales que envuelven todas las páginas.

**Componentes:**
- **MainLayout** - Estructura principal con header, footer y navegación

**Responsabilidades:**
- Proporcionar estructura visual consistente
- Navegación principal
- Autenticación/Logout
- Links a secciones principales

**Ejemplo de uso:**
```jsx
<MainLayout>
  <DashboardPage />
</MainLayout>
```

---

### **4. Pages/** 📄
**Responsabilidad:** Vistas/Páginas principales de la aplicación.

**Páginas:**
- **Dashboard.jsx** - Panel principal con estadísticas
- **Home.jsx** - Página de inicio
- **Login.jsx** - Formulario de login
- **Register.jsx** - Formulario de registro
- **StyleGuide.jsx** - Referencia de componentes

**Características:**
- Componen componentes menores
- Conectan con hooks y Context
- Manejan rutas principales
- Estructura una vista completa

**Ejemplo:**
```jsx
export default function DashboardPage() {
  const { projects, loading } = useProjects();
  
  return (
    <PageContainer title="Dashboard">
      <ProjectList projects={projects} loading={loading} />
    </PageContainer>
  );
}
```

---

### **5. Services/** 🔌
**Responsabilidad:** Llamadas a la API y lógica de comunicación con backend.

**Servicios:**
- **apiClient.js** - Instancia configurada de axios con interceptores
- **authService.js** - Autenticación (login, register, logout)
- **projectService.js** - CRUD de proyectos
- **taskService.js** - CRUD de tareas
- **userService.js** - Operaciones de usuarios

**Características:**
- Métodos asincronos
- Manejo de errores
- Autenticación con tokens
- Separación clara por dominio

**Ejemplo:**
```jsx
import { projectService } from '@/services/projectService';

// En un hook o componente
const projects = await projectService.getAll();
await projectService.create(newProject);
```

---

### **6. Store/** 🏪
**Responsabilidad:** Gestión de estado global con Context API + useReducer.

**Componentes:**
- **context.jsx** - Contexto global con provider y acciones
- **reducer.js** - Función reductora que maneja cambios de estado
- **index.js** - Hook `useAppContext()` para acceder al contexto

**Estructura de estado:**
```javascript
{
  // Datos
  projects: [],
  tasks: [],
  users: [],
  
  // UI
  loading: false,
  error: null,
  
  // Selecciones
  selectedProject: null,
  selectedTask: null,
  
  // Auth
  currentUser: null,
  isAuthenticated: false
}
```

**Acciones disponibles:**
- Proyectos: `setProjects`, `addProject`, `updateProject`, `deleteProject`
- Tareas: `setTasks`, `addTask`, `updateTask`, `deleteTask`, `moveTask`
- Auth: `setUser`, `logout`
- General: `setLoading`, `setError`, `clearError`

**Ejemplo de uso:**
```jsx
import { useAppContext } from '@/store';

function MyComponent() {
  const { projects, addProject, loading } = useAppContext();
  
  return (
    <div>
      {loading && <p>Cargando...</p>}
      {projects.map(p => <div>{p.name}</div>)}
    </div>
  );
}
```

---

### **7. Styles/** 🎨
**Responsabilidad:** Estilos globales y configuración de Tailwind CSS.

**Archivos:**
- **index.css** - Directivas de Tailwind y clases base reutilizables

**Incluye:**
- Estilos globales
- Clases base para botones, inputs, cards
- Utilidades de layout
- Sistema de colores

---

## 🔄 Flujo de Datos

```
Página (Pages/)
    ↓
    ├→ useProjects() / useTasks() / useAuth() (Hooks/)
    │       ↓
    │       └→ projectService / taskService / authService (Services/)
    │               ↓
    │               └→ apiClient (axios) → Backend API
    │
    ├→ useAppContext() (Store/)
    │       ↓
    │       └→ Reducer (actualiza estado global)
    │
    └→ Renderiza componentes (Components/)
            └→ Usa props y context
```

---

## 🚀 Ejemplo Completo: Crear Tarea

### 1. **Usuario hace click en formulario (Component)**
```jsx
// TaskForm.jsx
function TaskForm() {
  const { createTask } = useTasks();
  
  const handleSubmit = async (formData) => {
    await createTask(formData);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 2. **Hook hace llamada a API (Hook)**
```jsx
// useTasks.js
const createTask = async (taskData) => {
  const newTask = await taskService.create(taskData);
  // ...
};
```

### 3. **Service realiza petición (Service)**
```jsx
// taskService.js
export const taskService = {
  create: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  }
};
```

### 4. **API envía al backend**
```
POST /api/tasks
Content-Type: application/json
Authorization: Bearer <token>

{ title: "...", description: "..." }
```

### 5. **Estado se actualiza (Store)**
```jsx
// reducer.js
case 'ADD_TASK':
  return { ...state, tasks: [...state.tasks, action.payload] };
```

### 6. **Componente se re-renderiza**
```jsx
// Automáticamente los componentes usan setTasks del hook
// que triggerea el reducer
```

---

## 📦 Dependencias Principales

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "axios": "^0.21.1",
  "tailwindcss": "^2.0.0"
}
```

---

## 🔐 Autenticación & Tokens

El flujo de autenticación:

1. **Login** → `authService.login()` → Guarda token en localStorage
2. **Interceptor** → Agrega token a headers de todas las peticiones
3. **Unauthorized** → Si token inválido, redirige a login
4. **Logout** → Limpia token y localStorage

```javascript
// apiClient.js - Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 💾 Estado Global vs Local

### **Estado Global (Store - Context)**
- Datos compartidos entre múltiples componentes
- Proyectos, tareas, usuario actual
- Notificaciones globales

### **Estado Local (useState)**
- Datos específicos de un componente
- Formularios, toggles, filtros locales

---

## 🎯 Patrón de Carpeta por Feature

Para agregar una nueva feature (ej: Comentarios):

```
components/Comments/
  ├── CommentList.jsx      # Lista de comentarios
  ├── CommentForm.jsx      # Formulario para nuevo comentario
  ├── CommentCard.jsx      # Tarjeta individual

hooks/
  └── useComments.js       # Lógica de comentarios

services/
  └── commentService.js    # Llamadas API de comentarios

store/
  └── En reducer.js agregar casos para comentarios
```

---

## 🔍 Debugging

**DevTools útiles:**
- React Developer Tools (Chrome/Firefox)
- Redux DevTools (para visualizar cambios de estado)
- Network tab (para ver peticiones API)
- Console (logs)

---

## 📚 Referencias Rápidas

**Acceder a estado global:**
```jsx
const { projects, tasks, currentUser } = useAppContext();
```

**Realizar operaciones:**
```jsx
const { createProject, updateTask } = useProjects();
const { login, logout } = useAuth();
```

**Renderizar componentes:**
```jsx
import { ProjectList } from '@/components/Projects/ProjectList';
import { Board } from '@/components/Board/Board';
```

---

## ✅ Checklist para nuevas páginas

- [ ] Crear archivo en `pages/`
- [ ] Importar hooks necesarios
- [ ] Usar `PageContainer` o `MainLayout`
- [ ] Conectar con `useAppContext()` si necesita estado global
- [ ] Agregar ruta en `App.jsx`
- [ ] Agregar link en `MainLayout`

