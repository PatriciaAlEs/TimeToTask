# ⚡ API Client - TL;DR

## ¿Qué es?

Cliente centralizado para llamadas al backend que maneja:
- ✅ Token Bearer automático
- ✅ Errores HTTP
- ✅ Métodos organizados

---

## 📦 Importar

```javascript
import api, { get, post, put, delete_ } from "@/services/api";
```

---

## 🎯 Uso Rápido

### Métodos Base
```javascript
await get("/tasks")                    // GET
await post("/tasks", { title: "..." }) // POST
await put("/tasks/1", { ... })         // PUT
await patch("/tasks/1", { ... })       // PATCH
await delete_("/tasks/1")              // DELETE
```

### Auth
```javascript
await api.auth.login(email, password)
await api.auth.register(email, password, name)
await api.auth.logout()
await api.auth.verify()
```

### Tasks
```javascript
await api.tasks.getAll()
await api.tasks.getById(id)
await api.tasks.create(data)
await api.tasks.update(id, data)
await api.tasks.delete(id)
await api.tasks.updateStatus(id, status)
await api.tasks.assignTo(id, userId)
```

### Projects
```javascript
await api.projects.getAll()
await api.projects.getById(id)
await api.projects.create(data)
await api.projects.update(id, data)
await api.projects.delete(id)
await api.projects.addMember(projectId, userId, role)
```

### Users
```javascript
await api.users.getAll()
await api.users.getById(id)
await api.users.updateProfile(id, data)
await api.users.search(query)
```

---

## 🔐 Autenticación Automática

El token se agrega automáticamente en todos los requests:

```javascript
// Esto sucede automáticamente:
// Headers: { Authorization: "Bearer token" }
```

---

## 🚨 Manejo de Errores

```javascript
try {
  await api.tasks.getAll();
} catch (error) {
  console.error(error.message);
  // "Sesión expirada..."
  // "Error del servidor..."
}
```

---

## 💡 Ejemplo Completo

```javascript
import api from "@/services/api";
import { useGlobalContext } from "@/store";

function Dashboard() {
  const { setTasks, setError } = useGlobalContext();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await api.tasks.getAll();
        setTasks(tasks);
      } catch (error) {
        setError(error.message);
      }
    };

    loadTasks();
  }, []);
}
```

---

## 📝 Notas

- Token se obtiene de localStorage automáticamente
- 401 (expirado) → limpia sesión
- Error handling integrado
- Logging en desarrollo
- Compatible con estado global

---

**Leer más:** `API_CLIENT_GUIDE.md` 📖
