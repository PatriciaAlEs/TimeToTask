/**
 * Componente: Board Kanban
 * Muestra tareas en columnas por estado
 */

import React from 'react';
import { TaskCard } from './TaskCard';
import { Card, CardBody } from '../common/Cards';

const TASK_STATUS = {
    todo: { label: 'Por Hacer', color: 'bg-gray-100' },
    inProgress: { label: 'En Progreso', color: 'bg-blue-100' },
    review: { label: 'En Revisión', color: 'bg-purple-100' },
    done: { label: 'Completado', color: 'bg-green-100' },
};

export function Board({ tasks = [], onTaskMove, onTaskClick }) {
    const tasksByStatus = Object.keys(TASK_STATUS).reduce((acc, status) => {
        acc[status] = tasks.filter((t) => t.status === status);
        return acc;
    }, {});

    const handleDrop = (e, status) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        onTaskMove(taskId, status);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(TASK_STATUS).map(([status, { label, color }]) => (
                <div
                    key={status}
                    className={`${color} rounded-lg p-4 min-h-96`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, status)}
                >
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center justify-between">
                        {label}
                        <span className="bg-gray-300 text-xs px-2 py-1 rounded-full">
                            {tasksByStatus[status].length}
                        </span>
                    </h3>

                    <div className="space-y-3">
                        {tasksByStatus[status].map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
                                onClick={() => onTaskClick(task)}
                            />
                        ))}

                        {tasksByStatus[status].length === 0 && (
                            <div className="text-center py-8 text-gray-500 text-sm">
                                Arrastra tareas aquí
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
