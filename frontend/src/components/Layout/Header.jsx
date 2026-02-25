import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalContext } from '@/store';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTheme } from '@/theme/ThemeContext';
import api from '@/services/api';

const Header = () => {
    const location = useLocation();
    const { user, isAuthenticated, logout } = useGlobalContext();
    const { language, switchLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const isLightTheme = theme === 'light';

    const isHomePage = location.pathname === '/';

    const handleLogout = async () => {
        await api.auth.logout();
        logout();
        window.location.href = '/';
    };

    return (
        <header className={`${isLightTheme
            ? 'bg-[#d8ebd9]/95 border-b-2 border-[#5b8e7d]/55 shadow-md backdrop-blur'
            : (isHomePage ? 'bg-transparent absolute top-0 left-0 right-0 z-50' : 'bg-gradient-to-r from-primary-800 via-primary-900 to-primary-800 border-b-2 border-accent-300/45 shadow-lg')
            } transition-all duration-300 light-theme-header`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 group">
                        <div className={`w-11 h-11 ${isLightTheme ? 'bg-gradient-to-br from-[#7b6740] to-[#a58a53] border-[#6e5b38]/60' : (isHomePage ? 'bg-white/20 backdrop-blur-lg border-white/35' : 'bg-gradient-to-br from-primary-400 to-secondary-400 border-white/35')} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform border shadow-lg`}>
                            <i className="fas fa-tasks text-white text-lg"></i>
                        </div>
                        <span className={`font-display-title text-2xl tracking-wide font-bold drop-shadow-md ${isLightTheme ? 'text-[#1f2937]' : 'bg-gradient-to-r from-white via-[#F4E285] to-[#F4A259] bg-clip-text text-transparent'}`}>
                            {t('appName')}
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav>
                        <ul className="flex items-center space-x-6">
                            <li>
                                <button
                                    onClick={toggleTheme}
                                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${isLightTheme ? 'text-[#1f2937] bg-[#efe4ca] border border-[#c8ae77]/60 hover:bg-[#e6d7b3]' : (isHomePage ? 'text-white hover:bg-white/20' : 'text-gray-200 hover:bg-white/10')}`}
                                    title={theme === 'dark' ? t('lightMode') : t('darkMode')}
                                    aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
                                >
                                    <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} mr-1`}></i>
                                    {theme === 'dark' ? t('lightMode') : t('darkMode')}
                                </button>
                            </li>

                            {/* Language Switcher */}
                            <li className="flex gap-2">
                                <button
                                    onClick={() => switchLanguage('es')}
                                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${language === 'es'
                                        ? (isLightTheme ? 'bg-[#d5bf91] text-[#1f2937] border border-[#b49762]/60' : 'bg-primary-400 text-white')
                                        : (isLightTheme ? 'text-[#1f2937] border border-[#c8ae77]/55 hover:bg-[#e6d7b3]' : (isHomePage ? 'text-white hover:bg-white/20' : 'text-gray-200 hover:bg-white/10'))
                                        }`}
                                >
                                    ES
                                </button>
                                <button
                                    onClick={() => switchLanguage('en')}
                                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${language === 'en'
                                        ? (isLightTheme ? 'bg-[#d5bf91] text-[#1f2937] border border-[#b49762]/60' : 'bg-primary-400 text-white')
                                        : (isLightTheme ? 'text-[#1f2937] border border-[#c8ae77]/55 hover:bg-[#e6d7b3]' : (isHomePage ? 'text-white hover:bg-white/20' : 'text-gray-200 hover:bg-white/10'))
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
                                            className={`${isLightTheme ? 'text-[#1f2937] hover:text-[#5b4a2a]' : (isHomePage ? 'text-white hover:text-accent-300' : 'text-gray-200 hover:text-accent-300')} font-semibold transition-colors`}
                                        >
                                            <i className="fas fa-sign-in-alt mr-1"></i>
                                            {t('login')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/register"
                                            className={`px-5 py-2 ${isLightTheme ? 'bg-[#7b6740] text-white hover:bg-[#685532]' : (isHomePage ? 'bg-primary-400 text-white hover:bg-primary-500' : 'bg-primary-400 text-white hover:bg-primary-500')} rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg`}
                                        >
                                            <i className="fas fa-user-plus mr-1"></i>
                                            {t('register')}
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="flex items-center gap-2">
                                        <span className={`text-sm font-semibold ${isLightTheme ? 'text-[#1f2937]' : 'text-gray-200'}`}>
                                            <i className="fas fa-user-circle mr-1"></i>
                                            {user?.username || t('profile')}
                                        </span>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="h-10 w-10 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                                            title={t('logout')}
                                            aria-label={t('logout')}
                                        >
                                            <i className="fas fa-sign-out-alt"></i>
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