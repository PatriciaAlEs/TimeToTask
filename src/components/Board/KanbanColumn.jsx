/**
 * Componente: KanbanColumn
 * Columna individual del Kanban con tarjetas de tareas
 */

import React from 'react';

export function KanbanColumn({ title, tasks, color, icon, bgColor, textColor, borderColor }) {
    const bgClass = bgColor || 'bg-white/5';
    const borderClass = borderColor || 'border-white/10'; return (
        <div className={`flex flex-col backdrop-blur-lg rounded-2xl border-2 transition-all hover:shadow-xl overflow-hidden ${borderClass} ${bgClass}`}>
            {/* Header */}
            <div className={`bg-gradient-to-r ${color} px-4 py-3 flex items-center gap-2`}>
                <i className={`fas ${icon} text-white text-xl`}></i>
                <div>
                    <h3 className="text-base font-bold text-white">{title}</h3>
                    <p className="text-white/80 text-xs">{tasks?.length || 0} tareas</p>
                </div>
            </div>

            {/* Tasks Container */}
            <div className="p-3 space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">{tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`backdrop-blur-sm rounded-lg p-3 border-2 transition-all cursor-pointer group ${bgColor} ${borderColor} hover:opacity-80`}
                    >
                        {/* Tag */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full text-white bg-gradient-to-r ${color}`}>
                                {title}
                            </span>
                            {task.priority && (
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${task.priority === 'high' ? 'bg-red-500/30 text-red-200' :
                                    task.priority === 'medium' ? 'bg-yellow-500/30 text-yellow-200' :
                                        'bg-green-500/30 text-green-200'
                                    }`}>
                                    {task.priority}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-white mb-2 group-hover:text-orange-300 transition-colors line-clamp-2 text-sm">
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
                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sin fecha'}
                            </div>
                            {task.assignee && (
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
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
                        <p className="text-xs">Sin tareas</p>
                    </div>
                </div>
            )}
            </div>

            {/* Add Task Button */}
            <div className="p-3 border-t border-white/10">
                <button className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 group">
                    <i className="fas fa-plus group-hover:scale-125 transition-transform"></i>
                    Agregar
                </button>
            </div>
        </div>
    );
}
