# Guía de Componentes React

Documentación completa para usar los componentes React creados.

## 📦 Componentes Disponibles

### 1. **Login** (`Auth/Login.jsx`)
Formulario de inicio de sesión con integración de estado global.

**Props:**
- No requiere props

**Características:**
- ✅ Validación de email y contraseña
- ✅ Integración con estado global
- ✅ Llamadas API a través de `api.auth.login()`
- ✅ Redirección automática después de login exitoso
- ✅ Manejo de errores con mensajes al usuario

**Ejemplo de uso:**
```jsx
import Login from '@/components/Auth/Login';

export default function App() {
  return <Login />;
}
```

---

### 2. **Register** (`Auth/Register.jsx`)
Formulario de registro con validación completa.

**Props:**
- No requiere props

**Características:**
- ✅ Validación de nombre, email, contraseña
- ✅ Confirmación de contraseña
- ✅ Integración con estado global
- ✅ Llamadas API a través de `api.auth.register()`
- ✅ Redirección automática después de registro exitoso

**Ejemplo de uso:**
```jsx
import Register from '@/components/Auth/Register';

export default function App() {
  return <Register />;
}
```

---

### 3. **TaskList** (`Tasks/TaskList.jsx`)
Lista completa de tareas con búsqueda, filtrado y ordenamiento.

**Props:**
```typescript
{
  tasks: Array<Task> = [],
  loading: boolean = false,
  onDelete: (taskId: string) => void,
  onEdit: (task: Task) => void,
  onStatusChange: (taskId: string, status: string) => void,
  filter: 'all' | 'active' | 'completed' = 'all'
}
```

**Características:**
- 🔍 Búsqueda por título en tiempo real
- 🏷️ Filtrado por estado (Todas, Activas, Completadas)
- 📊 Ordenamiento (Por fecha, Prioridad, Título)
- ⏳ Estado de carga con spinner
- 📦 Mensaje vacío personalizado

**Ejemplo de uso:**
```jsx
import TaskList from '@/components/Tasks/TaskList';
import { useGlobalContext } from '@/store';
import api from '@/services/api';

export default function TasksPage() {
  const { tasks, loading } = useGlobalContext();
  
  const handleDelete = async (taskId) => {
    await api.tasks.delete(taskId);
  };
  
  const handleEdit = (task) => {
    console.log('Editar tarea:', task);
  };
  
  const handleStatusChange = async (taskId, status) => {
    await api.tasks.updateStatus(taskId, status);
  };

  return (
    <TaskList
      tasks={tasks}
      loading={loading}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onStatusChange={handleStatusChange}
      filter="all"
    />
  );
}
```

---

### 4. **TaskCard** (`Tasks/TaskCard.jsx`)
Tarjeta individual de tarea con acciones contextuales.

**Props:**
```typescript
{
  task: {
    id: string,
    title: string,
    description: string,
    status: 'pending' | 'inProgress' | 'completed',
    priority: 'low' | 'medium' | 'high',
    dueDate: string,
    assignedTo: { name: string } | null
  },
  onDelete: () => void,
  onEdit: () => void,
  onStatusChange: (status: string) => void
}
```

**Características:**
- ✓ Checkbox para marcar completada
- 🎯 Indicador de prioridad con color
- 📅 Fecha de vencimiento con alerta si está vencida
- 👤 Mostrar usuario asignado
- ⋮ Menú de opciones con acciones

**Ejemplo de uso:**
```jsx
import TaskCard from '@/components/Tasks/TaskCard';

export default function MyComponent() {
  const task = {
    id: '1',
    title: 'Tarea importante',
    description: 'Descripción de la tarea',
    status: 'inProgress',
    priority: 'high',
    dueDate: '2025-01-20',
    assignedTo: { name: 'Juan' }
  };

  return (
    <TaskCard
      task={task}
      onDelete={() => console.log('Eliminada')}
      onEdit={() => console.log('Editar')}
      onStatusChange={(status) => console.log('Nuevo estado:', status)}
    />
  );
}
```

---

### 5. **TaskForm** (`Tasks/TaskForm.jsx`)
Formulario para crear o editar tareas con validación.

**Props:**
```typescript
{
  initialData: Task | null = null,
  onSubmit: (formData: object) => void,
  onCancel: () => void,
  loading: boolean = false
}
```

**Características:**
- ✏️ Modo creación y edición automático
- ✅ Validación completa de campos
- 📏 Contadores de caracteres
- 🎯 Selector de prioridad y estado
- 📅 Picker de fecha con validación

