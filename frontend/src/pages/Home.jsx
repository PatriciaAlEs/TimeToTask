import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTheme } from '@/theme/ThemeContext';
import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';

const Home = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const isLoginModalOpen = location.pathname === '/login';
    const isRegisterModalOpen = location.pathname === '/register';

    return (
        <div className={`min-h-screen overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700' : 'light-theme-page'}`}>
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center px-4">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-4"></div>
                    <div className="absolute w-96 h-96 bg-[#F4E285] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 -right-4"></div>
                    <div className="absolute w-96 h-96 bg-[#F4A259] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-20"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    {/* Logo/Brand */}
                    <div className="mb-8 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-primary-400 to-secondary-400 backdrop-blur-lg rounded-3xl mb-6 transform hover:scale-125 hover:rotate-6 transition-all duration-300 shadow-2xl">
                            <i className="fas fa-tasks text-6xl text-white drop-shadow-lg"></i>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-semibold text-white mb-4 animate-slide-up drop-shadow-lg">
                            {t('appName')}
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent-300 to-secondary-300 bg-clip-text text-transparent animate-slide-up animation-delay-200">
                            {t('smartTaskManager')}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-100 mb-4 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-400 font-semibold">
                        {t('taskDescription')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up animation-delay-600">
                        <Link
                            to="/register"
                            className={`group relative px-10 py-5 text-white rounded-xl font-bold text-lg shadow-2xl transform hover:scale-110 transition-all duration-300 w-full sm:w-auto overflow-hidden ${theme === 'light'
                                ? 'bg-gradient-to-br from-[#5B8E7D] to-[#8CB369] hover:shadow-[#5B8E7D]/40'
                                : 'bg-gradient-to-br from-primary-400 to-secondary-400 hover:shadow-primary-300/40'
                                }`}
                        >
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity ${theme === 'light'
                                ? 'bg-gradient-to-r from-[#8CB369] to-[#B6D1C7]'
                                : 'bg-gradient-to-r from-accent-300 to-secondary-300'
                                }`}></div>
                            <span className="relative flex items-center justify-center gap-2">
                                <i className="fas fa-rocket text-xl"></i>
                                <span>{t('beginFree')}</span>
                                <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
                            </span>
                        </Link>
                        <Link
                            to="/login"
                            className={`group relative px-10 py-5 text-white rounded-xl font-bold text-lg border-2 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto ${theme === 'light'
                                ? 'bg-gradient-to-br from-[#F4A259] via-[#E38A3B] to-[#C86F27] border-[#B85F1F] shadow-[0_12px_28px_rgba(244,162,89,0.38)] hover:shadow-[0_14px_34px_rgba(232,138,59,0.46)] hover:border-[#A6541A]'
                                : 'bg-white/15 backdrop-blur-lg border-white/40 hover:bg-white/25 hover:border-white/60'
                                }`}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <i className="fas fa-sign-in-alt"></i>
                                {t('login')}
                            </span>
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-slide-up animation-delay-800">
                        {/* Feature 1 */}
                        <div className={`group backdrop-blur-lg rounded-2xl p-6 border hover:scale-105 transform transition-all duration-300 ${theme === 'light'
                            ? 'bg-gradient-to-br from-[#EDF8E8] to-[#F7F1DF] border-[#8CB369]/45 hover:shadow-[0_10px_28px_rgba(140,179,105,0.22)]'
                            : 'bg-white/10 border-white/20 hover:bg-white/15'
                            }`}>
                            <div className="text-4xl mb-4 text-accent-300 group-hover:scale-110 transition-transform">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {t('simpleOrganization')}
                            </h3>
                            <p className="text-gray-100">
                                {t('organizationDescription')}
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className={`group backdrop-blur-lg rounded-2xl p-6 border hover:scale-105 transform transition-all duration-300 ${theme === 'light'
                            ? 'bg-gradient-to-br from-[#FFF2E0] to-[#F7F1DF] border-[#F4A259]/45 hover:shadow-[0_10px_28px_rgba(244,162,89,0.24)]'
                            : 'bg-white/10 border-white/20 hover:bg-white/15'
                            }`}>
                            <div className="text-4xl mb-4 text-secondary-300 group-hover:scale-110 transition-transform">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {t('progressTracking')}
                            </h3>
                            <p className="text-gray-100">
                                {t('progressDescription')}
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className={`group backdrop-blur-lg rounded-2xl p-6 border hover:scale-105 transform transition-all duration-300 ${theme === 'light'
                            ? 'bg-gradient-to-br from-[#FDEBDD] to-[#EAF4E2] border-[#BC4B51]/35 hover:shadow-[0_10px_28px_rgba(188,75,81,0.20)]'
                            : 'bg-white/10 border-white/20 hover:bg-white/15'
                            }`}>
                            <div className="text-4xl mb-4 text-primary-300 group-hover:scale-110 transition-transform">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {t('collaboration')}
                            </h3>
                            <p className="text-gray-300">
                                {t('collaborationDescription')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <i className="fas fa-chevron-down text-white text-2xl opacity-50"></i>
                </div>
            </div>

            {/* Additional Benefits Section */}
            <div className={`relative backdrop-blur-sm py-20 px-4 border-t-4 border-accent-300/60 ${theme === 'dark' ? 'bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900' : 'bg-gradient-to-br from-[#E6F3E1] via-[#F3ECD8] to-[#FDEDD8]'}`}>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-semibold text-white text-center mb-4 drop-shadow-lg">
                        {t('whyChoose')}
                    </h2>
                    <p className="text-center text-gray-200 light-theme-muted text-lg mb-16 max-w-2xl mx-auto">
                        {t('discoverWhy')}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className={`flex gap-4 group rounded-2xl p-4 border transition-all ${theme === 'light'
                            ? 'bg-gradient-to-br from-[#EDF8E8] to-[#F4F0E2] border-[#8CB369]/35 hover:shadow-[0_8px_20px_rgba(140,179,105,0.20)]'
                            : ''
                            }`}>
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all shadow-lg">
                                <i className="fas fa-bolt text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-300 transition-colors">{t('fastEfficient')}</h3>
                                <p className="text-gray-100">{t('fastDescription')}</p>
                            </div>
                        </div>

                        <div className={`flex gap-4 group rounded-2xl p-4 border transition-all ${theme === 'light'
                            ? 'bg-gradient-to-br from-[#FFF1DE] to-[#F7F0E1] border-[#F4A259]/35 hover:shadow-[0_8px_20px_rgba(244,162,89,0.22)]'
                            : ''
                            }`}>
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary-300 to-secondary-400 rounded-xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all shadow-lg">
                                <i className="fas fa-mobile-alt text-gray-800 text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary-300 transition-colors">{t('responsive')}</h3>
                                <p className="text-gray-100">{t('responsiveDescription')}</p>
                            </div>
                        </div>

                        <div className={`flex gap-4 group rounded-2xl p-4 border transition-all ${theme === 'light'
                            ? 'bg-gradient-to-br from-[#FCE6E7] to-[#F6EFE4] border-[#BC4B51]/30 hover:shadow-[0_8px_20px_rgba(188,75,81,0.18)]'
                            : ''
                            }`}>
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#BC4B51] to-[#9F3E43] rounded-xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all shadow-lg">
                                <i className="fas fa-shield-alt text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F5D3D6] transition-colors">{t('secureReliable')}</h3>
                                <p className="text-gray-100">{t('secureDescription')}</p>
                            </div>
                        </div>

                        <div className={`flex gap-4 group rounded-2xl p-4 border transition-all ${theme === 'light'
                            ? 'bg-gradient-to-br from-[#EAF4E2] to-[#F7F0E1] border-[#5B8E7D]/35 hover:shadow-[0_8px_20px_rgba(91,142,125,0.20)]'
                            : ''
                            }`}>
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all shadow-lg">
                                <i className="fas fa-sync-alt text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">{t('collaboration')}</h3>
                                <p className="text-gray-100">{t('collaborationDescription')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className={`text-center mt-20 p-8 backdrop-blur rounded-2xl border ${theme === 'light'
                        ? 'bg-gradient-to-br from-[#F1F8EC] to-[#FFF0DD] border-[#8CB369]/45 shadow-[0_12px_32px_rgba(140,179,105,0.20)]'
                        : 'bg-white/5 border-accent-300/35'
                        }`}>
                        <p className="text-3xl font-semibold text-white mb-2 drop-shadow-lg">{t('startNow')}</p>
                        <p className="text-gray-200 light-theme-muted mb-6">{t('startSmartly')}</p>
                        <Link
                            to="/register"
                            className={`inline-flex items-center gap-3 px-12 py-5 text-white rounded-xl font-semibold text-lg shadow-2xl transform hover:scale-110 hover:-rotate-1 transition-all duration-300 ${theme === 'light'
                                ? 'bg-gradient-to-br from-[#5B8E7D] via-[#6FA08E] to-[#8CB369] hover:shadow-[#5B8E7D]/60'
                                : 'bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-400 hover:shadow-primary-300/60'
                                }`}
                        >
                            <i className="fas fa-user-plus text-xl"></i>
                            {t('register')}
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(20px, 20px) scale(1.05); }
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }

                .animation-delay-200 {
                    animation-delay: 0.2s;
                    animation-fill-mode: both;
                }

                .animation-delay-400 {
                    animation-delay: 0.4s;
                    animation-fill-mode: both;
                }

                .animation-delay-600 {
                    animation-delay: 0.6s;
                    animation-fill-mode: both;
                }

                .animation-delay-800 {
                    animation-delay: 0.8s;
                    animation-fill-mode: both;
                }
            `}</style>

            {isLoginModalOpen && (
                <Login
                    isModal
                    onClose={() => navigate('/')}
                />
            )}

            {isRegisterModalOpen && (
                <Register
                    isModal
                    onClose={() => navigate('/')}
                />
            )}
        </div>
    );
};

export default Home;