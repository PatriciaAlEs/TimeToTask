/**
 * Task Service
 * Maneja todas las operaciones relacionadas con tareas
 */

import api from './api';

const ENDPOINT = '/tasks';

export const taskService = {
  /**
   * Obtiene todas las tareas
   */
  getAll: async () => {
    try {
      return await api.tasks.getAll();
    } catch (error) {
      console.error('Error getting all tasks:', error);
      throw error;
    }
  },

  /**
   * Obtiene tareas por proyecto
   */
  getByProject: async (projectId) => {
    try {
      return await api.tasks.getByProject(projectId);
    } catch (error) {
      console.error('Error getting tasks by project:', error);
      throw error;
    }
  },

  /**
   * Obtiene una tarea por ID
   */
  getById: async (taskId) => {
    try {
      return await api.tasks.getById(taskId);
    } catch (error) {
      console.error('Error getting task:', error);
      throw error;
    }
  },

  /**
   * Crea una nueva tarea
   */
  create: async (taskData) => {
    try {
      return await api.tasks.create(taskData);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  /**
   * Actualiza una tarea
   */
  update: async (taskId, taskData) => {
    try {
      return await api.tasks.update(taskId, taskData);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  /**
   * Elimina una tarea
   */
  delete: async (taskId) => {
    try {
      return await api.tasks.delete(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  /**
   * Marca una tarea como completada
   */
  markComplete: async (taskId) => {
    try {
      return await api.tasks.update(taskId, { completed: true });
    } catch (error) {
      console.error('Error marking task complete:', error);
      throw error;
    }
  },

  /**
   * Cambia el estado de una tarea
   */
  updateStatus: async (taskId, status) => {
    try {
      return await api.tasks.update(taskId, { status });
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  },

  /**
   * Mueve una tarea a otro proyecto
   */
  moveToProject: async (taskId, projectId) => {
    try {
      return await api.tasks.update(taskId, { projectId });
    } catch (error) {
      console.error('Error moving task:', error);
      throw error;
    }
  },
};
