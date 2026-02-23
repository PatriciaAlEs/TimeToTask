import React from 'react';

export default function QuickActions({ onNewTask, onFilterChange, viewMode, onViewModeChange }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Botón Nueva Tarea */}
                <button
                    onClick={onNewTask}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg"
                >
                    <i className="fas fa-plus"></i>
                    Nueva Tarea
                </button>

                {/* Filtros Rápidos */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-600 mr-2">Filtrar:</span>
                    <button
                        onClick={() => onFilterChange('all')}
                        className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => onFilterChange('pending')}
                        className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                        Pendientes
                    </button>
                    <button
                        onClick={() => onFilterChange('in_progress')}
                        className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-primary-100 hover:bg-primary-200 text-primary-700"
                    >
                        En Progreso
                    </button>
                    <button
                        onClick={() => onFilterChange('completed')}
                        className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-green-100 hover:bg-green-200 text-green-700"
                    >
                        Completadas
                    </button>
                </div>

                {/* Selector de Vista */}
                <div className="flex items-center gap-2 border-l pl-4">
                    <span className="text-sm font-semibold text-gray-600 mr-2">Vista:</span>
                    <button
                        onClick={() => onViewModeChange('list')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${viewMode === 'list'
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                    >
                        <i className="fas fa-list mr-1"></i>
                        Lista
                    </button>
                    <button
                        onClick={() => onViewModeChange('kanban')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${viewMode === 'kanban'
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                    >
                        <i className="fas fa-columns mr-1"></i>
                        Kanban
                    </button>
                </div>
            </div>
        </div>
    );
}