**Ejemplo de uso - Crear:**
```jsx
import TaskForm from '@/components/Tasks/TaskForm';
import api from '@/services/api';
import { useState } from 'react';

export default function CreateTask() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await api.tasks.create(formData);
      // Actualizar lista de tareas
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskForm
      onSubmit={handleSubmit}
      onCancel={() => console.log('Cancelado')}
      loading={loading}
    />
  );
}
```

**Ejemplo de uso - Editar:**
```jsx
import TaskForm from '@/components/Tasks/TaskForm';
import api from '@/services/api';
import { useState } from 'react';

export default function EditTask({ task }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await api.tasks.update(task.id, formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskForm
      initialData={task}
      onSubmit={handleSubmit}
      onCancel={() => console.log('Cancelado')}
      loading={loading}
    />
  );
}
```

---

### 6. **Navbar** (`Layout/Navbar.jsx`)
Barra de navegación con usuario y opciones.

**Props:**
```typescript
{
  user: {
    name: string,
    email: string,
    avatar?: string
  } | null,
  onLogout: () => Promise<void>,
  loading: boolean = false
}
```

**Características:**
- 🔗 Enlaces de navegación (Dashboard, Tareas, Proyectos)
- 👤 Información de usuario
- 📍 Avatar con inicial del nombre
- ⋮ Menú desplegable con opciones
- 🚪 Botón de cerrar sesión

**Ejemplo de uso:**
```jsx
import Navbar from '@/components/Layout/Navbar';
import { useGlobalContext } from '@/store';
import api from '@/services/api';

export default function App() {
  const { user, logout } = useGlobalContext();

  const handleLogout = async () => {
    await api.auth.logout();
    logout();
  };

  return (
    <>
      <Navbar
        user={user}
        onLogout={handleLogout}
        loading={false}
      />
      {/* Contenido de la página */}
    </>
  );
}
```

---

### 7. **ProtectedRoute** (`Auth/ProtectedRoute.jsx`)
HOC para proteger rutas que requieren autenticación.

**Props:**
```typescript
{
  children: ReactNode,
  isAuthenticated: boolean = false,
  loading: boolean = false
}
```

**Características:**
- 🔒 Protección de rutas autenticadas
- ⏳ Pantalla de carga mientras verifica autenticación
- ↩️ Redirección automática a login si no está autenticado

**Ejemplo de uso en Router:**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { useGlobalContext } from '@/store';

// Páginas
import Login from '@/components/Auth/Login';
import Dashboard from '@/pages/Dashboard';
import TasksPage from '@/pages/Tasks';

export default function AppRouter() {
  const { isAuthenticated, loading } = useGlobalContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              loading={loading}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/tasks"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              loading={loading}
            >
              <TasksPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🎨 Estilos y Tailwind

Todos los componentes usan **Tailwind CSS** para estilos consistentes:

- **Colores primarios:** Azul (blue-600, blue-700)
- **Espaciado:** Consistente con escala de Tailwind
- **Responsive:** Adaptados para móvil, tablet y desktop
- **Transiciones:** Suave para mejor UX

---

## 🔌 Integración con Estado Global

Los componentes Auth están integrados con el estado global:

```jsx
import { useGlobalContext } from '@/store';

export default function MyComponent() {
  const {
    user,
    token,
    tasks,
    loading,
    error,
    setUser,
    setToken,
    addTask,
    updateTask,
    deleteTask,
  } = useGlobalContext();

  // Usar en el componente
}
```

---

## 📡 Integración con API

Los componentes usan el cliente API centralizado:

```jsx
import api from '@/services/api';

// Ejemplo: Crear tarea
const newTask = await api.tasks.create({
  title: 'Nueva tarea',
  description: 'Descripción',
  priority: 'high'
});

// Ejemplo: Actualizar estado
await api.tasks.updateStatus(taskId, 'completed');

// Ejemplo: Login
const result = await api.auth.login(email, password);
```

---

## ⚡ Mejores Prácticas

1. **Componentes funcionales**: Todos usan hooks modernos
2. **Props claras**: Documentadas con tipos
3. **Validación**: Implementada en formularios
4. **Manejo de errores**: Try-catch y mensajes al usuario
5. **Loading states**: Indicadores visuales mientras se espera
6. **Accesibilidad**: Labels y estructura semántica
7. **Responsive**: Adaptados para todos los tamaños

---

## 🚀 Próximos Pasos

1. Integrar `GlobalProvider` en `App.jsx`
2. Crear rutas principales en `App.jsx` o archivo de rutas
3. Implementar páginas (Dashboard, Tasks, Projects)
4. Agregar más componentes específicos según necesidad
5. Personalizar estilos si es requerido

¡Componentes listos para usar en producción! 🎉
