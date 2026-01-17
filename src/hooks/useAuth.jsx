/**
 * Hook para manejar autenticación
 * Lógica centralizada de auth
 */

import { useEffect } from 'react';
import { useGlobalContext } from '../store';
import { authService } from '../services/authService';

export function useAuth() {
    const { currentUser, isAuthenticated, setUser, setLoading, setError, logout: logoutContext } =
        useGlobalContext();

    // Inicializar usuario desde localStorage
    const initializeAuth = () => {
        const user = authService.getCurrentUser();
        if (user) {
            setUser(user);
        }
    };

    // Login
    const login = async (email, password) => {
        setLoading(true);
        try {
            const { user } = await authService.login(email, password);
            setUser(user);
            return user;
        } catch (err) {
            setError(err.response?.data?.message || 'Error en login');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Register
    const register = async (userData) => {
        setLoading(true);
        try {
            const result = await authService.register(userData);
            // Opcionalmente auto-login después de register
            // setUser(result.user);
            return result;
        } catch (err) {
            setError(err.response?.data?.message || 'Error en registro');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logout = () => {
        authService.logout();
        logoutContext();
    };

    // Cargar usuario al montar
    useEffect(() => {
        initializeAuth();
    }, []);

    return {
        currentUser,
        isAuthenticated,
        login,
        register,
        logout,
    };
}
