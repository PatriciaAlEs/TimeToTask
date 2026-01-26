import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalContext } from '@/store';
import { useLanguage } from '@/i18n/LanguageContext';

const Header = () => {
    const location = useLocation();
    const { user, isAuthenticated, logout } = useGlobalContext();
    const { language, switchLanguage, t } = useLanguage();

    const isHomePage = location.pathname === '/';

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <header className={`${isHomePage ? 'bg-transparent absolute top-0 left-0 right-0 z-50' : 'bg-gradient-to-r from-primary-800 via-primary-900 to-primary-800 border-b-2 border-orange-500/30 shadow-lg'} transition-all duration-300`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className={`w-10 h-10 ${isHomePage ? 'bg-white/20 backdrop-blur-lg' : 'bg-gradient-to-br from-orange-500 to-yellow-400'} rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                            <i className="fas fa-tasks text-white"></i>
                        </div>
                        <span className={`text-xl font-black ${isHomePage ? 'text-white' : 'text-white'}`}>
                            {t('appName')}
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav>
                        <ul className="flex items-center space-x-6">
                            {/* Language Switcher */}
                            <li className="flex gap-2">
                                <button
                                    onClick={() => switchLanguage('es')}
                                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${language === 'es'
                                        ? 'bg-orange-500 text-white'
                                        : isHomePage ? 'text-white hover:bg-white/20' : 'text-gray-200 hover:bg-white/10'
                                        }`}
                                >
                                    ES
                                </button>
                                <button
                                    onClick={() => switchLanguage('en')}
                                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${language === 'en'
                                        ? 'bg-orange-500 text-white'
                                        : isHomePage ? 'text-white hover:bg-white/20' : 'text-gray-200 hover:bg-white/10'
                                        }`}
                                >
                                    EN
                                </button>
                            </li>

                            {!isAuthenticated ? (
                                <>
                                    <li>
                                        <Link
                                            to="/login"
                                            className={`${isHomePage ? 'text-white hover:text-orange-300' : 'text-gray-200 hover:text-orange-300'} font-semibold transition-colors`}
                                        >
                                            <i className="fas fa-sign-in-alt mr-1"></i>
                                            {t('login')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/register"
                                            className={`px-5 py-2 ${isHomePage ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-orange-500 text-white hover:bg-orange-600'} rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg`}
                                        >
                                            <i className="fas fa-user-plus mr-1"></i>
                                            {t('register')}
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            to="/dashboard"
                                            className="text-gray-200 hover:text-orange-300 font-semibold transition-colors"
                                        >
                                            <i className="fas fa-th-large mr-1"></i>
                                            {t('dashboard')}
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-gray-200 text-sm font-semibold">
                                            <i className="fas fa-user-circle mr-1"></i>
                                            {user?.username || t('profile')}
                                        </span>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg"
                                        >
                                            <i className="fas fa-sign-out-alt mr-1"></i>
                                            {t('logout')}
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