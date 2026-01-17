/**
 * Componente TaskCard
 * Tarjeta individual de tarea con acciones
 * Props:
 *   - task (object): Objeto tarea con id, title, description, status, priority, dueDate
 *   - onDelete (function): Callback al eliminar
 *   - onEdit (function): Callback al editar
 *   - onStatusChange (function): Callback al cambiar estado
 */

import { useState } from "react";

export default function TaskCard({
  task = {},
  onDelete = () => {},
  onEdit = () => {},
  onStatusChange = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    id = "",
    title = "Sin título",
    description = "",
    status = "pending",
    priority = "medium",
    dueDate = "",
    assignedTo = null,
  } = task;

  // Estilos según estado
  const statusStyles = {
    completed: "bg-green-100 text-green-800 border-l-4 border-green-500",
    inProgress: "bg-blue-100 text-blue-800 border-l-4 border-blue-500",
    pending: "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500",
  };

  // Colores de prioridad
  const priorityColors = {
    high: "text-red-600 bg-red-100",
    medium: "text-yellow-600 bg-yellow-100",
    low: "text-green-600 bg-green-100",
  };

  // Formato de fecha
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    });
  };

  // Verificar si está vencida
  const isOverdue =
    dueDate &&
    status !== "completed" &&
    new Date(dueDate) < new Date();

  return (
    <div
      className={`rounded-lg p-4 shadow hover:shadow-md transition-shadow ${
        statusStyles[status] || statusStyles.pending
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Checkbox de estado */}
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
              <span className={`px-2 py-1 rounded ${priorityColors[priority] || priorityColors.medium}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </span>

              {/* Fecha de vencimiento */}
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

              {/* Asignado a */}
              {assignedTo && (
                <span className="px-2 py-1 rounded bg-blue-200 text-blue-700">
                  👤 {assignedTo.name}
                </span>
              )}

              {/* Estado actual */}
              {status === "inProgress" && (
                <span className="px-2 py-1 rounded bg-blue-200 text-blue-700">
                  ⏳ En progreso
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-2">
          {/* Botón más opciones */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-black/10 rounded-lg transition"
              title="Más opciones"
            >
              ⋮
            </button>

            {/* Menú desplegable */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                <button
                  onClick={() => {
                    onEdit();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition first:rounded-t-lg"
                >
                  ✏️ Editar
                </button>

                {status !== "inProgress" && (
                  <button
                    onClick={() => {
                      onStatusChange("inProgress");
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
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
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
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
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition last:rounded-b-lg"
                >
                  🗑️ Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
                            </div>
                        )}
                        <span className="text-gray-500">{task.comments?.length || 0} 💬</span>
                    </Row>
                </div>
            </CardBody>
        </Card>
    );
}
