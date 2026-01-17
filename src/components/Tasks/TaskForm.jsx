/**
 * Componente TaskForm
 * Formulario para crear o editar tareas
 * Props:
 *   - initialData (object): Datos iniciales (opcional, para edición)
 *   - onSubmit (function): Callback al enviar el formulario
 *   - onCancel (function): Callback al cancelar
 *   - loading (boolean): Estado de carga
 */

import { useState, useEffect } from "react";

export default function TaskForm({
  initialData = null,
  onSubmit = () => {},
  onCancel = () => {},
  loading = false,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
    assignedTo: "",
  });

  const [errors, setErrors] = useState({});

  // Cargar datos iniciales si está en modo edición
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "medium",
        status: initialData.status || "pending",
        dueDate: initialData.dueDate ? initialData.dueDate.split("T")[0] : "",
        assignedTo: initialData.assignedTo?.id || "",
      });
    }
  }, [initialData]);

  // Validar formulario
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    }

    if (formData.title.length > 100) {
      newErrors.title = "El título no puede exceder 100 caracteres";
    }

    if (formData.description.length > 500) {
      newErrors.description = "La descripción no puede exceder 500 caracteres";
    }

    if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
      newErrors.dueDate = "La fecha no puede ser en el pasado";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {initialData ? "Editar Tarea" : "Nueva Tarea"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título de la tarea"
            maxLength="100"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            disabled={loading}\n          />\n          {errors.title && (\n            <p className=\"text-red-600 text-sm mt-1\">{errors.title}</p>\n          )}\n          <p className=\"text-gray-500 text-xs mt-1\">\n            {formData.title.length}/100 caracteres\n          </p>\n        </div>\n\n        {/* Descripción */}\n        <div>\n          <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n            Descripción\n          </label>\n          <textarea\n            name=\"description\"\n            value={formData.description}\n            onChange={handleChange}\n            placeholder=\"Detalles de la tarea\"\n            maxLength=\"500\"\n            rows=\"4\"\n            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${\n              errors.description ? \"border-red-500\" : \"border-gray-300\"\n            }`}\n            disabled={loading}\n          />\n          {errors.description && (\n            <p className=\"text-red-600 text-sm mt-1\">{errors.description}</p>\n          )}\n          <p className=\"text-gray-500 text-xs mt-1\">\n            {formData.description.length}/500 caracteres\n          </p>\n        </div>\n\n        {/* Grid 2 columnas */}\n        <div className=\"grid grid-cols-2 gap-4\">\n          {/* Prioridad */}\n          <div>\n            <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n              Prioridad\n            </label>\n            <select\n              name=\"priority\"\n              value={formData.priority}\n              onChange={handleChange}\n              className=\"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500\"\n              disabled={loading}\n            >\n              <option value=\"low\">Baja</option>\n              <option value=\"medium\">Media</option>\n              <option value=\"high\">Alta</option>\n            </select>\n          </div>\n\n          {/* Estado */}\n          <div>\n            <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n              Estado\n            </label>\n            <select\n              name=\"status\"\n              value={formData.status}\n              onChange={handleChange}\n              className=\"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500\"\n              disabled={loading}\n            >\n              <option value=\"pending\">Pendiente</option>\n              <option value=\"inProgress\">En Progreso</option>\n              <option value=\"completed\">Completada</option>\n            </select>\n          </div>\n        </div>\n\n        {/* Fecha de vencimiento */}\n        <div>\n          <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n            Fecha de Vencimiento\n          </label>\n          <input\n            type=\"date\"\n            name=\"dueDate\"\n            value={formData.dueDate}\n            onChange={handleChange}\n            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${\n              errors.dueDate ? \"border-red-500\" : \"border-gray-300\"\n            }`}\n            disabled={loading}\n          />\n          {errors.dueDate && (\n            <p className=\"text-red-600 text-sm mt-1\">{errors.dueDate}</p>\n          )}\n        </div>\n\n        {/* Acciones */}\n        <div className=\"flex gap-3 justify-end pt-4 border-t\">\n          <button\n            type=\"button\"\n            onClick={onCancel}\n            disabled={loading}\n            className=\"px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50\"\n          >\n            Cancelar\n          </button>\n          <button\n            type=\"submit\"\n            disabled={loading}\n            className=\"px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:bg-gray-400\"\n          >\n            {loading\n              ? initialData\n                ? \"Actualizando...\"\n                : \"Creando...\"\n              : initialData\n              ? \"Actualizar Tarea\"\n              : \"Crear Tarea\"}\n          </button>\n        </div>\n      </form>\n    </div>\n  );\n}"