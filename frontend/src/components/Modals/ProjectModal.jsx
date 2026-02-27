/**
 * Componente: Modal para agregar proyectos
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DEFAULT_PROJECT_COLOR, PROJECT_COLOR_OPTIONS, resolveProjectColorVisual } from '../../config/projectColors';

export function ProjectModal({ isOpen, onClose, onSubmit, initialData = null, mode = 'create' }) {
    const initialFormState = {
        name: '',
        description: '',
        color: DEFAULT_PROJECT_COLOR,
        customColor: '#f97316',
    };

    const [formData, setFormData] = useState({
        ...initialFormState,
    });

    const colors = PROJECT_COLOR_OPTIONS;

    const selectedColorMeta = colors.find((color) => color.value === formData.color) || colors[0];
    const activeColor = formData.color === 'custom' ? formData.customColor : formData.color;
    const activeColorVisual = resolveProjectColorVisual(activeColor);

    const modalStyle = {
        backgroundColor: 'rgba(51, 65, 85, 0.92)',
        borderColor: activeColorVisual.border,
        boxShadow: '0 20px 45px rgba(15, 23, 42, 0.45)',
    };

    const formStyle = {
        borderColor: activeColorVisual.border,
        backgroundColor: activeColorVisual.surface,
    };

    const inputStyle = {
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        borderColor: activeColorVisual.cardBorder,
    };

    const submitButtonStyle = {
        backgroundImage: `linear-gradient(135deg, ${activeColorVisual.start}, ${activeColorVisual.end})`,
        borderColor: activeColorVisual.cardBorder,
    };

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        if (!initialData) {
            setFormData({ ...initialFormState });
            return;
        }

        const incomingColor = initialData.color || initialFormState.color;
        const isHexColor = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(incomingColor);

        setFormData({
            name: initialData.name || '',
            description: initialData.description || '',
            color: isHexColor ? 'custom' : incomingColor,
            customColor: isHexColor ? incomingColor : initialFormState.customColor,
        });
    }, [isOpen, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            color: formData.color === 'custom' ? formData.customColor : formData.color,
        };
        onSubmit(payload);
        setFormData({ ...initialFormState });
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
                        className="backdrop-blur-lg rounded-2xl border w-full max-w-md p-8"
                        style={modalStyle}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-white drop-shadow-lg">
                                {mode === 'edit' ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-white/70 hover:text-white text-2xl transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 border-2 rounded-xl p-4" style={formStyle}>
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
                                    className="w-full px-4 py-3 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all"
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
                                    placeholder="¿En qué consiste este proyecto?"
                                    rows="3"
                                    className="w-full px-4 py-3 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all resize-none"
                                    style={inputStyle}
                                ></textarea>
                            </div>

                            {/* Color Picker */}
                            <div>
                                <label className="block text-sm font-bold text-white mb-3">
                                    <i className="fas fa-palette mr-2"></i>
                                    Color del Proyecto
                                </label>
                                <div className="mb-3 rounded-lg border p-2" style={inputStyle}>
                                    <p className="text-xs font-semibold text-white/80 mb-2">Vista del color seleccionado</p>
                                    <div className="flex items-center gap-2">
                                        {(() => {
                                            const selectedBaseColor = colors.find((color) => color.value === formData.color);
                                            const previewStyle = formData.color === 'custom'
                                                ? { backgroundColor: formData.customColor }
                                                : selectedBaseColor
                                                    ? { background: `linear-gradient(90deg, ${selectedBaseColor.start}, ${selectedBaseColor.end})` }
                                                    : { background: 'linear-gradient(90deg, #f97316, #ea580c)' };

                                            return (
                                                <div
                                                    className="h-8 w-16 rounded-md border border-white/20"
                                                    style={previewStyle}
                                                ></div>
                                            );
                                        })()}
                                        <span className="text-xs font-semibold text-white/80">
                                            {formData.color === 'custom' ? `Personalizado (${formData.customColor})` : selectedColorMeta.name}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                    {colors.map((color) => (
                                        <button
                                            key={color.value}
                                            type="button"
                                            onClick={() => setFormData((prev) => ({ ...prev, color: color.value }))}
                                            className={`h-10 rounded-lg border-2 transition-all transform hover:scale-110 ${color.value === 'custom' ? 'bg-white/10' : ''} ${formData.color === color.value ? 'border-white scale-110' : 'border-transparent'}`}
                                            style={color.value !== 'custom' ? { background: `linear-gradient(135deg, ${color.start}, ${color.end})` } : undefined}
                                            title={color.name}
                                        >
                                            {color.value === 'custom' ? (
                                                <i className="fas fa-droplet text-white"></i>
                                            ) : null}
                                            {formData.color === color.value && (
                                                <i className="fas fa-check text-white"></i>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {formData.color === 'custom' && (
                                    <div className="mt-3 flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 p-2">
                                        <input
                                            type="color"
                                            name="customColor"
                                            value={formData.customColor}
                                            onChange={handleChange}
                                            className="h-10 w-14 cursor-pointer rounded border border-white/20 bg-transparent"
                                        />
                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-white/80">Color personalizado</p>
                                            <p className="text-xs text-white/60">Se guardará como color principal del proyecto</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 hover:bg-white/20 text-white rounded-xl font-bold transition-all border"
                                    style={{ borderColor: activeColorVisual.border, backgroundColor: 'rgba(15, 23, 42, 0.35)' }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-4 text-white rounded-xl font-bold transition-all shadow-lg transform hover:scale-105 border"
                                    style={submitButtonStyle}
                                >
                                    <i className={`fas ${mode === 'edit' ? 'fa-pen' : 'fa-plus'} mr-2`}></i>
                                    {mode === 'edit' ? 'Guardar cambios' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
