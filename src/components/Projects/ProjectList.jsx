/**
 * Componente: Lista de proyectos
 * Muestra todos los proyectos disponibles
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, SimpleCard } from '../common/Cards';
import { ButtonPrimary } from '../common/Buttons';
import { Row } from '../common/Layout';

export function ProjectList({ projects, loading, onSelectProject }) {
    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-400"></div>
                <p className="text-white text-lg mt-4 font-semibold">Cargando proyectos...</p>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="bg-primary-400/30 backdrop-blur-lg rounded-2xl p-12 border border-primary-400/50 text-center">
                <div className="text-6xl mb-4">📁</div>
                <p className="text-white text-xl font-bold mb-4">No hay proyectos aún</p>
                <Link
                    to="/projects/new"
                    className="inline-block px-6 py-3 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
                >
                    Crear Proyecto
                </Link>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="group bg-primary-400/30 backdrop-blur-lg rounded-2xl p-6 border border-primary-400/50 hover:bg-primary-400/40 hover:scale-105 transform transition-all duration-300"
                >
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                            {project.name}
                        </h3>
                        <p className="text-gray-100 text-sm">{project.description}</p>
                    </div>

                    <div className="mb-4 text-sm text-gray-200">
                        <i className="fas fa-user mr-2"></i>
                        Líder: {project.owner?.name}
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            to={`/projects/${project.id}`}
                            className="text-orange-300 hover:text-orange-200 font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
                        >
                            Ver detalles
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                        <span className="px-3 py-1 bg-white/20 text-white rounded-lg text-sm font-bold">
                            {project.taskCount || 0} tareas
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
