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
            <footer className="bg-gradient-to-r from-primary-800 via-primary-900 to-primary-800 border-t-4 border-orange-500 mt-12">
                <div className="container py-8">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div className="text-white">
                            <h3 className="font-bold text-lg mb-3 text-orange-300">TimeToTask</h3>
                            <p className="text-gray-200 text-sm">Gestor de tareas inteligente para optimizar tu productividad</p>
                        </div>
                        <div className="text-white">
                            <h4 className="font-bold mb-3 text-orange-300">Enlaces</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/" className="text-gray-200 hover:text-orange-300 transition-colors">Inicio</Link></li>
                                <li><Link to="/dashboard" className="text-gray-200 hover:text-orange-300 transition-colors">Dashboard</Link></li>
                                <li><Link to="/projects" className="text-gray-200 hover:text-orange-300 transition-colors">Proyectos</Link></li>
                            </ul>
                        </div>
                        <div className="text-white">
                            <h4 className="font-bold mb-3 text-orange-300">Contacto</h4>
                            <p className="text-gray-200 text-sm">info@timetotask.com</p>
                            <p className="text-gray-200 text-sm">+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="border-t border-primary-700 pt-6 text-center">
                        <p className="text-gray-300 text-sm">© 2026 TimeToTask - Todos los derechos reservados</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
