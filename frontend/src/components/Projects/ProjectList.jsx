/**
 * Componente: Lista de proyectos
 * Muestra todos los proyectos disponibles
 */

import React from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { resolveProjectColorVisual } from '../../config/projectColors';

export function ProjectList({ projects, loading, onSelectProject, onEditProject, onDeleteProject }) {
    const [projectToDelete, setProjectToDelete] = useState(null);
    const { t } = useLanguage();

    const handleDeleteConfirm = async () => {
        if (!projectToDelete || !onDeleteProject) {
            setProjectToDelete(null);
            return;
        }

        try {
            await onDeleteProject(projectToDelete.id);
        } catch (error) {
            console.error('Error eliminando proyecto:', error);
        } finally {
            setProjectToDelete(null);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#8CB369]"></div>
                <p className="text-white text-lg mt-4 font-semibold">{t('loadingProjects')}</p>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="bg-primary-400/30 backdrop-blur-lg rounded-2xl p-12 border border-primary-400/50 text-center">
                <div className="text-6xl mb-4">📁</div>
                <p className="text-white text-xl font-bold mb-4">{t('noProjectsYet')}</p>
                <Link
                    to="/projects/new"
                    className="inline-block px-6 py-3 text-white rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
                    style={{ backgroundImage: 'linear-gradient(135deg, rgba(140, 179, 105, 0.9), rgba(91, 142, 125, 0.9))' }}
                >
                    {t('createProject')}
                </Link>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
                const projectColor = resolveProjectColorVisual(project.color);

                return (
                    <div
                        key={project.id}
                        className="group backdrop-blur-lg rounded-2xl p-6 border hover:scale-105 transform transition-all duration-300 overflow-hidden"
                        style={{
                            backgroundColor: projectColor.surface,
                            borderColor: projectColor.border,
                        }}
                    >
                        <div
                            className="-mx-6 -mt-6 mb-4 h-2"
                            style={{ backgroundImage: `linear-gradient(90deg, ${projectColor.start}, ${projectColor.end})` }}
                        ></div>
                        <div className="mb-4">
                            <div className="mb-2 flex items-start justify-between gap-2">
                                <h3 className="text-2xl font-display-title font-bold text-white transition-colors flex items-center gap-2">
                                    <span
                                        className="inline-flex h-8 w-8 rounded-lg border border-white/60 items-center justify-center shadow-md"
                                        style={{ backgroundImage: `linear-gradient(90deg, ${projectColor.start}, ${projectColor.end})` }}
                                    >
                                        <i className="fas fa-folder text-white text-xs"></i>
                                    </span>
                                    <span className="drop-shadow-md tracking-wide">{project.name}</span>
                                </h3>

                                {(onEditProject || onDeleteProject) && (
                                    <div className="flex items-center gap-1">
                                        {onEditProject && (
                                            <button
                                                onClick={() => onEditProject(project)}
                                                className="h-8 w-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                                                title={t('editProject')}
                                                aria-label={t('editProject')}
                                            >
                                                <i className="fas fa-pen text-xs"></i>
                                            </button>
                                        )}
                                        {onDeleteProject && (
                                            <button
                                                onClick={() => setProjectToDelete(project)}
                                                className="h-8 w-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                                                title={t('deleteProject')}
                                                aria-label={t('deleteProject')}
                                            >
                                                <i className="fas fa-trash text-xs"></i>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-100 text-sm">{project.description}</p>
                        </div>

                        <div className="mb-4 text-sm text-gray-200">
                            <i className="fas fa-user mr-2"></i>
                            {t('projectLead')}: {project.owner?.name}
                        </div>

                        <div className="flex items-center justify-between">
                            <Link
                                to={`/board?projectId=${project.id}`}
                                className="font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
                                style={{ color: projectColor.text }}
                            >
                                {t('viewDetails')}
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                            <span className="px-3 py-1 bg-white/20 text-white rounded-lg text-sm font-bold">
                                {project.taskCount || 0} {t('tasksCount')}
                            </span>
                        </div>
                    </div>
                );
            })}

            <AnimatePresence>
                {projectToDelete && (
                    <motion.div
                        className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="w-full max-w-md rounded-2xl border border-red-300/40 bg-primary-900/95 p-6 shadow-2xl"
                            initial={{ opacity: 0, y: 16, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <i className="fas fa-exclamation-triangle text-red-300"></i>
                                </div>
                                <h3 className="text-xl font-bold text-white">{t('deleteProjectQuestion')}</h3>
                            </div>

                            <p className="text-sm text-gray-100 mb-1">
                                {t('deleteProjectConfirm')}
                            </p>
                            <p className="text-sm text-red-200 mb-6">
                                {t('deleteProjectWarning')}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setProjectToDelete(null)}
                                    className="flex-1 rounded-lg bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/20 transition-all"
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="flex-1 rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 transition-all"
                                >
                                    {t('continue')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
