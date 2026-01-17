/**
 * Provider - Componente que proporciona el contexto global
 * Envolve toda la aplicación para dar acceso al estado global
 */

import React, { useReducer, useCallback } from "react";
import { appReducer } from "./reducer.js";
import { INITIAL_STATE } from "./store.js";
import * as Actions from "./actions.js";

/**
 * Contexto global
 */
export const GlobalContext = React.createContext();

/**
 * Provider Component
 * Envuelve la app y proporciona estado + dispatch + action creators
 *
 * Uso:
 * <GlobalProvider>
 *   <App />
 * </GlobalProvider>
 */
export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  /**
   * Callbacks memoizados para despachar acciones
   * Previene re-renders innecesarios en componentes que usan estas funciones
   */

  // AUTH
  const setUser = useCallback((user) => {
    dispatch(Actions.setUser(user));
  }, []);

  const setToken = useCallback((token) => {
    dispatch(Actions.setToken(token));
  }, []);

  const logout = useCallback(() => {
    dispatch(Actions.logout());
  }, []);

  // TASKS
  const setTasks = useCallback((tasks) => {
    dispatch(Actions.setTasks(tasks));
  }, []);

  const addTask = useCallback((task) => {
    dispatch(Actions.addTask(task));
  }, []);

  const updateTask = useCallback((id, updates) => {
    dispatch(Actions.updateTask(id, updates));
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch(Actions.deleteTask(id));
  }, []);

  const clearTasks = useCallback(() => {
    dispatch(Actions.clearTasks());
  }, []);

  // PROJECTS
  const setProjects = useCallback((projects) => {
    dispatch(Actions.setProjects(projects));
  }, []);

  const addProject = useCallback((project) => {
    dispatch(Actions.addProject(project));
  }, []);

  const updateProject = useCallback((id, updates) => {
    dispatch(Actions.updateProject(id, updates));
  }, []);

  const deleteProject = useCallback((id) => {
    dispatch(Actions.deleteProject(id));
  }, []);

  const clearProjects = useCallback(() => {
    dispatch(Actions.clearProjects());
  }, []);

  // UI
  const setLoading = useCallback((loading) => {
    dispatch(Actions.setLoading(loading));
  }, []);

  const setError = useCallback((error) => {
    dispatch(Actions.setError(error));
  }, []);

  const clearError = useCallback(() => {
    dispatch(Actions.clearError());
  }, []);

  /**
   * Valor del contexto
   * Contiene estado + todas las funciones para manipularlo
   */
  const value = {
    // Estado
    state,
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    tasks: state.tasks,
    projects: state.projects,
    loading: state.loading,
    error: state.error,

    // Auth Actions
    setUser,
    setToken,
    logout,

    // Tasks Actions
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    clearTasks,

    // Projects Actions
    setProjects,
    addProject,
    updateProject,
    deleteProject,
    clearProjects,

    // UI Actions
    setLoading,
    setError,
    clearError,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
