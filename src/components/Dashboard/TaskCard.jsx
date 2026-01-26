import React from 'react';

export default function TaskCard({ task, onEdit, onDelete, onComplete }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'in_progress':
                return 'bg-primary-100 text-primary-800 border-primary-300';
            case 'pending':
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'text-red-500';
            case 'medium':
                return 'text-orange-500';
            case 'low':
            default:
                return 'text-gray-500';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
                return 'Completada';
            case 'in_progress':
                return 'En Progreso';
            case 'pending':
            default:
                return 'Pendiente';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border-l-4 border-primary-500">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary-900 mb-1 hover:text-primary-600 cursor-pointer">
                        {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                </div>

                {/* Prioridad */}
                <div className={`ml-3 ${getPriorityColor(task.priority)}`}>
                    <i className="fas fa-flag text-lg"></i>
                </div>
            </div>

            {/* Información adicional */}
            <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                {task.deadline && (
                    <div className="flex items-center gap-1">
                        <i className="fas fa-calendar-alt"></i>
                        <span>{formatDate(task.deadline)}</span>
                    </div>
                )}
                {task.location && (
                    <div className="flex items-center gap-1">
                        <i className="fas fa-map-marker-alt"></i>
                        <span className="truncate max-w-[150px]">{task.location.address}</span>
                    </div>
                )}
            </div>

            {/* Badge de estado */}
            <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(task.status)}`}>
                    {getStatusText(task.status)}
                </span>

                {/* Acciones */}
                <div className="flex items-center gap-2">
                    {task.status !== 'completed' && (
                        <button
                            onClick={() => onComplete(task.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Completar"
                        >
                            <i className="fas fa-check"></i>
                        </button>
                    )}
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Editar"
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
