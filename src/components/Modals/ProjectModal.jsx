/**
 * Componente: Modal para agregar proyectos
 */

import React, { useState } from 'react';

export function ProjectModal({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: 'from-orange-500 to-orange-600',
    });

    const colors = [
        { name: 'Naranja', value: 'from-orange-500 to-orange-600' },
        { name: 'Azul', value: 'from-blue-500 to-blue-600' },
        { name: 'Púrpura', value: 'from-purple-500 to-purple-600' },
        { name: 'Verde', value: 'from-green-500 to-green-600' },
        { name: 'Rojo', value: 'from-red-500 to-red-600' },
        { name: 'Rosa', value: 'from-pink-500 to-pink-600' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: '',
            description: '',
            color: 'from-orange-500 to-orange-600',
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-primary-400/30 to-primary-500/30 backdrop-blur-lg rounded-2xl border border-primary-400/50 w-full max-w-md p-8 shadow-2xl animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-white drop-shadow-lg">Nuevo Proyecto</h2>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white text-2xl transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-bold text-white mb-2">
                            <i className="fas fa-folder mr-2"></i>
                            Nombre del Proyecto *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej: Mi App Web"
                            required
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
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
                            placeholder="¿En qué consiste este proyecto?"
                            rows="3"
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none"
                        ></textarea>
                    </div>

                    {/* Color Picker */}
                    <div>
                        <label className="block text-sm font-bold text-white mb-3">
                            <i className="fas fa-palette mr-2"></i>
                            Color del Proyecto
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {colors.map((color) => (
                                <button
                                    key={color.value}
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, color: color.value }))}
                                    className={`h-10 rounded-lg bg-gradient-to-br ${color.value} border-2 transition-all transform hover:scale-110 ${formData.color === color.value ? 'border-white scale-110' : 'border-transparent'
                                        }`}
                                    title={color.name}
                                >
                                    {formData.color === color.value && (
                                        <i className="fas fa-check text-white"></i>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/50 transform hover:scale-105"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
