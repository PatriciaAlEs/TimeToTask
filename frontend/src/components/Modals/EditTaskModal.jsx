/**
 * Componente: Modal para editar tareas
 */

import React, { useState, useEffect } from 'react';
import { TASK_TYPES, TASK_TYPE_SOFT_THEME } from '../../config/taskTypes';

export function EditTaskModal({ isOpen, onClose, onSubmit, task, selectedTaskType, errorMessage }) {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task?.id) return;
        onSubmit(task.id, { ...formData });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="backdrop-blur-lg rounded-2xl border-2 w-full max-w-md p-8 animate-fade-in" style={modalStyle}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold drop-shadow-lg" style={headerTitleStyle}>Editar Tarea</h2>
                    <button onClick={onClose} className="text-white/70 hover:text-white text-2xl transition-colors">✕</button>
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
                        <label className="block text-sm font-bold text-white mb-2">Título *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 rounded-xl text-white placeholder-gray-200 focus:outline-none transition-all"
                            style={inputStyle}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-white mb-2">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 border-2 rounded-xl text-white placeholder-gray-200 focus:outline-none transition-all resize-none"
                            style={inputStyle}
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-bold text-white mb-2">Tipo de Tarea</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-xl text-white focus:outline-none transition-all"
                            style={inputStyle}
                        >
                            {Object.values(TASK_TYPES).map((type) => (
                                <option key={type.id} value={type.id} className="bg-gray-800">
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-bold text-white mb-2">Prioridad</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 rounded-xl text-white focus:outline-none transition-all"
                                style={inputStyle}
                            >
                                <option value="low" className="bg-gray-800">Baja</option>
                                <option value="medium" className="bg-gray-800">Media</option>
                                <option value="high" className="bg-gray-800">Alta</option>
                            </select>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block text-sm font-bold text-white mb-2">Fecha límite</label>
                            <input
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
                        <label className="block text-sm font-bold text-white mb-2">Estado</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-xl text-white focus:outline-none transition-all"
                            style={inputStyle}
                        >
                            <option value="backlog" className="bg-gray-800">Backlog</option>
                            <option value="selected" className="bg-gray-800">Seleccionado</option>
                            <option value="inProgress" className="bg-gray-800">En Progreso</option>
                            <option value="inReview" className="bg-gray-800">En Revisión</option>
                            <option value="done" className="bg-gray-800">Completado</option>
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
                            <i className="fas fa-save mr-2"></i>
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
