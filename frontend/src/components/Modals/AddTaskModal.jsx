/**
 * Componente: Modal para agregar tareas
 */

import React, { useEffect, useState } from 'react';
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="backdrop-blur-lg rounded-2xl border-2 w-full max-w-md p-8 animate-fade-in" style={modalStyle}>
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
                        <label className="block text-sm font-bold text-white mb-2">
                            <i className="fas fa-heading mr-2"></i>
                            Título *
                        </label>
                        <input
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
                        <label className="block text-sm font-bold text-white mb-2">
                            <i className="fas fa-align-left mr-2"></i>
                            Descripción
                        </label>
                        <textarea
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
                        <label className="block text-sm font-bold text-white mb-2">
                            <i className="fas fa-tag mr-2"></i>
                            Tipo de Tarea
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-xl text-white focus:outline-none transition-all"
                            style={inputStyle}
                        >
                            {getTaskTypeList().map((type) => (
                                <option key={type.id} value={type.id} className="bg-gray-800">
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-bold text-white mb-2">
                                <i className="fas fa-exclamation-circle mr-2"></i>
                                Prioridad
                            </label>
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
                            <label className="block text-sm font-bold text-white mb-2">
                                <i className="fas fa-calendar mr-2"></i>
                                Fecha límite
                            </label>
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
                        <label className="block text-sm font-bold text-white mb-2">
                            <i className="fas fa-tag mr-2"></i>
                            Estado
                        </label>
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
                            <i className="fas fa-plus mr-2"></i>
                            Agregar
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}
