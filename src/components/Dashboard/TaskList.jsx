import React from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, title, emptyMessage, onEdit, onDelete, onComplete }) {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <i className="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
                <p className="text-gray-500">{emptyMessage || 'No hay tareas'}</p>
            </div>
        );
    }

    return (
        <div>
            {title && (
                <h2 className="text-2xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-tasks text-orange-500"></i>
                    {title}
                </h2>
            )}
            <div className="space-y-4">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onComplete={onComplete}
                    />
                ))}
            </div>
        </div>
    );
}
