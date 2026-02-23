# 📋 Índice de Componentes React

Referencia rápida de todos los componentes creados.

## 🚀 Inicio Rápido

**Archivo de documentación:** Ver `COMPONENTES_TLDR.md` para uso mínimo.

---

## 📦 Componentes por Categoría

### 🔐 Autenticación (3 componentes)

| Componente | Archivo | Props | Descripción |
|-----------|---------|-------|-------------|
| **Login** | `Auth/Login.jsx` | None | Formulario inicio sesión con validación |
| **Register** | `Auth/Register.jsx` | None | Formulario registro con confirmación contraseña |
| **ProtectedRoute** | `Auth/ProtectedRoute.jsx` | children, isAuth, loading | HOC para proteger rutas |

### 📝 Gestión de Tareas (3 componentes)

| Componente | Archivo | Props | Descripción |
|-----------|---------|-------|-------------|
| **TaskList** | `Tasks/TaskList.jsx` | tasks, loading, callbacks, filter | Lista con búsqueda/filtrado/sort |
| **TaskCard** | `Tasks/TaskCard.jsx` | task, callbacks | Tarjeta individual |
| **TaskForm** | `Tasks/TaskForm.jsx` | initialData, callbacks, loading | Formulario crear/editar |

### 🧭 Navegación (1 componente)

| Componente | Archivo | Props | Descripción |
|-----------|---------|-------|-------------|
| **Navbar** | `Layout/Navbar.jsx` | user, onLogout, loading | Barra superior con menú |

---

## 🎯 Por Funcionalidad

### Flujo de Autenticación
1. **Login** → valida credenciales → llama `api.auth.login()` → redirige a Dashboard
2. **Register** → valida datos → llama `api.auth.register()` → redirige a Dashboard
3. **ProtectedRoute** → verifica `isAuthenticated` → renderiza o redirige a Login

### Flujo de Tareas
1. **TaskList** → muestra lista con filtros y búsqueda
2. **TaskCard** → cada tarea con checkbox y menú de opciones
3. **TaskForm** → modal para crear o editar tareas

### Flujo de Navegación
1. **Navbar** → permanece visible cuando `isAuthenticated`
2. Links a Dashboard, Tareas, Proyectos
3. Menú de usuario con Perfil, Config, Logout

---

## 🔗 Integración API

Todos los componentes conectan con `api.js`:

```jsx
// Auth
api.auth.login(email, password)
api.auth.register(email, password, name)
api.auth.logout()

// Tasks
api.tasks.getAll()
api.tasks.delete(id)
api.tasks.updateStatus(id, status)
api.tasks.create(data)
api.tasks.update(id, data)
```

---

## 🎨 Estilos Tailwind

Todos usan **Tailwind CSS**:
- 🎨 **Colores primarios:** Azul y Indigo
- 📱 **Responsive:** Mobile-first
- ✨ **Transiciones:** Suaves
- 🌙 **Dark mode ready** (configurar en `tailwind.config.js`)

---

## 📊 Props por Componente

### Login
```jsx
// Sin props - Usa estado global automáticamente
<Login />
```

### Register
```jsx
// Sin props - Usa estado global automáticamente
<Register />
```

### ProtectedRoute
```jsx
<ProtectedRoute
  children={<YourComponent />}
  isAuthenticated={boolean}
  loading={boolean}
/>
```

### TaskList
```jsx
<TaskList
  tasks={Array<Task>}
  loading={boolean}
  onDelete={(id) => {}}
  onEdit={(task) => {}}
  onStatusChange={(id, status) => {}}
  filter={'all' | 'active' | 'completed'}
/>
```

### TaskCard
```jsx
<TaskCard
  task={{id, title, description, status, priority, dueDate, assignedTo}}
  onDelete={() => {}}
  onEdit={() => {}}
  onStatusChange={(status) => {}}
/>
```

### TaskForm
```jsx
<TaskForm
  initialData={Task | null}
  onSubmit={(formData) => {}}
  onCancel={() => {}}
  loading={boolean}
/>
```

### Navbar
```jsx
<Navbar
  user={{name, email}}
  onLogout={async () => {}}
  loading={boolean}
/>
```

---

## 💾 Almacenamiento Local

Los componentes usan:
- **localStorage** para token (automático en `api.js`)
- **Estado global** para usuario y tareas (`useGlobalContext`)
- **Sesión** se limpia al logout

