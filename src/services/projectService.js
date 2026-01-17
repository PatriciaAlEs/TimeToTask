/**
 * Servicios de proyectos
 * CRUD de proyectos
 */

import api from './apiClient';

export const projectService = {
    // Obtener todos los proyectos
    getAll: async () => {
        const response = await api.get('/projects');
        return response.data;
    },

    // Obtener proyecto por ID
    getById: async (projectId) => {
        const response = await api.get(`/projects/${projectId}`);
        return response.data;
    },

    // Crear proyecto
    create: async (projectData) => {
        const response = await api.post('/projects', projectData);
        return response.data;
    },

    // Actualizar proyecto
    update: async (projectId, projectData) => {
        const response = await api.put(`/projects/${projectId}`, projectData);
        return response.data;
    },

    // Eliminar proyecto
    delete: async (projectId) => {
        const response = await api.delete(`/projects/${projectId}`);
        return response.data;
    },

    // Agregar miembro al proyecto
    addMember: async (projectId, userId) => {
        const response = await api.post(`/projects/${projectId}/members`, { userId });
        return response.data;
    },

    // Remover miembro del proyecto
    removeMember: async (projectId, userId) => {
        const response = await api.delete(`/projects/${projectId}/members/${userId}`);
        return response.data;
    },
};
