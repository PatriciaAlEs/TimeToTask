/**
 * EJEMPLO: Integración API + Estado Global
 * Muestra cómo usar api.js con el contexto global
 */

// ============================================
// EJEMPLO 1: Login
// ============================================

import api from "@/services/api";
import { useGlobalContext } from "@/store";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken, setLoading, setError, loading, error } =
    useGlobalContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Llamar API de login
      const result = await api.auth.login(email, password);

      // 2. Guardar en estado global
      setUser(result.user);
      setToken(result.token);

      // 3. Navegar (opcional)
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      {error && <p className="error">{error}</p>}
      <button disabled={loading} type="submit">
        {loading ? "Cargando..." : "Login"}
      </button>
    </form>
  );
}

// ============================================
// EJEMPLO 2: Cargar Datos al Iniciar
// ============================================

import api from "@/services/api";
import { useGlobalContext } from "@/store";
import { useEffect } from "react";

function Dashboard() {
  const { user, setTasks, setProjects, setLoading, setError } =
    useGlobalContext();

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        // Cargar tareas y proyectos en paralelo
        const [tasksData, projectsData] = await Promise.all([
          api.tasks.getAll(),
          api.projects.getAll(),
        ]);

        setTasks(tasksData);
        setProjects(projectsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);
}

// ============================================
// EJEMPLO 3: CRUD de Tareas
// ============================================

import api from "@/services/api";
import { useGlobalContext } from "@/store";

function TaskManager() {
  const { tasks, addTask, updateTask, deleteTask, setError, setLoading } =
    useGlobalContext();

  // CREATE
  const handleCreateTask = async (title) => {
    setLoading(true);
    try {
      const newTask = await api.tasks.create({
        title,
        status: "todo",
        priority: "medium",
      });
      addTask(newTask);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const handleUpdateTask = async (id, updates) => {
    try {
      await api.tasks.update(id, updates);
      updateTask(id, updates); // Actualiza estado local inmediatamente
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE
  const handleDeleteTask = async (id) => {
    try {
      await api.tasks.delete(id);
      deleteTask(id); // Actualiza estado local inmediatamente
    } catch (err) {
      setError(err.message);
    }
  };

  // CAMBIAR ESTADO
  const handleChangeStatus = async (id, status) => {
    try {
      await api.tasks.updateStatus(id, status);
      updateTask(id, { status }); // Actualiza estado local
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <button onClick={() => handleCreateTask("Nueva tarea")}>
        + Agregar
      </button>

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.status}</p>

          <select
            value={task.status}
            onChange={(e) => handleChangeStatus(task.id, e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button onClick={() => handleUpdateTask(task.id, { priority: "high" })}>
            Marcar importante
          </button>

          <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

// ============================================
// EJEMPLO 4: Búsqueda de Usuarios
// ============================================

import api from "@/services/api";
import { useState } from "react";

function UserSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const users = await api.users.search(query);
      setResults(users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar usuario..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}

      {results.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// EJEMPLO 5: Agregar Miembro a Proyecto
// ============================================

import api from "@/services/api";
import { useGlobalContext } from "@/store";

function AddMemberModal({ projectId, onClose }) {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("member");
  const { setError, setLoading } = useGlobalContext();

  const handleAddMember = async () => {
    setLoading(true);
    try {
      await api.projects.addMember(projectId, userId, role);
      // Recargar proyecto (opcional)
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="ID del usuario"
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="member">Miembro</option>
        <option value="admin">Admin</option>
        <option value="owner">Owner</option>
      </select>

      <button onClick={handleAddMember}>Agregar</button>
    </div>
  );
}

// ============================================
// EJEMPLO 6: Custom Hook - useTasks
// ============================================

import api from "@/services/api";
import { useGlobalContext } from "@/store";
import { useCallback } from "react";

function useTasks() {
  const { tasks, addTask, updateTask, deleteTask, setError, setLoading } =
    useGlobalContext();

  const createTask = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const newTask = await api.tasks.create(data);
        addTask(newTask);
        return newTask;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, addTask]
  );

  const modifyTask = useCallback(
    async (id, updates) => {
      try {
        await api.tasks.update(id, updates);
        updateTask(id, updates);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    [setError, updateTask]
  );

  const removeTask = useCallback(
    async (id) => {
      try {
        await api.tasks.delete(id);
        deleteTask(id);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    [setError, deleteTask]
  );

  const changeStatus = useCallback(
    async (id, status) => {
      try {
        await api.tasks.updateStatus(id, status);
        updateTask(id, { status });
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    [setError, updateTask]
  );

  return {
    tasks,
    createTask,
    modifyTask,
    removeTask,
    changeStatus,
  };
}

// Uso:
// function MyComponent() {
//   const { tasks, createTask, removeTask } = useTasks();
//   // ...
// }

// ============================================
// EJEMPLO 7: Sincronización Automática
// ============================================

import api from "@/services/api";
import { useGlobalContext } from "@/store";
import { useEffect } from "react";

function AppSyncProvider({ children }) {
  const { user, setUser, setTasks, setProjects } = useGlobalContext();

  // Sincronizar datos al iniciar
  useEffect(() => {
    const syncData = async () => {
      if (!user) return;

      try {
        const [tasks, projects] = await Promise.all([
          api.tasks.getAll(),
          api.projects.getAll(),
        ]);

        setTasks(tasks);
        setProjects(projects);
      } catch (error) {
        console.error("Error sincronizando:", error);
      }
    };

    syncData();
  }, [user]);

  // Auto-sincronizar cada 30 segundos (opcional)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!user) return;

      try {
        const tasks = await api.tasks.getAll();
        setTasks(tasks);
      } catch (error) {
        console.warn("Error en sincronización automática:", error);
      }
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [user]);

  return children;
}

// Uso en App.jsx:
// <GlobalProvider>
//   <AppSyncProvider>
//     <Router>...</Router>
//   </AppSyncProvider>
// </GlobalProvider>

// ============================================
// EJEMPLO 8: Manejo de Errores Avanzado
// ============================================

import api from "@/services/api";

async function handleAPICall(apiMethod, onSuccess, onError) {
  try {
    const result = await apiMethod();
    onSuccess(result);
  } catch (error) {
    // Diferenciar tipos de error
    if (error.message.includes("Sesión expirada")) {
      // Redirigir a login
      window.location.href = "/login";
    } else if (error.message.includes("No tienes permisos")) {
      // Mostrar modal de permisos
      showModal("No tienes permisos para esta acción");
    } else if (error.message.includes("no encontrado")) {
      // Mostrar 404
      showNotFound();
    } else {
      // Error genérico
      onError(error.message);
    }
  }
}

// Uso:
// handleAPICall(
//   () => api.tasks.getAll(),
//   (tasks) => setTasks(tasks),
//   (error) => setError(error)
// );
