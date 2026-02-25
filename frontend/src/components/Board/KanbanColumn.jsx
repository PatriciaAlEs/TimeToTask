/**
 * Componente: KanbanColumn
 * Columna individual del Kanban con tarjetas de tareas
 */

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export function KanbanColumn({
    title,
    tasks,
    theme,
    columnType,
    onTaskDragStart,
    onTaskDrop,
    onAddTask,
    onEditTask,
}) {
    const { t } = useLanguage();
    const columnStyle = {
        backgroundColor: theme?.surface || 'rgba(255, 255, 255, 0.06)',
        borderColor: theme?.surfaceBorder || 'rgba(255, 255, 255, 0.20)',
    };

    const headerStyle = {
        backgroundColor: theme?.headerFrom || 'rgba(148, 163, 184, 0.70)',
    };

    const taskStyle = {
        backgroundColor: theme?.cardSurface || 'rgba(255, 255, 255, 0.08)',
        borderColor: theme?.cardBorder || 'rgba(255, 255, 255, 0.25)',
    };

    const tagStyle = {
        backgroundColor: theme?.headerFrom || 'rgba(148, 163, 184, 0.70)',
    };

    return (
        <div className="flex flex-col backdrop-blur-lg rounded-2xl border-2 transition-all hover:shadow-xl overflow-hidden" style={columnStyle}>
            {/* Header */}
            <div className="px-4 py-4 flex items-center justify-center" style={headerStyle}>
                <h3 className="text-2xl font-extrabold tracking-wide text-white text-center">{title}</h3>
            </div>

            {/* Tasks Container */}
            <div
                className="flex-1 p-3 space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => onTaskDrop && onTaskDrop(event, columnType)}
            >{tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                    <div
                        key={task.id}
                        className="backdrop-blur-sm rounded-lg p-3 border-2 transition-all cursor-pointer group hover:opacity-90"
                        style={taskStyle}
                        draggable
                        onDragStart={(event) => onTaskDragStart && onTaskDragStart(event, task.id)}
                        onClick={() => onEditTask && onEditTask(task)}
                    >
                        {/* Tag */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={tagStyle}>
                                {title}
                            </span>
                            {task.priority && (
                                <span className={`text-xs font-bold px-2 py-1 rounded-full border ${task.priority === 'high' ? 'bg-[#BC4B51]/25 border-[#BC4B51]/45 text-[#FDEDED]' :
                                    task.priority === 'medium' ? 'bg-[#F4A259]/25 border-[#F4A259]/45 text-[#FFF3E5]' :
                                        'bg-[#8CB369]/25 border-[#8CB369]/45 text-[#EAF4E2]'
                                    }`}>
                                    {task.priority}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-white mb-2 group-hover:text-white/85 transition-colors line-clamp-2 text-sm">
                            {task.title || task.name}
                        </h4>

                        {/* Description */}
                        {task.description && (
                            <p className="text-xs text-gray-200 line-clamp-2 mb-2">
                                {task.description}
                            </p>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs text-gray-300">
                            <div className="flex items-center gap-1">
                                <i className="fas fa-calendar"></i>
                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : t('noDateSet')}
                            </div>
                            {task.assignee && (
                                <div className="w-6 h-6 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-white text-xs font-bold">
                                    {task.assignee.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex items-center justify-center h-32 text-gray-400">
                    <div className="text-center">
                        <i className="fas fa-inbox text-2xl mb-2 opacity-50"></i>
                        <p className="text-xs">{t('noTasksColumn')}</p>
                    </div>
                </div>
            )}
            </div>

            {/* Add Task Button */}
            <div className="p-3 border-t border-white/10 flex items-center justify-center">
                <button
                    onClick={onAddTask}
                    className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 text-sm font-bold transition-all flex items-center justify-center shadow-lg hover:shadow-xl border-2"
                    style={{ borderColor: theme?.cardBorder || 'rgba(255, 255, 255, 0.30)' }}
                    aria-label="Agregar tarea"
                >
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        </div>
    );
}
