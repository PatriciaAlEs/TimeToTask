import { useState, useEffect } from "react";

export default function TaskForm({
  initialData = null,
  onSubmit = () => { },
  onCancel = () => { },
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

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "El título es requerido";
    if (formData.title.length > 100) newErrors.title = "El título no puede exceder 100 caracteres";
    if (formData.description.length > 500) newErrors.description = "La descripción no puede exceder 500 caracteres";
    if (formData.dueDate && new Date(formData.dueDate) < new Date()) newErrors.dueDate = "La fecha no puede ser en el pasado";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {initialData ? "Editar Tarea" : "Nueva Tarea"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título de la tarea"
            maxLength="100"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : "border-gray-300"}`}
            disabled={loading}
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          <p className="text-gray-500 text-xs mt-1">{formData.title.length}/100 caracteres</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detalles de la tarea"
            maxLength="500"
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.description ? "border-red-500" : "border-gray-300"}`}
            disabled={loading}
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
          <p className="text-gray-500 text-xs mt-1">{formData.description.length}/500 caracteres</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="pending">Pendiente</option>
              <option value="inProgress">En Progreso</option>
              <option value="completed">Completada</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Vencimiento</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dueDate ? "border-red-500" : "border-gray-300"}`}
            disabled={loading}
          />
          {errors.dueDate && <p className="text-red-600 text-sm mt-1">{errors.dueDate}</p>}
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:bg-gray-400"
          >
            {loading
              ? initialData
                ? "Actualizando..."
                : "Creando..."
              : initialData
                ? "Actualizar Tarea"
                : "Crear Tarea"}
          </button>
        </div>
      </form>
    </div>
  );
}
