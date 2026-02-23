# 🌐 Estado Global con React Context + useReducer

## 📦 Estructura

```
src/store/
├── store.js           ← Estado inicial (INITIAL_STATE)
├── reducer.js         ← Lógica de transiciones (appReducer)
├── actions.js         ← Tipos de acciones + action creators
├── provider.js        ← Componente Provider (GlobalProvider)
├── useGlobalContext.js← Hook para acceder al contexto
└── index.js          ← Exporta todo
```

---

## 🚀 Setup en App.jsx

```jsx
import { GlobalProvider } from "@/store";

function App() {
  return (
    <GlobalProvider>
      <Routes>
        {/* tu app */}
      </Routes>
    </GlobalProvider>
  );
}
```

---

## 💾 Estado Disponible

```javascript
{
  // Autenticación
  user: null,              // { id, email, name, role }
  token: null,             // "jwt-token-string"
  isAuthenticated: false,  // boolean

  // Datos
  tasks: [],               // [{ id, title, status, ... }]
  projects: [],            // [{ id, name, ... }]

  // UI
  loading: false,          // boolean
  error: null,             // "error-message" || null
}
```

---

## 📝 Uso Básico

### 1️⃣ Acceder al contexto

```jsx
import { useGlobalContext } from "@/store";

function MyComponent() {
  const { user, tasks, projects } = useGlobalContext();

  return (
    <div>
      <p>Usuario: {user?.name}</p>
      <p>Tareas: {tasks.length}</p>
    </div>
  );
}
```

### 2️⃣ Modificar estado (Auth)

```jsx
import { useGlobalContext } from "@/store";

function LoginForm() {
  const { setUser, setToken, logout } = useGlobalContext();

  const handleLogin = async (email, password) => {
    const response = await authService.login(email, password);
    setUser(response.user);
    setToken(response.token);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={() => handleLogin("test@test.com", "pass")}>
        Login
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

### 3️⃣ Modificar estado (Tasks)

```jsx
import { useGlobalContext } from "@/store";

