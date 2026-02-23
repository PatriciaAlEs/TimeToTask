import React from 'react';

export default function Sidebar({ stats, filters, onFilterChange }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-20 h-fit">
            {/* Resumen Numérico */}
            <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-chart-bar text-orange-500"></i>
                    Resumen
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-semibold text-gray-600">Total</span>
                        <span className="text-2xl font-black text-primary-700">{stats.total}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-semibold text-gray-600">Pendientes</span>
                        <span className="text-2xl font-black text-gray-600">{stats.pending}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                        <span className="text-sm font-semibold text-primary-600">En Progreso</span>
                        <span className="text-2xl font-black text-primary-600">{stats.inProgress}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-semibold text-green-600">Completadas</span>
                        <span className="text-2xl font-black text-green-600">{stats.completed}</span>
                    </div>
                </div>
            </div>

            {/* Filtros Avanzados */}
            <div className="mb-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-filter text-orange-500"></i>
                    Filtros
                </h3>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Prioridad
                        </label>
                        <select
                            onChange={(e) => onFilterChange('priority', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="all">Todas</option>
                            <option value="high">Alta</option>
                            <option value="medium">Media</option>
                            <option value="low">Baja</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Fecha Límite
                        </label>
                        <select
                            onChange={(e) => onFilterChange('deadline', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="all">Todas</option>
                            <option value="today">Hoy</option>
                            <option value="week">Esta Semana</option>
                            <option value="month">Este Mes</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Widget de Productividad */}
            <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-3">Esta Semana</h3>
                <div className="bg-gradient-to-br from-orange-500 to-yellow-400 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">Completadas</span>
                        <i className="fas fa-check-circle text-xl"></i>
                    </div>
                    <p className="text-3xl font-black">{stats.completedThisWeek}</p>
                    <p className="text-xs mt-2 opacity-90">¡Excelente progreso!</p>
                </div>
            </div>
        </div>
    );
}
