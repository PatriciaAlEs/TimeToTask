# ⚡ Estado Global - TL;DR

## 4 Archivos = Sistema Completo

| Archivo | Propósito | Contiene |
|---------|-----------|----------|
| **store.js** | Estado inicial | `INITIAL_STATE` con 6 propiedades |
| **actions.js** | Tipos + Creators | `ACTIONS` enum + funciones como `setUser()` |
| **reducer.js** | Lógica de cambios | `appReducer()` - función pura |
| **provider.js** | Proporciona contexto | `GlobalProvider` + `GlobalContext` |

---

## Setup en 3 Pasos

### 1. Envuelve App

```jsx
import { GlobalProvider } from "@/store";

<GlobalProvider>
  <App />
</GlobalProvider>
```

### 2. Accede en cualquier componente

```jsx
const { user, tasks, addTask } = useGlobalContext();
```

### 3. Modifica estado

```jsx
addTask({ title: "Nueva" }); // Automáticamente re-renderiza
```

---

## 6 Propiedades de Estado

```javascript
{
  user: null,                // Datos del usuario loggeado
  token: null,               // JWT token
  isAuthenticated: false,    // ¿Está loggeado?
  tasks: [],                 // Lista de tareas
  projects: [],              // Lista de proyectos
  loading: false,            // ¿Cargando?
  error: null,               // Mensaje de error
}
```

---

## Acciones Disponibles

### 👤 Auth

- `setUser(user)` - Establece usuario
- `setToken(token)` - Establece token
- `logout()` - Limpia todo

### 📝 Tasks

- `setTasks(tasks)` - Reemplaza todas
- `addTask(task)` - Agrega una
- `updateTask(id, updates)` - Modifica
- `deleteTask(id)` - Elimina

### 📁 Projects

- `setProjects(projects)` - Reemplaza todos
- `addProject(project)` - Agrega uno
- `updateProject(id, updates)` - Modifica
- `deleteProject(id)` - Elimina

### 🎨 UI

- `setLoading(bool)` - Activa cargando
- `setError(msg)` - Muestra error
- `clearError()` - Limpia error

---

## Patrón Típico

```jsx
import { useGlobalContext } from "@/store";

function MyComponent() {
  const { 
    // Leer
    user, tasks, loading, error,
    // Escribir
    addTask, updateTask, deleteTask 
  } = useGlobalContext();

  useEffect(() => {
    // Cargar datos
    fetchTasks();
  }, [user]);

  return (
    <>
      {loading && <Spinner />}
      {error && <Alert>{error}</Alert>}
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </>
  );
}
```

---

## 🔄 Flujo

```
useGlobalContext()
        ↓
Leer estado (user, tasks, etc)
        ↓
onClick → addTask({...})
        ↓
dispatch(Action)
        ↓
appReducer → Nuevo estado
        ↓
Provider actualiza
        ↓
Componentes re-renderizan ✨
```

---

## Ejemplo Real: Login

```jsx
const { setUser, setToken, loading, error } = useGlobalContext();

const handleLogin = async (email, password) => {
  try {
    const res = await api.login(email, password);
    setUser(res.user);        // ✅ Guarda usuario
    setToken(res.token);      // ✅ Guarda token
    // Automáticamente re-renderiza
  } catch (err) {
    setError(err.message);    // ✅ Muestra error
  }
};
```

---

## ✅ Checklist

- [ ] Entiendo store.js (estado inicial)
- [ ] Entiendo actions.js (tipos + creators)
- [ ] Entiendo reducer.js (lógica)
- [ ] Entiendo provider.js (GlobalProvider)
- [ ] Agregué GlobalProvider a App.jsx
- [ ] Importé useGlobalContext en componente
- [ ] Accedí a propiedades del estado
- [ ] Llamé a una acción (ej: addTask)
- [ ] Vi que el componente se re-renderizó

---

**¡Listo! Estado global funcional** 🎉
