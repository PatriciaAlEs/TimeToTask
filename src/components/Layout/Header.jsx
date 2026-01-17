import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalContext } from '@/store';

const Header = () => {
    const location = useLocation();
    const { user, isAuthenticated, logout } = useGlobalContext();

    const isHomePage = location.pathname === '/';

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <header className={`${isHomePage ? 'bg-transparent absolute top-0 left-0 right-0 z-50' : 'bg-white shadow-md'} transition-all duration-300`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className={`w-10 h-10 ${isHomePage ? 'bg-white/20 backdrop-blur-lg' : 'bg-indigo-600'} rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                            <i className={`fas fa-tasks ${isHomePage ? 'text-white' : 'text-white'}`}></i>
                        </div>
                        <span className={`text-xl font-bold ${isHomePage ? 'text-white' : 'text-indigo-900'}`}>
                            TimeToTask
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav>
                        <ul className="flex items-center space-x-6">
                            {!isAuthenticated ? (
                                <>
                                    <li>
                                        <Link
                                            to="/"
                                            className={`${isHomePage ? 'text-white hover:text-indigo-200' : 'text-gray-700 hover:text-indigo-600'} font-medium transition-colors`}
                                        >
                                            Inicio
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/login"
                                            className={`${isHomePage ? 'text-white hover:text-indigo-200' : 'text-gray-700 hover:text-indigo-600'} font-medium transition-colors`}
                                        >
                                            <i className="fas fa-sign-in-alt mr-1"></i>
                                            Iniciar Sesión
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/register"
                                            className={`px-4 py-2 ${isHomePage ? 'bg-white text-indigo-900 hover:bg-indigo-50' : 'bg-indigo-600 text-white hover:bg-indigo-700'} rounded-lg font-medium transition-all transform hover:scale-105`}
                                        >
                                            <i className="fas fa-user-plus mr-1"></i>
                                            Registrarse
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            to="/dashboard"
                                            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                                        >
                                            <i className="fas fa-th-large mr-1"></i>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-gray-600 text-sm">
                                            <i className="fas fa-user-circle mr-1"></i>
                                            {user?.username || 'Usuario'}
                                        </span>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105"
                                        >
                                            <i className="fas fa-sign-out-alt mr-1"></i>
                                            Salir
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;