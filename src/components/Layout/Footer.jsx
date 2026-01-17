import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center">
                                <i className="fas fa-tasks text-white"></i>
                            </div>
                            <span className="text-xl font-bold">TimeToTask</span>
                        </div>
                        <p className="text-indigo-200 text-sm">
                            Gestiona tu tiempo de forma inteligente y alcanza tus objetivos.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Producto</h3>
                        <ul className="space-y-2 text-indigo-200">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    <i className="fas fa-home mr-2"></i>Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-white transition-colors">
                                    <i className="fas fa-th-large mr-2"></i>Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Soporte</h3>
                        <ul className="space-y-2 text-indigo-200">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    <i className="fas fa-question-circle mr-2"></i>Centro de Ayuda
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    <i className="fas fa-envelope mr-2"></i>Contacto
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Síguenos</h3>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-indigo-200 text-sm">
                        &copy; {currentYear} TimeToTask. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6 text-sm text-indigo-200">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;