---

## ⚠️ Validaciones Implementadas

### Login
- ✓ Email válido (formato)
- ✓ Contraseña requerida

### Register
- ✓ Nombre requerido
- ✓ Email válido
- ✓ Contraseña mínimo 6 caracteres
- ✓ Confirmación de contraseña

### TaskForm
- ✓ Título requerido (máx 100 caracteres)
- ✓ Descripción (máx 500 caracteres)
- ✓ Fecha no puede ser pasada

### TaskCard
- ✓ Verifica si tarea está vencida
- ✓ Muestra alerta de vencimiento

---

## 🚨 Manejo de Errores

Todos los componentes tienen:
- ✓ Try-catch para async operations
- ✓ Mensajes de error amigables
- ✓ Validación de respuestas API
- ✓ Logging en consola (dev mode)

---

## 📱 Responsive Breakpoints

Tailwind breakpoints usados:
- `sm` (640px) - Tablets
- `md` (768px) - Tablets grandes
- `lg` (1024px) - Desktops
- `xl` (1280px) - Desktops grandes

---

## 🔄 Estado Global

Integración con `useGlobalContext`:

```jsx
const {
  user,
  token,
  isAuthenticated,
  tasks,
  loading,
  error,
  setUser,
  setToken,
  logout,
  addTask,
  updateTask,
  deleteTask,
} = useGlobalContext();
```

---

## 📂 Estructura de Carpetas

```
frontend/src/
├─ components/
│  ├─ Auth/
│  │  ├─ Login.jsx .................. ✅
│  │  ├─ Register.jsx .............. ✅
│  │  └─ ProtectedRoute.jsx ........ ✅
│  ├─ Tasks/
│  │  ├─ TaskList.jsx .............. ✅
│  │  ├─ TaskCard.jsx .............. ✅
│  │  └─ TaskForm.jsx .............. ✅
│  └─ Layout/
│     └─ Navbar.jsx ................ ✅
├─ store/
│  ├─ store.js
│  ├─ actions.js
│  ├─ reducer.js
│  ├─ provider.js
│  ├─ useGlobalContext.js
│  └─ index.js
├─ services/
│  └─ api.js
├─ pages/
│  ├─ Dashboard.jsx
│  ├─ Tasks.jsx
│  └─ Projects.jsx
└─ App.jsx
```

---

## 🎓 Documentación Completa

- 📖 **COMPONENTES_GUIDE.md** - Guía detallada (500+ líneas)
- 📋 **COMPONENTES_TLDR.md** - Quick start (uso rápido)
- 💡 **COMPONENTES_EJEMPLOS.jsx** - 4 ejemplos prácticos
- 📚 **Este archivo** - Referencia de índice

---

## ✅ Checklist de Implementación

- [ ] Todos los componentes importados
- [ ] Props correctamente pasadas
- [ ] Callbacks conectados a api.js
- [ ] GlobalProvider en App.jsx
- [ ] Rutas configuradas
- [ ] Estado global actualizado después de API calls
- [ ] Loading states funcionando
- [ ] Mensajes de error visibles
- [ ] Redirecciones correctas
- [ ] Responsive testing en mobile

---

## 🆘 Troubleshooting

**Problema:** Login no funciona
- ✓ Verificar API_URL en .env
- ✓ Verificar credenciales válidas
- ✓ Revisar console.log de api.js

**Problema:** Tareas no aparecen
- ✓ Verificar que `tasks` viene del estado global
- ✓ Verificar API endpoint existe
- ✓ Revisar formato de datos en TaskList

**Problema:** Redirección no funciona
- ✓ Verificar `isAuthenticated` es true/false
- ✓ Verificar ProtectedRoute tiene props correctas
- ✓ Verificar React Router está configurado

**Problema:** Estilos Tailwind no aplican
- ✓ Verificar `tailwind.config.js` tiene paths correctos
- ✓ Verificar `index.css` importa Tailwind
- ✓ Rebuildar con `npm run dev`

---

## 🎉 ¡Listo para Usar!

Todos los componentes están:
✓ Funcionales
✓ Documentados
✓ Listos para producción
✓ Bien estructurados
✓ Fáciles de mantener

¡Comienza a integrarlos en tu aplicación! 🚀

---

**Última actualización:** Enero 2026
**Versión:** 1.0.0
**Status:** ✅ Completado
