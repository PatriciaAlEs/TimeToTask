import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

const Home = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 overflow-hidden">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center px-4">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-4"></div>
                    <div className="absolute w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 -right-4"></div>
                    <div className="absolute w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-20"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    {/* Logo/Brand */}
                    <div className="mb-8 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-orange-500 to-yellow-400 backdrop-blur-lg rounded-3xl mb-6 transform hover:scale-125 hover:rotate-6 transition-all duration-300 shadow-2xl">
                            <i className="fas fa-tasks text-6xl text-white drop-shadow-lg"></i>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 animate-slide-up drop-shadow-lg">
                            {t('appName')}
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent animate-slide-up animation-delay-200">
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
                            className="group relative px-10 py-5 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-orange-500/50 transform hover:scale-110 transition-all duration-300 w-full sm:w-auto overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                <i className="fas fa-rocket text-xl"></i>
                                <span>{t('beginFree')}</span>
                                <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
                            </span>
                        </Link>
                        <Link
                            to="/login"
                            className="group relative px-10 py-5 bg-white/15 backdrop-blur-lg text-white rounded-xl font-bold text-lg border-2 border-white/40 hover:bg-white/25 hover:border-white/60 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
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
                        <div className="group bg-primary-400/30 backdrop-blur-lg rounded-2xl p-6 border border-primary-400/50 hover:bg-primary-400/40 hover:scale-105 transform transition-all duration-300">
                            <div className="text-4xl mb-4 text-orange-300 group-hover:scale-110 transition-transform">
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
                        <div className="group bg-primary-400/30 backdrop-blur-lg rounded-2xl p-6 border border-primary-400/50 hover:bg-primary-400/40 hover:scale-105 transform transition-all duration-300">
                            <div className="text-4xl mb-4 text-yellow-300 group-hover:scale-110 transition-transform">
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
                        <div className="group bg-primary-400/30 backdrop-blur-lg rounded-2xl p-6 border border-primary-400/50 hover:bg-primary-400/40 hover:scale-105 transform transition-all duration-300">
                            <div className="text-4xl mb-4 text-orange-200 group-hover:scale-110 transition-transform">
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
            <div className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 backdrop-blur-sm py-20 px-4 border-t-4 border-orange-500">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-black text-white text-center mb-4 drop-shadow-lg">
                        {t('whyChoose')}
                    </h2>
                    <p className="text-center text-gray-200 text-lg mb-16 max-w-2xl mx-auto">
                        Descubre por qué miles de usuarios confían en nosotros para gestionar sus proyectos
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex gap-4 group">
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all shadow-lg">
                                <i className="fas fa-bolt text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">{t('fastEfficient')}</h3>
                                <p className="text-gray-100">{t('fastDescription')}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 group">
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all shadow-lg">
                                <i className="fas fa-mobile-alt text-gray-800 text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">{t('responsive')}</h3>
                                <p className="text-gray-100">{t('responsiveDescription')}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 group">
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all shadow-lg">
                                <i className="fas fa-shield-alt text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">{t('secureReliable')}</h3>
                                <p className="text-gray-100">{t('secureDescription')}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 group">
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
                    <div className="text-center mt-20 p-8 bg-white/5 backdrop-blur rounded-2xl border border-orange-500/30">
                        <p className="text-3xl font-black text-white mb-2 drop-shadow-lg">{t('startNow')}</p>
                        <p className="text-gray-200 mb-6">Empieza a organizar tus tareas de forma inteligente</p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-400 text-white rounded-xl font-black text-lg shadow-2xl hover:shadow-orange-500/70 transform hover:scale-110 hover:-rotate-1 transition-all duration-300"
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
        </div>
    );
};

export default Home;