# 🏗️ Arquitectura del Gestor de Tareas

## Diagrama de Componentes

```
App.jsx (Root)
├── GlobalProvider (Context)
│   ├── Header
│   ├── main
│   │   └── Routes
│   │       ├── Home (público)
│   │       ├── Login (público)
│   │       ├── Register (público)
│   │       └── Dashboard (protegido)
│   │           └── ProtectedRoute
│   └── Footer
```

## Flujo de Estado Global

```
GlobalProvider
├── reducer.js (lógica de cambios)
├── actions.js (creadores de acciones)
├── store.js (estado inicial)
└── useGlobalContext.jsx (hook para consumir)

Actions:
- SET_TASKS
- ADD_TASK
- UPDATE_TASK
- DELETE_TASK
- SET_LOADING
- SET_ERROR
```

## Flujo de Autenticación

```
1. Usuario llena Login/Register
   ↓
2. Envía credenciales a API
   ├── api.auth.login(email, password)
   ├── api.auth.register(userData)
3. Backend valida y retorna JWT
   ↓
4. localStorage guarda token y user
   ├── token: "eyJhbGc..."
   ├── user: { id, email, name }
5. Cada request incluye Bearer token
   ├── Authorization: Bearer <token>
6. ProtectedRoute valida autenticación
   └── Si no hay token → Redirect a /login
```

## Flujo de API Client

```
Componente
  ↓
Hook (useGlobalContext, useTasks)
  ↓
Service (taskService, authService)
  ↓
API Client (api.js)
  ├── Agrega Bearer token
  ├── Maneja errores globales
  ├── Retorna datos o error
  ↓
Reducer (actualiza estado)
  ↓
Componente re-renderiza
```

## Estructura de Servicios

### api.js (Cliente HTTP Centralizado)
```javascript
api.auth.login()
api.auth.register()
api.auth.logout()

api.tasks.getAll()
api.tasks.getById(id)
api.tasks.create(data)
api.tasks.update(id, data)
api.tasks.delete(id)

api.projects.getAll()
api.projects.create(data)
api.projects.update(id, data)
api.projects.delete(id)

api.users.getProfile()
api.users.update(data)
```

### taskService.js (Wrapper de Api)
```javascript
taskService.getAll()
taskService.getByProject(projectId)
taskService.create(taskData)
taskService.update(taskId, taskData)
taskService.delete(taskId)
taskService.markComplete(taskId)
```

## Estructura de Componentes

### Auth Components
- **Login.jsx**: Formulario de login
- **Register.jsx**: Formulario de registro
- **ProtectedRoute.jsx**: HOC para rutas protegidas

### Task Components
- **TaskList.jsx**: Lista de tareas
- **TaskCard.jsx**: Card individual de tarea
- **TaskForm.jsx**: Formulario crear/editar

### Layout Components
- **Header.jsx**: Barra superior con navegación
- **Footer.jsx**: Pie de página
- **Navbar.jsx**: Barra de navegación

### Page Components
- **Home.jsx**: Landing page
- **Dashboard.jsx**: Panel principal de tareas
- **Projects.jsx**: Vista de proyectos

## Estructura de Store

### State Shape
```javascript
{
  user: { id, email, name, avatar },
  token: "eyJhbGc...",
  isAuthenticated: true,
  
  tasks: [{ id, title, description, status, priority, ... }],
  projects: [{ id, name, description, ... }],
  
  loading: false,
  error: null,
}
```

### Actions
```javascript
{ type: 'SET_USER', payload: userData }
{ type: 'SET_TASKS', payload: tasksArray }
{ type: 'UPDATE_TASK', payload: { taskId, updates } }
{ type: 'DELETE_TASK', payload: taskId }
{ type: 'SET_LOADING', payload: true }
{ type: 'SET_ERROR', payload: errorMessage }
```

## Variables de Entorno

```env
# .env.local
VITE_API_URL=http://localhost:5000/api
VITE_NODE_ENV=development

# .env.production (Render)
VITE_API_URL=https://gestor-tareas-backend.onrender.com/api
VITE_NODE_ENV=production
```

## Flujo de Desarrollo

1. **Feature Branch**: `git checkout -b feature/nueva-funcionalidad`
2. **Componente**: Crear en `src/components` o `src/pages`
3. **State**: Si necesita estado global, agregar actions y reducer
4. **Service**: Si necesita API, agregar métodos en service
5. **Hook**: Si es lógica reutilizable, crear custom hook
6. **Styles**: Usar clases de `styles/index.css`
7. **Test**: Probar en navegador
8. **Commit**: `git commit -m "feat: descripción"`

## Performance Tips

1. **Componentes**: Usar React.memo para componentes puros
2. **Re-renders**: Memoizar callbacks con useCallback
3. **Dependencias**: Revisar arrays de dependencias en useEffect
4. **Bundle**: Lazy load routes si es necesario
5. **Images**: Optimizar imágenes antes de commitear

## Security Best Practices

1. ✅ Bearer token en headers (no URL)
2. ✅ Token en localStorage (no cookie para simplificar)
3. ✅ Validación frontend antes de submit
4. ✅ Errores sin exponer detalles sensibles
5. ✅ CORS configurado en backend

## Deployment Checklist

- [ ] Variables de entorno en Render
- [ ] Build: `npm run build`
- [ ] Start: `npm run preview`
- [ ] Tests pasando
- [ ] Console sin errores
- [ ] Network requests funcionando
- [ ] Autenticación testeable
- [ ] Rutas protegidas testeable
