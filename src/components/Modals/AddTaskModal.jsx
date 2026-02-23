/**
 * Componente: Modal para agregar tareas
 */

import React, { useState } from 'react';
import { TASK_TYPES, getTaskTypeList } from '../../config/taskTypes';

export function AddTaskModal({ isOpen, onClose, onSubmit, projectId, selectedTaskType }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: selectedTaskType || 'feature',
        priority: 'medium',
        dueDate: '',
        status: 'backlog',
    });

    // Obtener el config del tipo seleccionado
    const selectedTypeConfig = selectedTaskType ? TASK_TYPES[selectedTaskType] : TASK_TYPES.feature;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, projectId });
        setFormData({
            title: '',
            description: '',
            type: selectedTaskType || 'feature',
            priority: 'medium',
            dueDate: '',
            status: 'backlog',
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`bg-[oklch(44.2%_0.017_285.786)] backdrop-blur-lg rounded-2xl border-2 ${selectedTypeConfig.borderColor} w-full max-w-md p-8 shadow-2xl animate-fade-in`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <i className={`fas ${selectedTypeConfig.icon} text-white text-2xl`}></i>
                        <h2 className="text-2xl font-black text-white drop-shadow-lg">Nueva Tarea</h2>
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
                            className={`w-full px-4 py-3 bg-gray-900/50 border-2 ${selectedTypeConfig.borderColor} rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all`}
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
                            className={`w-full px-4 py-3 bg-gray-900/50 border-2 ${selectedTypeConfig.borderColor} rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all resize-none`}
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
                            className={`w-full px-4 py-3 bg-gray-900/50 border-2 ${selectedTypeConfig.borderColor} rounded-xl text-white focus:outline-none transition-all`}
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
                                className={`w-full px-4 py-3 bg-gray-900/50 border-2 ${selectedTypeConfig.borderColor} rounded-xl text-white focus:outline-none transition-all`}
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
                                className={`w-full px-4 py-3 bg-gray-900/50 border-2 ${selectedTypeConfig.borderColor} rounded-xl text-white focus:outline-none transition-all`}
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
                            className={`w-full px-4 py-3 bg-gray-900/50 border-2 ${selectedTypeConfig.borderColor} rounded-xl text-white focus:outline-none transition-all`}
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
                            className={`flex-1 py-3 px-4 bg-gray-900/40 border-2 ${selectedTypeConfig.borderColor} text-white rounded-xl font-bold transition-all hover:bg-gray-900/60`}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 py-3 px-4 bg-gradient-to-br ${selectedTypeConfig.color} text-white rounded-xl font-bold transition-all shadow-lg transform hover:scale-105 border-2 ${selectedTypeConfig.borderColor}`}
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
