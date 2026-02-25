/**
 * Página: Dashboard
 * Vista general con estadísticas y resumen
 */

import React, { useMemo, useState } from 'react';
import { ProjectList } from '../components/Projects/ProjectList';
import { AddTaskModal } from '../components/Modals/AddTaskModal';
import { ProjectModal } from '../components/Modals/ProjectModal';
import { useTasks } from '../hooks/useTasks.jsx';
import { useProjects } from '../hooks/useProjects.jsx';
import { TASK_TYPES } from '../config/taskTypes';

function DonutChart({ segments, total }) {
    const size = 88;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    let accumulatedValue = 0;

    return (
        <div className="relative h-24 w-24">
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    className="text-white/15"
                    strokeWidth={strokeWidth}
                />
                {total > 0 &&
                    segments
                        .filter((segment) => segment.value > 0)
                        .map((segment) => {
                            const arcLength = (segment.value / total) * circumference;
                            const strokeDashoffset = circumference - (accumulatedValue / total) * circumference;
                            accumulatedValue += segment.value;

                            return (
                                <circle
                                    key={segment.id}
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    fill="none"
                                    stroke="currentColor"
                                    className={segment.colorClass}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={`${arcLength} ${circumference - arcLength}`}
                                    strokeDashoffset={strokeDashoffset}
                                />
                            );
                        })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-black text-white">{total}</span>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const { projects, loading, createProject } = useProjects();
    const { tasks, createTask } = useTasks();
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [errorForm, setErrorForm] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${now.getFullYear()}-${month}`;
    });

    const [rawYear, rawMonth] = selectedMonth.split('-');
    const selectedYear = Number(rawYear) || new Date().getFullYear();
    const selectedMonthIndex = Number(rawMonth) || new Date().getMonth() + 1;
    const firstDayOfMonth = new Date(selectedYear, selectedMonthIndex - 1, 1);
    const daysInSelectedMonth = new Date(selectedYear, selectedMonthIndex, 0).getDate();
    const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7;
    const weekdayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const tasksByDay = useMemo(() => {
        const grouped = {};

        tasks.forEach((task) => {
            const createdDateRaw = task.created_at || task.createdAt;
            const createdDate = createdDateRaw ? new Date(createdDateRaw) : null;

            if (!createdDate || Number.isNaN(createdDate.getTime())) {
                return;
            }

            if (createdDate.getFullYear() !== selectedYear || createdDate.getMonth() + 1 !== selectedMonthIndex) {
                return;
            }

            const day = createdDate.getDate();
            if (!grouped[day]) {
                grouped[day] = [];
            }

            grouped[day].push(task);
        });

        Object.keys(grouped).forEach((dayKey) => {
            grouped[dayKey].sort((a, b) => {
                const aDate = new Date(a.created_at || a.createdAt || 0);
                const bDate = new Date(b.created_at || b.createdAt || 0);
                return aDate - bDate;
            });
        });

        return grouped;
    }, [tasks, selectedYear, selectedMonthIndex]);

    const calendarCells = useMemo(() => {
        const cells = [];

        for (let index = 0; index < firstWeekday; index += 1) {
            cells.push({ key: `empty-start-${index}`, isEmpty: true });
        }

        for (let day = 1; day <= daysInSelectedMonth; day += 1) {
            cells.push({ key: `day-${day}`, day, isEmpty: false });
        }

        while (cells.length % 7 !== 0) {
            cells.push({ key: `empty-end-${cells.length}`, isEmpty: true });
        }

        return cells;
    }, [firstWeekday, daysInSelectedMonth]);

    const isTaskCompleted = (task) => task.completed === true || task.status === 'done' || task.status === 'completed';

    const statusSegments = [
        {
            id: 'backlog',
            label: 'Backlog',
            colorClass: 'text-slate-300',
            value: tasks.filter((task) => task.status === 'backlog').length,
        },
        {
            id: 'selected',
            label: 'Seleccionadas',
            colorClass: 'text-amber-300',
            value: tasks.filter((task) => task.status === 'selected').length,
        },
        {
            id: 'inProgress',
            label: 'En progreso',
            colorClass: 'text-blue-300',
            value: tasks.filter((task) => task.status === 'inProgress').length,
        },
        {
            id: 'inReview',
            label: 'En revisión',
            colorClass: 'text-purple-300',
            value: tasks.filter((task) => task.status === 'inReview').length,
        },
        {
            id: 'completed',
            label: 'Completadas',
            colorClass: 'text-green-300',
            value: tasks.filter((task) => isTaskCompleted(task)).length,
        },
    ];

    const typeSegments = Object.entries(TASK_TYPES).map(([typeKey, typeConfig]) => ({
        id: typeKey,
        label: typeConfig.name,
        colorClass: typeConfig.textColor,
        value: tasks.filter((task) => (task.type || 'feature') === typeKey).length,
    }));

    const prioritySegments = [
        {
            id: 'high',
            label: 'Alta',
            colorClass: 'text-red-300',
            value: tasks.filter((task) => task.priority === 'high').length,
        },
        {
            id: 'medium',
            label: 'Media',
            colorClass: 'text-yellow-300',
            value: tasks.filter((task) => task.priority === 'medium').length,
        },
        {
            id: 'low',
            label: 'Baja',
            colorClass: 'text-green-300',
            value: tasks.filter((task) => task.priority === 'low').length,
        },
    ];

    const summarySections = [
        {
            id: 'estado',
            title: 'Estado',
            icon: 'fa-layer-group',
            segments: statusSegments,
            total: tasks.length,
        },
        {
            id: 'tipo',
            title: 'Tipo',
            icon: 'fa-tags',
            segments: typeSegments,
            total: tasks.length,
        },
        {
            id: 'prioridad',
            title: 'Prioridad',
            icon: 'fa-flag',
            segments: prioritySegments,
            total: tasks.length,
        },
    ];

    const recentUpdates = [...tasks]
        .filter((task) => task.updated_at || task.updatedAt || task.created_at || task.createdAt)
        .sort((firstTask, secondTask) => {
            const firstDate = new Date(firstTask.updated_at || firstTask.updatedAt || firstTask.created_at || firstTask.createdAt || 0);
            const secondDate = new Date(secondTask.updated_at || secondTask.updatedAt || secondTask.created_at || secondTask.createdAt || 0);
            return secondDate - firstDate;
        })
        .slice(0, 8);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
            <div className="relative min-h-screen px-4 py-8">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-4"></div>
                    <div className="absolute w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 -right-4"></div>
                    <div className="absolute w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-20"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">Dashboard</h1>
                        <p className="text-xl text-gray-100 font-semibold">Resumen de tus proyectos y tareas</p>
                    </div>

                    {/* Proyectos */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Mis Proyectos</h2>
                            <button
                                onClick={() => setShowAddProjectModal(true)}
                                className="px-6 py-3 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all flex items-center gap-2"
                            >
                                <i className="fas fa-plus"></i>
                                Nuevo Proyecto
                            </button>
                        </div>
                        <div className="mb-4 rounded-2xl border border-primary-400/50 bg-primary-400/25 p-4 backdrop-blur-lg">
                            <p className="text-white font-semibold">
                                Crea primero tu proyecto y luego agrega tareas en Board para que aparezcan automáticamente en calendario y resumen.
                            </p>
                        </div>
                        <ProjectList projects={projects} loading={loading} />
                    </div>

                    {/* Calendario de tareas agregadas */}
                    <div className="mb-8">
                        <div className="backdrop-blur-lg rounded-2xl border-2 border-white/10 bg-white/10 p-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-white mb-2 drop-shadow-lg">Calendario de tareas</h2>
                                    <p className="text-sm text-gray-100">Tareas agregadas por día (estilo agenda mensual)</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm text-white/80">Mes</label>
                                    <input
                                        type="month"
                                        value={selectedMonth}
                                        onChange={(event) => setSelectedMonth(event.target.value)}
                                        className="bg-gray-900/50 text-white border border-white/20 rounded-lg px-3 py-2 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-7 gap-3">
                                {weekdayLabels.map((label) => (
                                    <div key={label} className="text-center text-xs font-semibold uppercase tracking-wide text-white/70">
                                        {label}
                                    </div>
                                ))}

                                {calendarCells.map((cell) => {
                                    if (cell.isEmpty) {
                                        return <div key={cell.key} className="min-h-[140px] rounded-xl border border-white/5 bg-white/[0.02]"></div>;
                                    }

                                    const dayTasks = tasksByDay[cell.day] || [];

                                    return (
                                        <div
                                            key={cell.key}
                                            className="min-h-[140px] rounded-xl border border-white/15 bg-primary-500/30 p-2 backdrop-blur-sm"
                                        >
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-sm font-bold text-white">{cell.day}</span>
                                                <span className="text-[11px] text-white/70">{dayTasks.length}</span>
                                            </div>

                                            <div className="space-y-2">
                                                {dayTasks.slice(0, 4).map((task) => {
                                                    const typeConfig = TASK_TYPES[task.type] || TASK_TYPES.feature;

                                                    return (
                                                        <div
                                                            key={`calendar-task-${task.id}`}
                                                            className={`rounded-md border px-2 py-1 shadow-sm ${typeConfig.bgColor} ${typeConfig.borderColor}`}
                                                            title={task.title || task.name}
                                                        >
                                                            <p className={`text-[11px] font-semibold leading-tight ${typeConfig.textColor} line-clamp-2`}>
                                                                {task.title || task.name}
                                                            </p>
                                                        </div>
                                                    );
                                                })}

                                                {dayTasks.length > 4 && (
                                                    <p className="text-[11px] font-semibold text-white/70">
                                                        +{dayTasks.length - 4} más
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Resumen + actualizaciones */}
                    <div className="mb-8">
                        <h2 className="mb-6 text-3xl font-bold text-white drop-shadow-lg">Resumen y actualizaciones</h2>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {summarySections.map((section) => (
                                <div key={section.id} className="rounded-2xl border border-primary-400/50 bg-primary-400/30 p-5 backdrop-blur-lg">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-black text-white">
                                            <i className={`fas ${section.icon} mr-2`}></i>
                                            {section.title}
                                        </h3>
                                        <span className="text-2xl font-black text-orange-300">{section.total}</span>
                                    </div>

                                    <div className="mb-4 flex items-center justify-center">
                                        <DonutChart segments={section.segments} total={section.total} />
                                    </div>

                                    <div className="space-y-1">
                                        {section.segments.map((segment) => (
                                            <div key={`${section.id}-${segment.id}`} className="flex items-center justify-between text-sm">
                                                <span className={`font-semibold ${segment.colorClass}`}>{segment.label}</span>
                                                <span className="font-bold text-white">{segment.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 rounded-2xl border border-primary-400/50 bg-primary-400/30 p-5 backdrop-blur-lg">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="text-xl font-black text-white">
                                    <i className="fas fa-history mr-2"></i>
                                    Últimas actualizaciones
                                </h3>
                                <span className="text-sm font-semibold text-white/80">{recentUpdates.length} registros</span>
                            </div>

                            {recentUpdates.length > 0 ? (
                                <div className="space-y-2">
                                    {recentUpdates.map((task) => {
                                        const typeConfig = TASK_TYPES[task.type] || TASK_TYPES.feature;
                                        const updatedDate = new Date(task.updated_at || task.updatedAt || task.created_at || task.createdAt);
                                        const wasCompleted = isTaskCompleted(task);

                                        return (
                                            <div
                                                key={`update-${task.id}`}
                                                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                                            >
                                                <div className="min-w-0">
                                                    <p className="line-clamp-1 text-sm font-semibold text-white">{task.title || task.name}</p>
                                                    <p className={`text-xs font-semibold ${typeConfig.textColor}`}>{typeConfig.name}</p>
                                                </div>
                                                <div className="ml-3 text-right">
                                                    <p className="text-[11px] text-white/70">{updatedDate.toLocaleDateString()} {updatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                    <p className={`text-xs font-bold ${wasCompleted ? 'text-green-300' : 'text-blue-300'}`}>
                                                        {wasCompleted ? 'Completada' : 'Actualizada'}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-sm text-white/70">No hay actualizaciones registradas todavía.</p>
                            )}
                        </div>
                    </div>

                    {/* Modales */}
                    <AddTaskModal
                        isOpen={showAddTaskModal}
                        onClose={() => {
                            setShowAddTaskModal(false);
                            setErrorForm(null);
                        }}
                        onSubmit={async (data) => {
                            try {
                                setIsLoadingForm(true);
                                setErrorForm(null);
                                await createTask(data);
                                setShowAddTaskModal(false);
                            } catch (err) {
                                setErrorForm(err.message);
                                console.error('Error al crear tarea:', err);
                            } finally {
                                setIsLoadingForm(false);
                            }
                        }}
                    />

                    <ProjectModal
                        isOpen={showAddProjectModal}
                        onClose={() => {
                            setShowAddProjectModal(false);
                            setErrorForm(null);
                        }}
                        onSubmit={async (data) => {
                            try {
                                setIsLoadingForm(true);
                                setErrorForm(null);
                                await createProject(data);
                                setShowAddProjectModal(false);
                            } catch (err) {
                                setErrorForm(err.message);
                                console.error('Error al crear proyecto:', err);
                            } finally {
                                setIsLoadingForm(false);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}