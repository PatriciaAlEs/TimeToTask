/**
 * EJEMPLO DE INTEGRACIÓN - State Global + Componentes
 * Muestra cómo usar el contexto global en una aplicación real
 */

// ============================================
// 1. SETUP EN APP.JSX
// ============================================

import { GlobalProvider } from "@/store";
import Dashboard from "@/pages/Dashboard";

function App() {
  return (
    <GlobalProvider>
      <Dashboard />
    </GlobalProvider>
  );
}

export default App;

// ============================================
// 2. EJEMPLO: LOGIN CON ESTADO GLOBAL
// ============================================

import { useGlobalContext } from "@/store";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken, setLoading, setError, loading, error } =
    useGlobalContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular llamada a API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      // Guardar en estado global
      setUser(data.user);
      setToken(data.token);
      setLoading(false);

      // Guardar en localStorage para persistencia
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    } catch (err) {
      setError(err.message);
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
// 3. EJEMPLO: DASHBOARD CON TAREAS
// ============================================

import { useGlobalContext } from "@/store";
import { useEffect } from "react";

function Dashboard() {
  const {
    user,
    tasks,
    projects,
    loading,
    error,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    setLoading,
    setError,
  } = useGlobalContext();

  // Cargar tareas al montar
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (user) fetchTasks();
  }, [user]);

  const handleAddTask = async () => {
    const newTask = {
      title: "Nueva tarea",
      status: "todo",
      createdAt: new Date(),
    };

    try {
      // Agregar al backend
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      });
      const created = await response.json();

      // Agregar al estado local
      addTask(created);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCompleteTask = (taskId) => {
    updateTask(taskId, { status: "done" });
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
      deleteTask(taskId);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Hola, {user?.name}</h1>
        <p>Tienes {tasks.length} tareas</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      <button onClick={handleAddTask} disabled={loading}>
        + Agregar Tarea
      </button>

      <div className="tasks-grid">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p className={`status status-${task.status}`}>{task.status}</p>

              <button onClick={() => handleCompleteTask(task.id)}>
                Completar
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================
// 4. EJEMPLO: COMPONENTE PROTEGIDO
// ============================================

import { useGlobalContext } from "@/store";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useGlobalContext();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Uso:
// <ProtectedRoute>
//   <Dashboard />
// </ProtectedRoute>

// ============================================
// 5. EJEMPLO: CUSTOM HOOK REUTILIZABLE
// ============================================

import { useGlobalContext } from "@/store";
import { useEffect, useState } from "react";

function useTaskManagement() {
  const { tasks, setTasks, addTask, updateTask, deleteTask } =
    useGlobalContext();
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Obtener tareas por estado
  const getTasksByStatus = (status) => tasks.filter((t) => t.status === status);

  // Contar tareas
  const countByStatus = (status) => getTasksByStatus(status).length;

  // Crear nueva tarea
  const createTask = async (taskData) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(taskData),
      });
      const newTask = await response.json();
      addTask(newTask);
      return newTask;
    } catch (error) {
      console.error("Error creando tarea:", error);
    }
  };

  // Completar tarea
  const completeTask = (taskId) => {
    updateTask(taskId, { status: "done", completedAt: new Date() });
  };

  return {
    tasks,
    filteredTasks,
    getTasksByStatus,
    countByStatus,
    createTask,
    completeTask,
    deleteTask,
    updateTask,
  };
}

// Uso en componente:
// const { createTask, completeTask, getTasksByStatus } = useTaskManagement();

// ============================================
// 6. EJEMPLO: SINCRONIZACIÓN CON BACKEND
// ============================================

import { useGlobalContext } from "@/store";
import { useEffect } from "react";

function SyncDataComponent() {
  const { user, setUser, setError } = useGlobalContext();

  // Auto-sincronizar datos cada 30 segundos
  useEffect(() => {
    const syncInterval = setInterval(async () => {
      try {
        const response = await fetch("/api/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUser(updatedUser);
        }
      } catch (err) {
        setError(err.message);
      }
    }, 30000);

    return () => clearInterval(syncInterval);
  }, []);

  return null; // Componente invisible, solo sincroniza
}

// ============================================
// INTEGRACIÓN FINAL EN APP.JSX
// ============================================

/*
import { GlobalProvider } from "@/store";
import Router from "@/Router";
import SyncDataComponent from "@/components/SyncDataComponent";

function App() {
  return (
    <GlobalProvider>
      <SyncDataComponent /> {/* Sincroniza datos */}
      <Router /> {/* Rutas protegidas con ProtectedRoute */}
    </GlobalProvider>
  );
}

export default App;
*/
