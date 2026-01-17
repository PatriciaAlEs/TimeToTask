import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center px-4">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-4"></div>
                    <div className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 -right-4"></div>
                    <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-20"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    {/* Logo/Brand */}
                    <div className="mb-8 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-lg rounded-2xl mb-4 transform hover:scale-110 transition-transform duration-300">
                            <i className="fas fa-tasks text-5xl text-white"></i>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 animate-slide-up">
                            TimeToTask
                        </h1>
                        <p className="text-xl md:text-2xl text-indigo-200 animate-slide-up animation-delay-200">
                            Gestor de Tareas Inteligente
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-400">
                        Organiza, prioriza y completa tus tareas de manera eficiente.
                        TimeToTask te ayuda a gestionar tu tiempo y aumentar tu productividad con una interfaz moderna e intuitiva.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up animation-delay-600">
                        <Link
                            to="/register"
                            className="group relative px-8 py-4 bg-white text-indigo-900 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <i className="fas fa-rocket"></i>
                                Comenzar Gratis
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </Link>
                        <Link
                            to="/login"
                            className="group px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <i className="fas fa-sign-in-alt"></i>
                                Iniciar Sesión
                            </span>
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-slide-up animation-delay-800">
                        {/* Feature 1 */}
                        <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-300">
                            <div className="text-4xl mb-4 text-indigo-300 group-hover:scale-110 transition-transform">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Organización Simple
                            </h3>
                            <p className="text-gray-300">
                                Crea, organiza y prioriza tus tareas de forma intuitiva
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-300">
                            <div className="text-4xl mb-4 text-purple-300 group-hover:scale-110 transition-transform">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Seguimiento de Progreso
                            </h3>
                            <p className="text-gray-300">
                                Visualiza tu productividad y alcanza tus objetivos
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-300">
                            <div className="text-4xl mb-4 text-pink-300 group-hover:scale-110 transition-transform">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Colaboración
                            </h3>
                            <p className="text-gray-300">
                                Trabaja en equipo y comparte proyectos fácilmente
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
            <div className="relative bg-white/5 backdrop-blur-sm py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">
                        ¿Por qué elegir TimeToTask?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex gap-4 group">
                            <div className="flex-shrink-0 w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i className="fas fa-bolt text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Rápido y Eficiente</h3>
                                <p className="text-gray-300">Interfaz optimizada para que seas más productivo en menos tiempo</p>
                            </div>
                        </div>

                        <div className="flex gap-4 group">
                            <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i className="fas fa-mobile-alt text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">100% Responsive</h3>
                                <p className="text-gray-300">Accede desde cualquier dispositivo, en cualquier lugar</p>
                            </div>
                        </div>

                        <div className="flex gap-4 group">
                            <div className="flex-shrink-0 w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i className="fas fa-shield-alt text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Seguro y Confiable</h3>
                                <p className="text-gray-300">Tus datos están protegidos con encriptación de nivel empresarial</p>
                            </div>
                        </div>

                        <div className="flex gap-4 group">
                            <div className="flex-shrink-0 w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i className="fas fa-sync-alt text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Sincronización en Tiempo Real</h3>
                                <p className="text-gray-300">Tus cambios se guardan automáticamente en todos tus dispositivos</p>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center mt-16">
                        <p className="text-2xl text-white mb-6">¿Listo para ser más productivo?</p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300"
                        >
                            <i className="fas fa-user-plus"></i>
                            Registrarse Ahora
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