function TaskForm() {
  const { addTask, updateTask, deleteTask, tasks } = useGlobalContext();

  // Agregar tarea
  const handleAddTask = () => {
    addTask({ id: Date.now(), title: "Nueva", status: "todo" });
  };

  // Actualizar tarea
  const handleUpdateTask = (id) => {
    updateTask(id, { status: "done" });
  };

  // Eliminar tarea
  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  return (
    <div>
      <button onClick={handleAddTask}>Agregar Tarea</button>
      {tasks.map((task) => (
        <div key={task.id}>
          {task.title}
          <button onClick={() => handleUpdateTask(task.id)}>Actualizar</button>
          <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
```

### 4️⃣ Modificar estado (Projects)

```jsx
import { useGlobalContext } from "@/store";

function ProjectForm() {
  const { addProject, updateProject, deleteProject, projects } =
    useGlobalContext();

  // Agregar proyecto
  const handleAddProject = () => {
    addProject({ id: Date.now(), name: "Nuevo Proyecto" });
  };

  // Actualizar proyecto
  const handleUpdateProject = (id) => {
    updateProject(id, { name: "Actualizado" });
  };

  // Eliminar proyecto
  const handleDeleteProject = (id) => {
    deleteProject(id);
  };

  return (
    <div>
      <button onClick={handleAddProject}>Agregar Proyecto</button>
      {projects.map((project) => (
        <div key={project.id}>
          {project.name}
          <button onClick={() => handleUpdateProject(project.id)}>
            Editar
          </button>
          <button onClick={() => handleDeleteProject(project.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 5️⃣ Manejo de UI (Loading/Error)

```jsx
import { useGlobalContext } from "@/store";

function DataFetcher() {
  const { setLoading, setError, clearError, loading, error } =
    useGlobalContext();

  const handleFetch = async () => {
    setLoading(true);
    try {
      // simular fetch
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && (
        <div>
          <p>Error: {error}</p>
          <button onClick={clearError}>Descartar</button>
        </div>
      )}
      <button onClick={handleFetch} disabled={loading}>
        Cargar Datos
      </button>
    </div>
  );
}
```

---

## 🎯 Acciones Disponibles

### Autenticación

| Acción       | Parámetro  | Efecto                    |
| ------------ | ---------- | ------------------------- |
| `setUser`    | user obj   | Establece usuario actual  |
| `setToken`   | token str  | Establece token JWT       |
| `logout`     | -          | Limpia usuario, token y datos |

### Tareas

| Acción       | Parámetro        | Efecto                 |
| ------------ | ---------------- | ---------------------- |
| `setTasks`   | tasks array      | Reemplaza todas        |
| `addTask`    | task obj         | Agrega una tarea       |
| `updateTask` | id, updates obj  | Actualiza parcialmente |
| `deleteTask` | id               | Elimina una tarea      |
| `clearTasks` | -                | Limpia todas           |

### Proyectos

| Acción         | Parámetro         | Efecto                   |
| -------------- | ----------------- | ------------------------ |
| `setProjects`  | projects array    | Reemplaza todos          |
| `addProject`   | project obj       | Agrega un proyecto       |
| `updateProject`| id, updates obj   | Actualiza parcialmente   |
| `deleteProject`| id                | Elimina un proyecto      |
| `clearProjects`| -                 | Limpia todos             |

### UI

| Acción        | Parámetro      | Efecto                      |
| ------------- | -------------- | --------------------------- |
| `setLoading`  | boolean        | Activa/desactiva cargando   |
| `setError`    | error string   | Establece mensaje de error  |
| `clearError`  | -              | Limpia el error             |

---

## 🔑 Patrón Típico en un Componente

```jsx
import { useGlobalContext } from "@/store";

function Dashboard() {
  const {
    // Leer estado
    user,
    tasks,
    projects,
    loading,
    error,

    // Modificar estado
    setLoading,
    setError,
    addTask,
    updateProject,
  } = useGlobalContext();

  // Usar estado
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // llamada a API
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Renderizar
  return (
    <div>
      {error && <Alert message={error} />}
      {loading && <Spinner />}

      <div>
        <h1>Hola {user?.name}</h1>
        <p>Proyectos: {projects.length}</p>
        <p>Tareas: {tasks.length}</p>
      </div>
    </div>
  );
}
```

---

## ⚠️ Errores Comunes

### ❌ Olvidar GlobalProvider

```jsx
// ❌ ERROR - No hay contexto
<App /> {/* Error: useGlobalContext debe usarse dentro de GlobalProvider */}

// ✅ CORRECTO
<GlobalProvider>
  <App />
</GlobalProvider>
```

### ❌ Usar fuera de Provider

```jsx
// ❌ ERROR
const { user } = useGlobalContext(); // Error si no está dentro de GlobalProvider

// ✅ CORRECTO
function MyComponent() {
  // Dentro de un árbol que tiene GlobalProvider
  const { user } = useGlobalContext();
}
```

### ❌ Mutar estado directamente

```jsx
// ❌ ERROR - No hacer esto
const { tasks } = useGlobalContext();
tasks.push(newTask); // ❌ No se actualizará!

// ✅ CORRECTO - Usar acciones
const { addTask } = useGlobalContext();
addTask(newTask); // ✅ Trigger re-render
```

---

## 📊 Flujo de Datos

```
Componente
    ↓
useGlobalContext() → Lee estado
    ↓
onClick → Llama acción (ej: addTask)
    ↓
dispatch(Action)
    ↓
appReducer → Retorna nuevo estado
    ↓
Provider actualiza valor
    ↓
Componentes re-renderizan
```

---

## 💡 Tips

1. **Usa destructuring** para solo tomar lo que necesitas:
   ```jsx
   const { user, tasks } = useGlobalContext();
   ```

2. **Combina con custom hooks** para lógica reutilizable:
   ```jsx
   function useTasks() {
     const { tasks, addTask, deleteTask } = useGlobalContext();
     return { tasks, addTask, deleteTask };
   }
   ```

3. **Evita re-renders innecesarios** con useMemo:
   ```jsx
   const filteredTasks = useMemo(
     () => tasks.filter((t) => t.status === "done"),
     [tasks]
   );
   ```

4. **Integra con Redux DevTools** si necesitas debug avanzado.

---

## 🔗 Relación con App.jsx

```jsx
// app.jsx
import { GlobalProvider } from "@/store";
import Router from "./Router";

function App() {
  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
}

// Ahora cualquier componente dentro de Router
// puede usar: const { user, tasks } = useGlobalContext();
```
