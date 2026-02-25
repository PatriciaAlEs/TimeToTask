/**
 * Hook para manejar tareas
 * Lógica centralizada de tareas
 */

import { useEffect } from 'react';
import { useGlobalContext } from '../store';
import { taskService } from '../services/taskService';

const normalizeTask = (response) => {
    if (!response) {
        return null;
    }

    if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
        return response.data;
    }

    return response;
};

const normalizeTaskList = (response) => {
    if (Array.isArray(response)) {
        return response;
    }

    if (Array.isArray(response?.data)) {
        return response.data;
    }

    return [];
};

export function useTasks(projectId = null) {
    const { tasks, loading, error, setTasks, addTask, setLoading, setError, updateTask, deleteTask, moveTask } =
        useGlobalContext();

    // Cargar tareas
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = projectId
                ? await taskService.getByProject(projectId)
                : await taskService.getAll();
            setTasks(normalizeTaskList(data));
        } catch (err) {
            setError(err.response?.data?.message || 'Error cargando tareas');
        } finally {
            setLoading(false);
        }
    };

    // Crear tarea
    const createTask = async (taskData) => {
        setLoading(true);
        try {
            const created = await taskService.create(taskData);
            const normalizedTask = normalizeTask(created);

            if (normalizedTask) {
                addTask(normalizedTask);
            }

            return normalizedTask;
        } catch (err) {
            setError(err.response?.data?.message || 'Error creando tarea');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Actualizar tarea
    const updateTaskData = async (taskId, taskData) => {
        setLoading(true);
        try {
            const updated = await taskService.update(taskId, taskData);
            const normalizedTask = normalizeTask(updated);
            const updatePayload = normalizedTask || taskData;
            updateTask(taskId, updatePayload);
            return normalizedTask;
        } catch (err) {
            setError(err.response?.data?.message || 'Error actualizando tarea');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Eliminar tarea
    const deleteTaskData = async (taskId) => {
        setLoading(true);
        try {
            await taskService.delete(taskId);
            deleteTask(taskId);
        } catch (err) {
            setError(err.response?.data?.message || 'Error eliminando tarea');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Cambiar estado de tarea
    const changeTaskStatus = async (taskId, status) => {
        try {
            const updated = await taskService.updateStatus(taskId, status);
            moveTask(taskId, status);
            return updated;
        } catch (err) {
            setError(err.response?.data?.message || 'Error actualizando estado');
            throw err;
        }
    };

    // Asignar tarea
    const assignTask = async (taskId, userId) => {
        try {
            const updated = await taskService.assignTask(taskId, userId);
            updateTask(taskId, updated);
            return updated;
        } catch (err) {
            setError(err.response?.data?.message || 'Error asignando tarea');
            throw err;
        }
    };

    // Cargar inicial
    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTaskData,
        deleteTaskData,
        changeTaskStatus,
        assignTask,
    };
}
