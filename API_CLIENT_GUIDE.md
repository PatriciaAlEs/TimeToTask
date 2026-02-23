# 📡 API Client - Documentación

## ¿Qué es?

`api.js` es un cliente centralizado para todas las llamadas al backend que:
- ✅ Maneja el token de autenticación automáticamente
- ✅ Controla errores HTTP consistentemente
- ✅ Proporciona métodos organizados por recurso
- ✅ Incluye logging en desarrollo
- ✅ Es reutilizable en todas las acciones

---

## 📋 Características

### 1. **Autenticación Automática**
```javascript
// El token se obtiene automáticamente del localStorage
// y se agrega como "Bearer token" en todos los requests
const headers = {
  "Authorization": `Bearer ${token}`,
  // ...
};
```

### 2. **Manejo de Errores HTTP**
```javascript
401 → Sesión expirada (limpia localStorage, redirige a login)
403 → Sin permisos
404 → Recurso no encontrado
500 → Error del servidor
etc.
```

### 3. **Métodos HTTP Base**
```javascript
get(endpoint, options)      // GET
post(endpoint, body)        // POST
put(endpoint, body)         // PUT
patch(endpoint, body)       // PATCH
delete_(endpoint)           // DELETE
apiCall(endpoint, method)   // Manual
```

### 4. **Métodos Organizados por Recurso**
```javascript
api.auth.*      // Login, register, verify, etc
api.tasks.*     // CRUD de tareas
api.projects.*  // CRUD de proyectos
api.users.*     // Usuarios
```

---

## 🚀 Uso Básico

### Importar

```javascript
import api, { get, post, put, delete_ } from "@/services/api";
```

### GET - Obtener datos

```javascript
// Obtener todas las tareas
const tasks = await get("/tasks");

// Obtener tarea específica
const task = await get("/tasks/1");

// Con filtros
const tasks = await get("/tasks?status=done&priority=high");
```

### POST - Crear datos

```javascript
// Crear tarea
const newTask = await post("/tasks", {
  title: "Nueva tarea",
  description: "Descripción",
  projectId: "123",
});
```

### PUT - Actualizar datos

```javascript
// Actualizar tarea completa
const updated = await put("/tasks/1", {
  title: "Título actualizado",
  status: "done",
  priority: "high",
});
```

### PATCH - Actualizar parcial

```javascript
// Solo actualizar estado
const updated = await patch("/tasks/1", { status: "done" });
```

### DELETE - Eliminar datos

```javascript
// Eliminar tarea
await delete_("/tasks/1");
```

---

## 🔐 Métodos de Autenticación

### Login

```javascript
const result = await api.auth.login("user@email.com", "password");
// Retorna: { user: {...}, token: "..." }
// Automáticamente guarda token y user en localStorage
```

### Register

```javascript
const result = await api.auth.register("user@email.com", "password", "John");
// Retorna: { user: {...}, token: "..." }
// Automáticamente guarda token y user en localStorage
```

### Logout

```javascript
await api.auth.logout();
// Limpia localStorage (token, user)
// Opcionalmente notifica al backend
```

### Verificar Token

```javascript
const result = await api.auth.verify();
// Retorna: { valid: true/false, user: {...} }
```

### Obtener Usuario Actual

```javascript
const user = await api.auth.getCurrentUser();
// Retorna: { user: {...} }
```

### Cambiar Contraseña

```javascript
await api.auth.changePassword("password_antigua", "password_nueva");
```

---

## 📝 Métodos de Tareas

### Obtener todas

```javascript
const tasks = await api.tasks.getAll();
const tasks = await api.tasks.getAll({ status: "done", priority: "high" });
```

### Obtener por ID

```javascript
const task = await api.tasks.getById("task-123");
```

### Crear

```javascript
const newTask = await api.tasks.create({
  title: "Nueva tarea",
  description: "Descripción",
  projectId: "project-123",
  status: "todo",
  priority: "medium",
});
```

### Actualizar

```javascript
const updated = await api.tasks.update("task-123", {
  title: "Título nuevo",
  status: "done",
});
```

### Eliminar

```javascript
await api.tasks.delete("task-123");
```

### Cambiar Estado

```javascript
await api.tasks.updateStatus("task-123", "done");
```

### Asignar a Usuario

```javascript
await api.tasks.assignTo("task-123", "user-456");
```

### Agregar Comentario

```javascript
await api.tasks.addComment("task-123", "Este es un comentario");
```

### Obtener por Proyecto

```javascript
const tasks = await api.tasks.getByProject("project-123");
```

---

## 📁 Métodos de Proyectos

### Obtener todos

```javascript
const projects = await api.projects.getAll();
```

### Obtener por ID

```javascript
const project = await api.projects.getById("project-123");
```

### Crear

