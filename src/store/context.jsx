/**
 * Contexto global de la aplicación Jira Light
 * Proporciona estado centralizado y acceso a actions
 */

import React, { createContext, useReducer, useCallback } from 'react';
import { appReducer, initialState } from './reducer';

// Crear contexto
export const AppContext = createContext();

// Provider
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Acciones
    const setLoading = useCallback((isLoading) => {
        dispatch({ type: 'SET_LOADING', payload: isLoading });
    }, []);

    const setError = useCallback((error) => {
        dispatch({ type: 'SET_ERROR', payload: error });
    }, []);

    const clearError = useCallback(() => {
        dispatch({ type: 'CLEAR_ERROR' });
    }, []);

    // Projects
    const setProjects = useCallback((projects) => {
        dispatch({ type: 'SET_PROJECTS', payload: projects });
    }, []);

    const addProject = useCallback((project) => {
        dispatch({ type: 'ADD_PROJECT', payload: project });
    }, []);

    const updateProject = useCallback((projectId, project) => {
        dispatch({ type: 'UPDATE_PROJECT', payload: { projectId, project } });
    }, []);

    const deleteProject = useCallback((projectId) => {
        dispatch({ type: 'DELETE_PROJECT', payload: projectId });
    }, []);

    const setSelectedProject = useCallback((projectId) => {
        dispatch({ type: 'SET_SELECTED_PROJECT', payload: projectId });
    }, []);

    // Tasks
    const setTasks = useCallback((tasks) => {
        dispatch({ type: 'SET_TASKS', payload: tasks });
    }, []);

    const addTask = useCallback((task) => {
        dispatch({ type: 'ADD_TASK', payload: task });
    }, []);

    const updateTask = useCallback((taskId, task) => {
        dispatch({ type: 'UPDATE_TASK', payload: { taskId, task } });
    }, []);

    const deleteTask = useCallback((taskId) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
    }, []);

    const moveTask = useCallback((taskId, status) => {
        dispatch({ type: 'MOVE_TASK', payload: { taskId, status } });
    }, []);

    // Auth
    const setUser = useCallback((user) => {
        dispatch({ type: 'SET_USER', payload: user });
    }, []);

    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
    }, []);

    const value = {
        // State
        ...state,

        // General
        setLoading,
        setError,
        clearError,

        // Projects
        setProjects,
        addProject,
        updateProject,
        deleteProject,
        setSelectedProject,

        // Tasks
        setTasks,
        addTask,
        updateTask,
        deleteTask,
        moveTask,

        // Auth
        setUser,
        logout,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
