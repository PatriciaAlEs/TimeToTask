/**
 * Componente TaskCard
 * Tarjeta individual de tarea con acciones
 *
 * Props:
 * - task (object)
 * - theme (object) → colores heredados de la columna
 * - onDelete (function)
 * - onEdit (function)
 * - onStatusChange (function)
 */

import { useState } from "react";

export default function TaskCard({
  task = {},
  theme = {},
  onDelete = () => {},
  onEdit = () => {},
  onStatusChange = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    title = "Sin título",
    description = "",
    status = "pending",
    priority = "medium",
    dueDate = "",
    assignedTo = null,
  } = task;

  /* ===========================
     🎨 Resolución de tema
     =========================== */

  const resolvedTheme = {
    bg: theme.bg || "bg-gray-100",
    text: theme.text || "text-gray-800",
    border: theme.border || "border-gray-300",
    badge: theme.badge || "bg-gray-200 text-gray-700",
  };

  /* ===========================
     🎯 Prioridad (NO rompe tema)
     =========================== */

  const priorityFallback = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  /* ===========================
     📅 Fecha
     =========================== */

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue =
    dueDate &&
    status !== "completed" &&
    new Date(dueDate) < new Date();

  /* ===========================
     🧩 Render
     =========================== */

  return (
    <div
      className={`rounded-lg p-4 shadow hover:shadow-md transition-shadow
        border-l-4
        ${resolvedTheme.bg}
        ${resolvedTheme.text}
        ${resolvedTheme.border}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Checkbox */}
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={status === "completed"}
            onChange={(e) =>
              onStatusChange(e.target.checked ? "completed" : "pending")
            }
            className="mt-1 w-5 h-5 cursor-pointer"
          />

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-lg ${
                status === "completed" ? "line-through opacity-60" : ""
              }`}
            >
              {title}
            </h3>

            {description && (
              <p
                className={`text-sm mt-1 opacity-75 ${
                  status === "completed" ? "line-through" : ""
                }`}
              >
                {description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-medium">
              {/* Prioridad */}
              <span
                className={`px-2 py-1 rounded ${
                  priorityFallback[priority] || priorityFallback.medium
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </span>

              {/* Fecha */}
              {dueDate && (
                <span
                  className={`px-2 py-1 rounded ${
                    isOverdue
                      ? "bg-red-200 text-red-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {isOverdue ? "⚠️ Vencida: " : "📅 "}
                  {formatDate(dueDate)}
                </span>
              )}

              {/* Asignado */}
              {assignedTo && (
                <span className={`
                  px-2 py-1 rounded
                  ${resolvedTheme.badge}
                `}>
                  👤 {assignedTo.name}
                </span>
              )}

              {/* Estado */}
              {status === "inProgress" && (
                <span className="px-2 py-1 rounded bg-blue-200 text-blue-700">
                  ⏳ En progreso
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-black/10 rounded-lg transition"
          >
            ⋮
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
              <button
                onClick={() => {
                  onEdit();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                ✏️ Editar
              </button>

              {status !== "inProgress" && (
                <button
                  onClick={() => {
                    onStatusChange("inProgress");
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  ⏳ Marcar en progreso
                </button>
              )}

              {status !== "completed" && (
                <button
                  onClick={() => {
                    onStatusChange("completed");
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  ✅ Marcar completada
                </button>
              )}

              <hr className="my-1" />

              <button
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
              >
                🗑️ Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
