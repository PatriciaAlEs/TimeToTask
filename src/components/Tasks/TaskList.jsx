/**
 * Componente TaskList
 * Lista de tareas con filtrado y estado de carga
 * Props:
 *   - tasks (array): Lista de tareas a mostrar
 *   - loading (boolean): Estado de carga
 *   - onDelete (function): Callback al eliminar tarea
 *   - onEdit (function): Callback al editar tarea
 *   - onStatusChange (function): Callback al cambiar estado
 *   - filter (string): Filtro activo ('all', 'active', 'completed')
 */

import { useState } from "react";
import TaskCard from "./TaskCard";

export default function TaskList({
  tasks = [],
  loading = false,
  onDelete = () => {},
  onEdit = () => {},
  onStatusChange = () => {},
  filter = "all",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Filtrar tareas
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && task.status !== "completed") ||
      (filter === "completed" && task.status === "completed");
    return matchesSearch && matchesFilter;
  });

  // Ordenar tareas
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        {/* Búsqueda */}
        <div>
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ordenamiento */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Más recientes</option>
              <option value="priority">Prioridad</option>
              <option value="title">Título (A-Z)</option>
            </select>
          </div>

          {/* Contador */}
          <div className="flex items-end">
            <span className="text-sm text-gray-600 font-medium">
              {sortedTasks.length} tarea{sortedTasks.length !== 1 ? "s" : ""} {filter !== "all" && `(${filter})`}
            </span>
          </div>
        </div>
      </div>

      {/* Lista de tareas */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando tareas...</p>
          </div>
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg mb-2">No hay tareas</p>
          <p className="text-gray-400 text-sm\">
            {searchTerm ? "Intenta con otro término de búsqueda" : "Crea una nueva tarea para comenzar"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => onDelete(task.id)}
              onEdit={() => onEdit(task)}
              onStatusChange={(status) => onStatusChange(task.id, status)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
