import React from 'react';
import TaskCard from './TaskCard';

export default function DeadlineAlert({ tasks, onEdit, onDelete, onComplete }) {
    if (!tasks || tasks.length === 0) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg shadow-md p-6 border-2 border-orange-300">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-exclamation-triangle text-white text-lg"></i>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-orange-900">Próximas a Vencer</h2>
                    <p className="text-sm text-orange-700">Tareas con fecha límite cercana</p>
                </div>
            </div>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-white rounded-lg p-3 border-l-4 border-orange-500 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 mb-1">{task.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <i className="fas fa-calendar-alt text-orange-500"></i>
                                        {new Date(task.deadline).toLocaleDateString('es-ES')}
                                    </span>
                                    <span className="text-orange-600 font-semibold">
                                        {Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24))} días
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => onComplete(task.id)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="Completar"
                                >
                                    <i className="fas fa-check"></i>
                                </button>
                                <button
                                    onClick={() => onEdit(task)}
                                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                    title="Editar"
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
