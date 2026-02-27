/**
 * Componente: Modal para agregar tareas
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TASK_TYPES, TASK_TYPE_SOFT_THEME, getTaskTypeList } from '../../config/taskTypes';

const createInitialFormData = (taskType = 'feature') => ({
    title: '',
    description: '',
    type: taskType,
    priority: 'medium',
    dueDate: '',
    status: 'backlog',
});

export function AddTaskModal({ isOpen, onClose, onSubmit, projectId, selectedTaskType }) {
    const [formData, setFormData] = useState(createInitialFormData(selectedTaskType || 'feature'));

    useEffect(() => {
        if (!isOpen) return;
        setFormData(createInitialFormData(selectedTaskType || 'feature'));
    }, [isOpen, selectedTaskType]);

    // Obtener el config del tipo seleccionado
    const activeTaskType = formData.type || selectedTaskType || 'feature';
    const selectedTypeConfig = TASK_TYPES[activeTaskType] || TASK_TYPES.feature;
    const selectedSoftTheme = TASK_TYPE_SOFT_THEME[activeTaskType] || TASK_TYPE_SOFT_THEME.default;

    const modalStyle = {
        background: `linear-gradient(155deg, ${selectedSoftTheme.surface}, rgba(15, 23, 42, 0.88))`,
        borderColor: selectedSoftTheme.surfaceBorder,
        boxShadow: '0 20px 45px rgba(15, 23, 42, 0.45)',
    };

    const inputStyle = {
        backgroundColor: selectedSoftTheme.cardSurface,
        borderColor: selectedSoftTheme.cardBorder,
        color: '#FFFFFF',
        colorScheme: 'dark',
    };

    const secondaryButtonStyle = {
        backgroundColor: selectedSoftTheme.surface,
        borderColor: selectedSoftTheme.surfaceBorder,
    };

    const headerTitleStyle = {
        color: selectedSoftTheme.headerFrom,
    };

    const primaryButtonStyle = {
        borderColor: selectedSoftTheme.cardBorder,
        backgroundImage: `linear-gradient(135deg, ${selectedSoftTheme.headerFrom}, ${selectedSoftTheme.headerTo})`,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, projectId });
        setFormData(createInitialFormData(selectedTaskType || 'feature'));
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="task-modal-dark backdrop-blur-lg rounded-2xl border-2 w-full max-w-md p-8"
                        style={{ ...modalStyle, color: '#FFFFFF' }}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <i className={`fas ${selectedTypeConfig.icon} text-white text-2xl`}></i>
                                <h2 className="text-2xl font-semibold drop-shadow-lg" style={headerTitleStyle}>Nueva Tarea</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white/70 hover:text-white text-2xl transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Title */}
                            <div>
                                <label htmlFor="add-task-title" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>
                                    <i className="fas fa-heading mr-2 text-white"></i>
                                    Título *
                                </label>
                                <input
                                    id="add-task-title"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Ej: Implementar login"
                                    required
                                    className="w-full px-4 py-3 border-2 rounded-xl text-white placeholder-gray-200 focus:outline-none transition-all"
                                    style={inputStyle}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="add-task-description" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>
                                    <i className="fas fa-align-left mr-2 text-white"></i>
                                    Descripción
                                </label>
                                <textarea
                                    id="add-task-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Detalles de la tarea..."
                                    rows="3"
                                    className="w-full px-4 py-3 border-2 rounded-xl text-white placeholder-gray-200 focus:outline-none transition-all resize-none"
                                    style={inputStyle}
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <label htmlFor="add-task-type" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>
                                    <i className="fas fa-tag mr-2 text-white"></i>
                                    Tipo de Tarea
                                </label>
                                <select
                                    id="add-task-type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 rounded-xl text-white focus:outline-none transition-all"
                                    style={inputStyle}
                                >
                                    {getTaskTypeList().map((type) => (
                                        <option key={type.id} value={type.id} className="bg-gray-800 text-white">
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Priority */}
                                <div>
                                    <label htmlFor="add-task-priority" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>
                                        <i className="fas fa-exclamation-circle mr-2 text-white"></i>
                                        Prioridad
                                    </label>
                                    <select
                                        id="add-task-priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 rounded-xl text-white focus:outline-none transition-all"
                                        style={inputStyle}
                                    >
                                        <option value="low" className="bg-gray-800 text-white">Baja</option>
                                        <option value="medium" className="bg-gray-800 text-white">Media</option>
                                        <option value="high" className="bg-gray-800 text-white">Alta</option>
                                    </select>
                                </div>

                                {/* Due Date */}
                                <div>
                                    <label htmlFor="add-task-due-date" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>
                                        <i className="fas fa-calendar mr-2 text-white"></i>
                                        Fecha límite
                                    </label>
                                    <input
                                        id="add-task-due-date"
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 rounded-xl text-white focus:outline-none transition-all"
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="add-task-status" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>
                                    <i className="fas fa-tag mr-2 text-white"></i>
                                    Estado
                                </label>
                                <select
                                    id="add-task-status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 rounded-xl text-white focus:outline-none transition-all"
                                    style={inputStyle}
                                >
                                    <option value="backlog" className="bg-gray-800 text-white">Backlog</option>
                                    <option value="selected" className="bg-gray-800 text-white">Seleccionado</option>
                                    <option value="inProgress" className="bg-gray-800 text-white">En Progreso</option>
                                    <option value="inReview" className="bg-gray-800 text-white">En Revisión</option>
                                    <option value="done" className="bg-gray-800 text-white">Completado</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 border-2 text-white rounded-xl font-bold transition-all hover:bg-gray-900/60"
                                    style={secondaryButtonStyle}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-4 text-white rounded-xl font-bold transition-all shadow-lg transform hover:scale-105 border-2"
                                    style={primaryButtonStyle}
                                >
                                    <i className="fas fa-plus mr-2"></i>
                                    Agregar
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
