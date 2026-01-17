/**
 * Layout principal de la aplicación
 * Estructura base con navegación
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Row, FlexBetween } from '../common/Layout';
import { ButtonSecondary } from '../common/Buttons';

export function MainLayout({ children }) {
    const { currentUser, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'text-primary-600 font-bold' : 'text-gray-600';

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="container py-4">
                    <FlexBetween>
                        <div className="flex items-center gap-8">
                            <Link to="/" className="text-2xl font-bold text-primary-600">
                                📋 Jira Light
                            </Link>

                            <nav className="hidden md:flex gap-6">
                                <Link to="/" className={`hover:text-primary-600 ${isActive('/')}`}>
                                    Inicio
                                </Link>
                                <Link to="/dashboard" className={`hover:text-primary-600 ${isActive('/dashboard')}`}>
                                    Dashboard
                                </Link>
                                <Link to="/projects" className={`hover:text-primary-600 ${isActive('/projects')}`}>
                                    Proyectos
                                </Link>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            {currentUser ? (
                                <>
                                    <span className="text-sm text-gray-700">
                                        👤 {currentUser.name}
                                    </span>
                                    <ButtonSecondary size="sm" onClick={logout}>
                                        Logout
                                    </ButtonSecondary>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm text-primary-600 hover:text-primary-700">
                                        Login
                                    </Link>
                                    <Link to="/register" className="text-sm text-primary-600 hover:text-primary-700">
                                        Registro
                                    </Link>
                                </>
                            )}
                        </div>
                    </FlexBetween>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="container py-6 text-center text-sm text-gray-600">
                    <p>© 2026 Jira Light - Gestor de tareas</p>
                </div>
            </footer>
        </div>
    );
}
