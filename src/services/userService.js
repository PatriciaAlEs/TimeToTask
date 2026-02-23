/**
 * Servicios de usuarios
 * Gestión de usuarios
 */

import api from './apiClient';

export const userService = {
    // Obtener todos los usuarios
    getAll: async () => {
        const response = await api.get('/users');
        return response.data;
    },

    // Obtener usuario por ID
    getById: async (userId) => {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    },

    // Actualizar perfil
    updateProfile: async (userId, userData) => {
        const response = await api.put(`/users/${userId}`, userData);
        return response.data;
    },

    // Obtener usuarios de un proyecto
    getProjectMembers: async (projectId) => {
        const response = await api.get(`/projects/${projectId}/members`);
        return response.data;
    },

    // Cambiar contraseña
    changePassword: async (oldPassword, newPassword) => {
        const response = await api.post('/users/change-password', {
            oldPassword,
            newPassword,
        });
        return response.data;
    },
};
