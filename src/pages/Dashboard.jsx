/**
 * Página: Dashboard
 * Vista general con estadísticas y resumen
 */

import React, { useState } from 'react';
import { PageContainer, Section, DashboardGrid } from '../components/common/Layout';
import { StatsCard } from '../components/common/Cards';
import { useGlobalContext } from '../store';
import { ProjectList } from '../components/Projects/ProjectList';
import { AddTaskModal } from '../components/Modals/AddTaskModal';
import { ProjectModal } from '../components/Modals/ProjectModal';
import { useTasks } from '../hooks/useTasks.jsx';

export default function DashboardPage() {
    const { projects, selectedProject, loading, addProject } = useGlobalContext();
    const { tasks, addTask } = useTasks(selectedProject);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [errorForm, setErrorForm] = useState(null);

    const stats = [
        {
            id: 1,
            title: 'Proyectos',
            value: projects.length,
            icon: 'fa-folder',
            color: 'from-orange-500 to-orange-600',
            textColor: 'text-orange-300'
        },
        {
            id: 2,
            title: 'Tareas Totales',
            value: tasks.length,
            icon: 'fa-tasks',
            color: 'from-yellow-400 to-yellow-500',
            textColor: 'text-yellow-300'
        },
        {
            id: 3,
            title: 'En Progreso',
            value: tasks.filter((t) => t.status === 'inProgress').length,
            icon: 'fa-hourglass-half',
            color: 'from-blue-500 to-blue-600',
            textColor: 'text-blue-300'
        },
        {
            id: 4,
            title: 'Completadas',
            value: tasks.filter((t) => t.status === 'done').length,
            icon: 'fa-check-circle',
            color: 'from-green-500 to-green-600',
            textColor: 'text-green-300'
        },
    ];

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
                    <div className="mb-8">
                        <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">Dashboard</h1>
                        <p className="text-xl text-gray-100 font-semibold">Resumen de tus proyectos y tareas</p>
                    </div>

                    {/* Estadísticas - Layout Vertical */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">Resumen</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.id}
                                    className="group bg-primary-400/30 backdrop-blur-lg rounded-2xl p-6 border border-primary-400/50 hover:bg-primary-400/40 hover:scale-105 transform transition-all duration-300 cursor-pointer"
                                >
                                    {/* Icon Container */}
                                    <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <i className={`fas ${stat.icon} text-2xl text-white drop-shadow-lg`}></i>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                                        {stat.title}
                                    </h3>

                                    {/* Value */}
                                    <p className={`text-5xl font-black ${stat.textColor} drop-shadow-lg`}>
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Proyectos */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Mis Proyectos</h2>
                            <button
                                onClick={() => setShowAddProjectModal(true)}
                                className="px-6 py-3 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all flex items-center gap-2"
                            >
                                <i className="fas fa-plus"></i>
                                Nuevo Proyecto
                            </button>
                        </div>
                        <ProjectList projects={projects} loading={loading} />
                    </div>

                    {/* Modales */}
                    <AddTaskModal
                        isOpen={showAddTaskModal}
                        onClose={() => {
                            setShowAddTaskModal(false);
                            setErrorForm(null);
                        }}
                        onSubmit={async (data) => {
                            try {
                                setIsLoadingForm(true);
                                setErrorForm(null);
                                if (addTask) {
                                    await addTask(data);
                                }
                                setShowAddTaskModal(false);
                            } catch (err) {
                                setErrorForm(err.message);
                                console.error('Error al crear tarea:', err);
                            } finally {
                                setIsLoadingForm(false);
                            }
                        }}
                    />

                    <ProjectModal
                        isOpen={showAddProjectModal}
                        onClose={() => {
                            setShowAddProjectModal(false);
                            setErrorForm(null);
                        }}
                        onSubmit={async (data) => {
                            try {
                                setIsLoadingForm(true);
                                setErrorForm(null);
                                if (addProject) {
                                    await addProject(data);
                                }
                                setShowAddProjectModal(false);
                            } catch (err) {
                                setErrorForm(err.message);
                                console.error('Error al crear proyecto:', err);
                            } finally {
                                setIsLoadingForm(false);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}