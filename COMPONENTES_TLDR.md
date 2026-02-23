# Componentes React - Quick Start (TL;DR)

## 📦 Componentes Creados

| Componente | Ubicación | Props | Uso |
|-----------|-----------|-------|-----|
| **Login** | `Auth/Login.jsx` | None | Formulario de iniciar sesión |
| **Register** | `Auth/Register.jsx` | None | Formulario de registro |
| **TaskList** | `Tasks/TaskList.jsx` | tasks, loading, callbacks | Lista con búsqueda/filtrado |
| **TaskCard** | `Tasks/TaskCard.jsx` | task, callbacks | Tarjeta individual |
| **TaskForm** | `Tasks/TaskForm.jsx` | initialData, callbacks | Crear/editar tareas |
| **Navbar** | `Layout/Navbar.jsx` | user, onLogout | Barra superior |
| **ProtectedRoute** | `Auth/ProtectedRoute.jsx` | children, isAuth, loading | Proteger rutas |

---

## ⚡ Uso Rápido

### 1. **Login (Solo copiar)**
```jsx
import Login from '@/components/Auth/Login';

// Listo! Maneja todo solo
export default function LoginPage() {
  return <Login />;
}
```

### 2. **TaskList (Con callbacks)**
```jsx
import TaskList from '@/components/Tasks/TaskList';
import { useGlobalContext } from '@/store';

export default function TasksPage() {
  const { tasks, loading } = useGlobalContext();

  return (
    <TaskList
      tasks={tasks}
      loading={loading}
      onDelete={async (id) => await api.tasks.delete(id)}
      onEdit={(task) => console.log(task)}
      onStatusChange={async (id, status) => await api.tasks.updateStatus(id, status)}
      filter="all"
    />
  );
}
```

### 3. **Navbar (En layout principal)**
```jsx
import Navbar from '@/components/Layout/Navbar';

export default function App() {
  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main>{/* contenido */}</main>
    </>
  );
}
```

### 4. **ProtectedRoute (En router)**
```jsx
import ProtectedRoute from '@/components/Auth/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute isAuthenticated={isAuth} loading={loading}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

## 🎯 Props Principales

### TaskList
```jsx
tasks={[]} // Array de tareas
loading={false} // Mostrando spinner
onDelete={(id) => {}} // Callback eliminar
onEdit={(task) => {}} // Callback editar
onStatusChange={(id, status) => {}} // Callback cambiar estado
filter="all" // 'all' | 'active' | 'completed'
```

### TaskCard
```jsx
task={{id, title, description, status, priority, dueDate, assignedTo}}
onDelete={() => {}}
onEdit={() => {}}
onStatusChange={(status) => {}}
```

### TaskForm
```jsx
initialData={null} // null=crear, task=editar
onSubmit={(formData) => {}} // Callback al enviar
onCancel={() => {}} // Callback cancelar
loading={false}
```

### Navbar
```jsx
user={{name, email}}
onLogout={async () => {}}
loading={false}
```

### ProtectedRoute
```jsx
children={<YourComponent />}
isAuthenticated={true}
loading={false}
```

---

## 🚀 Integración Mínima

**En tu App.jsx:**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from '@/store';

// Componentes
import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';

export default function App() {
  const { isAuthenticated, loading } = useGlobalContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🎨 Styling

Todos usan **Tailwind CSS**. No necesitas:
- ❌ Bootstrap
- ❌ Material-UI
- ❌ Styled-components

Solo Tailwind en `tailwind.config.js`

---

## 📦 Requisitos

Funcionales con:
- ✅ React 18+
- ✅ React Router v6+
- ✅ Tailwind CSS
- ✅ Estado Global (incluido)
- ✅ API Client (incluido)

---

## 📚 Documentación Completa

Ver `COMPONENTES_GUIDE.md` para guía completa con ejemplos.
Ver `COMPONENTES_EJEMPLOS.jsx` para 4 ejemplos prácticos.

---

## ✅ Checklist de Integración

- [ ] Importar componentes necesarios
- [ ] Pasar props requeridas
- [ ] Conectar callbacks a api.js
- [ ] Actualizar estado global cuando sea necesario
- [ ] Probar en navegador

¡Listo! 🎉
