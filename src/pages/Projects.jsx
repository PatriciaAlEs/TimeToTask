/**
 * Ejemplo: Página de proyectos completa
 * Muestra cómo usar todos los componentes juntos
 */

import React, { useState } from 'react';
import { PageContainer, Section, DashboardGrid, Row } from '../components/common/Layout';
import { ProjectList } from '../components/Projects/ProjectList';
import { ButtonPrimary } from '../components/common/Buttons';
import { useProjects } from '../hooks/useProjects.jsx';
import { Card, CardBody } from '../components/common/Cards';
import { Input } from '../components/common/Inputs';

export default function ProjectsPage() {
    const {
        projects,
        loading,
        error,
        createProject,
        deleteProject,
        setSelectedProject,
    } = useProjects();

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProject(formData);
            setFormData({ name: '', description: '' });
            setShowForm(false);
        } catch (err) {
            console.error('Error creando proyecto:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
            <div className="relative min-h-screen px-4 py-8">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-4"></div>
                    <div className="absolute w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 -right-4"></div>
                    <div className="absolute w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-20"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">Proyectos</h1>
                            <p className="text-xl text-gray-100 font-semibold">Gestiona todos tus proyectos</p>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-6 py-3 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl font-bold shadow-2xl hover:shadow-orange-500/50 transform hover:scale-110 transition-all duration-300"
                        >
                            {showForm ? 'Cancelar' : '+ Nuevo Proyecto'}
                        </button>
                    </div>

                    {/* Formulario nuevo proyecto */}
                    {showForm && (
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Crear Nuevo Proyecto</h2>
                            <div className="bg-primary-400/30 backdrop-blur-lg rounded-2xl p-6 border border-primary-400/50">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-white font-bold mb-2">
                                            Nombre del Proyecto
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Mi Proyecto"
                                            required
                                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-white font-bold mb-2">
                                            Descripción
                                        </label>
                                        <input
                                            id="description"
                                            name="description"
                                            type="text"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Descripción breve"
                                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-6 py-3 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Creando...' : 'Crear Proyecto'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500/20 backdrop-blur-lg border border-red-400 text-white p-4 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    {/* Lista de proyectos */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Tus Proyectos</h2>
                        <ProjectList
                            projects={projects}
                            loading={loading}
                            onSelectProject={setSelectedProject}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
