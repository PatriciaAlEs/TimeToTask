import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-primary-800 via-primary-900 to-primary-800 border-t-4 border-orange-500 text-gray-200 py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-400 backdrop-blur-lg rounded-lg flex items-center justify-center">
                                <i className="fas fa-tasks text-xl text-white"></i>
                            </div>
                            <span className="text-2xl font-black text-white">TimeToTask</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                            Gestiona tu tiempo de forma inteligente y alcanza tus objetivos.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors">
                                <i className="fab fa-twitter text-white text-sm"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors">
                                <i className="fab fa-facebook text-white text-sm"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors">
                                <i className="fab fa-instagram text-white text-sm"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors">
                                <i className="fab fa-linkedin text-white text-sm"></i>
                            </a>
                        </div>
                    </div>

                    {/* Producto */}
                    <div>
                        <h3 className="font-bold mb-4 text-lg text-orange-300">Producto</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link to="/" className="hover:text-orange-300 transition-colors text-sm">
                                    Características
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-orange-300 transition-colors text-sm">
                                    Precios
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-orange-300 transition-colors text-sm">
                                    Seguridad
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-orange-300 transition-colors text-sm">
                                    Roadmap
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-orange-300 transition-colors text-sm">
                                    Actualizaciones
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Soporte */}
                    <div>
                        <h3 className="font-bold mb-4 text-lg text-orange-300">Soporte</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Centro de Ayuda
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Documentación
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    API
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Contacto
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Estado del Sistema
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Empresa */}
                    <div>
                        <h3 className="font-bold mb-4 text-lg text-orange-300">Empresa</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Nosotros
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Empleo
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Prensa
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Asociados
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold mb-4 text-lg text-orange-300">Legal</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Privacidad
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Términos de Servicio
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Cookies
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Conformidad
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-300 transition-colors text-sm">
                                    Licencias
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-primary-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        &copy; {currentYear} TimeToTask. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-orange-300 transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-orange-300 transition-colors">Términos</a>
                        <a href="#" className="hover:text-orange-300 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;