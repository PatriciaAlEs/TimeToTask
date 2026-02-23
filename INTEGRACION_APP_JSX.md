/**
 * REFERENCIA - Cómo integrar GlobalProvider en App.jsx
 * 
 * Este es el patrón correcto para envolver tu aplicación
 * con el estado global
 */

// ============================================
// OPCIÓN 1: Setup Básico
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
// OPCIÓN 2: Con React Router
// ============================================

import { GlobalProvider } from "@/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import Login from "@/pages/Login";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;

// ============================================
// OPCIÓN 3: Con Rutas Protegidas + MainLayout
// ============================================

import { GlobalProvider } from "@/store";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useGlobalContext } from "@/store";

// Componente protegido
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useGlobalContext();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Importar páginas
import MainLayout from "@/layout/MainLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";

function AppRoutes() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas con layout */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <GlobalProvider>
      <Router>
        <AppRoutes />
      </Router>
    </GlobalProvider>
  );
}

export default App;

// ============================================
// OPCIÓN 4: Con Sincronización de Datos
// ============================================

import { GlobalProvider } from "@/store";
import { useGlobalContext } from "@/store";
import { useEffect } from "react";

// Componente que sincroniza datos al iniciar
function DataSyncProvider({ children }) {
  const { user, setUser, setToken, setTasks } = useGlobalContext();

  useEffect(() => {
    // Restaurar sesión desde localStorage
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    // Cargar tareas cuando hay usuario
    if (user) {
      fetchUserTasks();
    }
  }, [user]);

  const fetchUserTasks = async () => {
    try {
      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const tasks = await response.json();
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return children;
}

function App() {
  return (
    <GlobalProvider>
      <DataSyncProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DataSyncProvider>
    </GlobalProvider>
  );
}

export default App;

// ============================================
// OPCIÓN 5: Completa (Recomendado para Producción)
// ============================================

import { GlobalProvider } from "@/store";
import { useGlobalContext } from "@/store";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Componente de sincronización
function AppInitializer({ children }) {
  const { user, setUser, setToken, setTasks, setProjects, setError } =
    useGlobalContext();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 1. Restaurar sesión
    const initializeApp = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
          setUser(JSON.parse(savedUser));
          setToken(savedToken);

          // 2. Verificar token válido
          const response = await fetch("/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          });

          if (!response.ok) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            throw new Error("Token inválido");
          }

          // 3. Cargar datos del usuario
          await fetchInitialData(savedToken);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  const fetchInitialData = async (token) => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        fetch("/api/tasks", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const tasks = await tasksRes.json();
      const projects = await projectsRes.json();

      setTasks(tasks);
      setProjects(projects);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // Mostrar loader mientras se inicializa
  if (!isInitialized) {
    return <div className="loader">Cargando...</div>;
  }

  return children;
}

// Componente protegido
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useGlobalContext();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Importar todas las páginas
import MainLayout from "@/layout/MainLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";

function App() {
  return (
    <GlobalProvider>
      <AppInitializer>
        <Router>
          <Routes>
            {/* Ruta pública */}
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </MainLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AppInitializer>
    </GlobalProvider>
  );
}

export default App;

// ============================================
// CHECKLIST DE IMPLEMENTACIÓN
// ============================================

/*
✅ Checklist:

1. [ ] Decidir qué opción usar (1-5)
2. [ ] Reemplazar contenido de App.jsx
3. [ ] Importar GlobalProvider de "@/store"
4. [ ] Importar useGlobalContext si necesitas ProtectedRoute
5. [ ] Importar todas las páginas necesarias
6. [ ] Verificar rutas coincidan con tu estructura
7. [ ] Ejecutar: npm run dev
8. [ ] Probar login → debe guardarse en GlobalContext
9. [ ] Probar navegación entre rutas
10. [ ] Verificar que no hay errores de contexto

*/

// ============================================
// RECOMENDACIÓN
// ============================================

/*

Para empezar: USA OPCIÓN 3
- Setup básico
- Rutas protegidas
- MainLayout

Cuando crezcas: USA OPCIÓN 5
- Sincronización automática
- Verificación de token
- Loader inicial

*/
