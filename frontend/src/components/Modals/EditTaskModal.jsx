/**
 * Componente: Modal para editar tareas
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TASK_TYPES, TASK_TYPE_SOFT_THEME } from '../../config/taskTypes';
import { useModalDismiss } from '../../hooks/useModalDismiss.jsx';

export function EditTaskModal({
    isOpen,
    onClose,
    onSubmit,
    task,
    selectedTaskType,
    errorMessage,
    isSubmitting = false,
    closeOnEsc = true,
    closeOnBackdrop = true,
}) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: selectedTaskType || 'feature',
        priority: 'medium',
        dueDate: '',
        status: 'backlog',
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                type: task.type || selectedTaskType || 'feature',
                priority: task.priority || 'medium',
                dueDate: task.dueDate ? task.dueDate.substring(0, 10) : '',
                status: task.status || 'backlog',
            });
        }
    }, [task, selectedTaskType]);

    const selectedSoftTheme = TASK_TYPE_SOFT_THEME[formData.type] || TASK_TYPE_SOFT_THEME.default;

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

    const primaryButtonStyle = {
        borderColor: selectedSoftTheme.cardBorder,
        backgroundImage: `linear-gradient(135deg, ${selectedSoftTheme.headerFrom}, ${selectedSoftTheme.headerTo})`,
    };

    const headerTitleStyle = {
        color: selectedSoftTheme.headerFrom,
    };

    const { handleBackdropMouseDown } = useModalDismiss({
        isOpen,
        onClose,
        closeOnEsc: closeOnEsc && !isSubmitting,
        closeOnBackdrop: closeOnBackdrop && !isSubmitting,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task?.id) return;
        onSubmit(task.id, { ...formData });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onMouseDown={handleBackdropMouseDown}
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
                            <h2 className="text-2xl font-semibold drop-shadow-lg" style={headerTitleStyle}>Editar Tarea</h2>
                            <button onClick={onClose} disabled={isSubmitting} className="text-white/70 hover:text-white text-2xl transition-colors">✕</button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {errorMessage && (
                                <div className="rounded-xl border border-red-400/60 bg-red-500/20 px-4 py-3 text-sm text-red-100">
                                    {errorMessage}
                                </div>
                            )}
                            {/* Title */}
                            <div>
                                <label htmlFor="edit-task-title" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>Título *</label>
                                <input
                                    id="edit-task-title"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 border-2 rounded-xl text-white placeholder-gray-200 focus:outline-none transition-all"
                                    style={inputStyle}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="edit-task-description" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>Descripción</label>
                                <textarea
                                    id="edit-task-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 border-2 rounded-xl text-white placeholder-gray-200 focus:outline-none transition-all resize-none"
                                    style={inputStyle}
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <label htmlFor="edit-task-type" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>Tipo de Tarea</label>
                                <select
                                    id="edit-task-type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 border-2 rounded-xl text-white focus:outline-none transition-all"
                                    style={inputStyle}
                                >
                                    {Object.values(TASK_TYPES).map((type) => (
                                        <option key={type.id} value={type.id} className="bg-gray-800 text-white">
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Priority */}
                                <div>
                                    <label htmlFor="edit-task-priority" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>Prioridad</label>
                                    <select
                                        id="edit-task-priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
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
                                    <label htmlFor="edit-task-due-date" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>Fecha límite</label>
                                    <input
                                        id="edit-task-due-date"
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border-2 rounded-xl text-white focus:outline-none transition-all"
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="edit-task-status" className="block text-sm font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>Estado</label>
                                <select
                                    id="edit-task-status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                    className="flex-1 py-3 px-4 border-2 text-white rounded-xl font-bold transition-all hover:bg-gray-900/60"
                                    style={secondaryButtonStyle}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-3 px-4 text-white rounded-xl font-bold transition-all shadow-lg transform hover:scale-105 border-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={primaryButtonStyle}
                                >
                                    <i className="fas fa-save mr-2"></i>
                                    {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