```javascript
const newProject = await api.projects.create({
  name: "Nuevo Proyecto",
  description: "Descripción",
});
```

### Actualizar

```javascript
const updated = await api.projects.update("project-123", {
  name: "Nombre actualizado",
});
```

### Eliminar

```javascript
await api.projects.delete("project-123");
```

### Agregar Miembro

```javascript
await api.projects.addMember("project-123", "user-456", "member");
// role: "owner", "admin", "member"
```

### Eliminar Miembro

```javascript
await api.projects.removeMember("project-123", "user-456");
```

### Obtener Miembros

```javascript
const members = await api.projects.getMembers("project-123");
```

---

## 👥 Métodos de Usuarios

### Obtener todos

```javascript
const users = await api.users.getAll();
```

### Obtener por ID

```javascript
const user = await api.users.getById("user-123");
```

### Actualizar Perfil

```javascript
const updated = await api.users.updateProfile("user-123", {
  name: "Nuevo nombre",
  email: "nuevo@email.com",
  avatar: "url-avatar",
});
```

### Obtener Perfil Actual

```javascript
const myProfile = await api.users.getProfile();
```

### Buscar Usuarios

```javascript
const results = await api.users.search("john");
```

---

## 🛠️ Uso Avanzado

### Llamada Manual

```javascript
// Método genérico para casos especiales
const result = await apiCall("/custom-endpoint", "POST", { data: "..." });
```

### Headers Personalizados

```javascript
const result = await get("/tasks", {
  headers: {
    "X-Custom-Header": "value",
  },
});
```

### Obtener Token

```javascript
const token = api.getToken();
```

### Limpiar Sesión

```javascript
api.clearSession(); // Limpia localStorage
```

---

## 🎯 Ejemplo Completo: Login + Cargar Tareas

```javascript
import api from "@/services/api";
import { useGlobalContext } from "@/store";

function LoginPage() {
  const { setUser, setToken, setTasks, setError, setLoading } =
    useGlobalContext();

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      // 1. Login
      const auth = await api.auth.login(email, password);
      setUser(auth.user);
      setToken(auth.token);

      // 2. Cargar tareas
      const tasks = await api.tasks.getAll();
      setTasks(tasks);

      // 3. Navegar a dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin(email, password);
    }}>
      {/* formulario */}
    </form>
  );
}
```

---

## 📊 Ejemplo Completo: CRUD de Tareas

```javascript
import api from "@/services/api";
import { useGlobalContext } from "@/store";

function TaskManager() {
  const { tasks, addTask, updateTask, deleteTask, setError } =
    useGlobalContext();

  // CREATE
  const handleCreate = async (title) => {
    try {
      const newTask = await api.tasks.create({ title, status: "todo" });
      addTask(newTask);
    } catch (err) {
      setError(err.message);
    }
  };

  // UPDATE
  const handleUpdate = async (id, updates) => {
    try {
      const updated = await api.tasks.update(id, updates);
      updateTask(id, updates);
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await api.tasks.delete(id);
      deleteTask(id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

---

## ⚠️ Manejo de Errores

### Bloque Try-Catch

```javascript
try {
  const data = await api.tasks.getAll();
} catch (error) {
  console.error(error.message);
  // "Sesión expirada. Por favor, inicia sesión de nuevo."
  // "Error del servidor. Intenta más tarde."
  // etc.
}
```

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| "Sesión expirada" | Token inválido | Hacer login de nuevo |
| "No tienes permisos" | 403 Forbidden | Verificar permisos |
| "Recurso no encontrado" | 404 Not Found | Verificar ID |
| "Error del servidor" | 500 Internal | Revisar backend |

---

## 🔍 Logging en Desarrollo

En desarrollo, verás logs como:

```javascript
// Request
[API] POST http://localhost:5000/api/tasks { title: "Nueva" }

// Response exitosa
[API] ✅ 201 { id: "123", title: "Nueva", status: "todo" }

// Response con error
[API] ❌ Error: Sesión expirada. Por favor, inicia sesión de nuevo.
```

---

## 🌍 Variables de Entorno

```bash
# .env o .env.local
REACT_APP_API_URL=http://localhost:5000/api
```

Si no está configurada, usa el valor por defecto: `http://localhost:5000/api`

---

## 📚 Integración con Estado Global

```javascript
// En un hook o componente
import api from "@/services/api";
import { useGlobalContext } from "@/store";

function useFetchTasks() {
  const { setTasks, setLoading, setError } = useGlobalContext();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await api.tasks.getAll();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
}
```

---

## ✅ Checklist

- [x] Entiendo cómo funciona api.js
- [x] Sé importar los métodos
- [x] Sé usar auth, tasks, projects
- [x] Sé manejar errores
- [x] Sé integrar con estado global
- [x] Configuré REACT_APP_API_URL (opcional)

---

**¡Listo para usar!** 🚀
