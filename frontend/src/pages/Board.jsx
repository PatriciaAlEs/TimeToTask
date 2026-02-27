/**
 * Página: Board - Vista Kanban
 * Gestión de tareas por estados
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';
import { KanbanColumn } from '../components/Board/KanbanColumn';
import { AddTaskModal } from '../components/Modals/AddTaskModal';
import { EditTaskModal } from '../components/Modals/EditTaskModal';
import { useGlobalContext } from '../store';
import { useTasks } from '../hooks/useTasks.jsx';
import { TASK_TYPES, TASK_TYPE_SOFT_THEME } from '../config/taskTypes';
import api from '../services/api';

export default function BoardPage() {
    const { projects } = useGlobalContext();
    const { t } = useLanguage();
    const { theme } = useTheme();
    const { createTask, updateTaskData } = useTasks();
    const location = useLocation();
    const [tasks, setTasks] = useState([]);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [selectedTaskType, setSelectedTaskType] = useState(null);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [errorForm, setErrorForm] = useState(null);
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [selectedTaskToEdit, setSelectedTaskToEdit] = useState(null);
    const [showBoardInfo, setShowBoardInfo] = useState(false);

    const showSuccessToast = (message) => {
        toast.success(message, {
            className: 'timetotask-toast timetotask-toast-success',
            icon: '✅',
        });
    };

    const showErrorToast = (message) => {
        toast.error(message, {
            className: 'timetotask-toast timetotask-toast-error',
            icon: '⚠️',
        });
    };

    const queryParams = new URLSearchParams(location.search);
    const activeProjectId = queryParams.get('projectId');
    const selectedProjectInfo = projects.find((project) => String(project.id) === String(activeProjectId));

    const handleDragStart = (event, taskId) => {
        event.dataTransfer.setData('text/plain', String(taskId));
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleDropOnColumn = async (event, targetType) => {
        event.preventDefault();
        const taskIdRaw = event.dataTransfer.getData('text/plain');

        if (!taskIdRaw) {
            return;
        }

        const taskToMove = tasks.find((task) => String(task.id) === taskIdRaw);
        if (!taskToMove || taskToMove.type === targetType) {
            return;
        }

        const updatedTasks = tasks.map((task) =>
            task.id === taskToMove.id ? { ...task, type: targetType } : task
        );

        setTasks(updatedTasks);

        try {
            await updateTaskData(taskToMove.id, { type: targetType });
        } catch (error) {
            console.error('Error updating task type:', error);
        }
    };

    // Cargar tareas autenticadas
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = activeProjectId
                    ? await api.tasks.getByProject(activeProjectId)
                    : await api.tasks.getAll();
                setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
            } catch (error) {
                console.error('Error loading tasks:', error);
                setTasks([]);
            }
        };
        fetchTasks();
    }, [activeProjectId]);

    // Agrupar tareas por tipo
    const tasksByType = {};
    Object.keys(TASK_TYPES).forEach((typeKey) => {
        tasksByType[typeKey] = tasks.filter((t) => t.type === typeKey || (!t.type && typeKey === 'feature'));
    });

    // Crear columnas dinámicas basadas en tipos de tareas
    const columns = Object.entries(TASK_TYPES).map(([typeKey, typeConfig]) => {
        const softStyle = TASK_TYPE_SOFT_THEME[typeKey] || TASK_TYPE_SOFT_THEME.default;
        const resolvedTheme =
            theme !== 'dark' && typeKey === 'feature'
                ? {
                    ...softStyle,
                    surfaceBorder: 'rgba(151, 114, 31, 0.78)',
                    cardBorder: 'rgba(151, 114, 31, 0.72)',
                }
                : softStyle;

        return ({
            id: typeKey,
            title: typeConfig.name,
            type: typeKey,
            icon: typeConfig.icon,
            theme: resolvedTheme,
            tasks: tasksByType[typeKey],
        });
    }); return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-[#1E1E1E] via-[#2B2B2B] to-[#000000]' : 'light-theme-page'}`}>
            <div className="relative min-h-screen px-4 py-8">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-[#BC4B51] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-4"></div>
                    <div className="absolute w-96 h-96 bg-[#F4E285] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 -right-4"></div>
                    <div className="absolute w-96 h-96 bg-[#F4A259] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-20"></div>
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-8 px-4">
                        <div className="max-w-5xl">
                            <div className="mb-3 flex items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#F4E285]/45 bg-[#F4E285]/12 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#F4E285]">
                                    <i className="fas fa-grip-horizontal"></i>
                                    {t('boardKanban')}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setShowBoardInfo((prev) => !prev)}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#B6D1C7]/55 bg-[#B6D1C7]/15 text-[#EAF4E2] transition hover:bg-[#B6D1C7]/25"
                                    aria-label={t('boardInfo')}
                                    title={t('boardInfo')}
                                >
                                    <i className="fas fa-info text-xs"></i>
                                </button>
                            </div>
                            <div className="inline-block rounded-2xl border border-[#F4E285]/35 bg-black/15 px-5 py-3 shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
                                <h1 className="font-display-title text-5xl font-semibold mb-0 drop-shadow-lg bg-gradient-to-r from-[#F4E285] via-white to-[#F4A259] bg-clip-text text-transparent">
                                    {selectedProjectInfo ? `Board · ${selectedProjectInfo.name}` : 'Board'}
                                </h1>
                            </div>
                            {showBoardInfo && (
                                <div className="mt-3 rounded-xl border border-[#B6D1C7]/35 bg-[#1E1E1E]/70 light-theme-card p-3 text-sm text-[#E6E6E6] shadow-lg backdrop-blur">
                                    <p className="mb-2">
                                        Esta vista organiza las tareas del proyecto en columnas para que puedas ver el
                                        flujo de trabajo completo y actuar rápido sobre lo más importante.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Crea tareas en la columna adecuada según su tipo.</li>
                                        <li>Arrastra tarjetas entre columnas para reflejar cambios del trabajo.</li>
                                        <li>Edita una tarea para actualizar prioridad, fechas o detalles clave.</li>
                                        <li>Úsalo como vista diaria para detectar bloqueos y ordenar próximos pasos.</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Kanban Board */}
                    <div className="pb-8 px-4">
                        <div className="grid grid-cols-6 gap-4">
                            {columns.map((column) => (
                                <KanbanColumn
                                    key={column.id}
                                    title={column.title}
                                    tasks={column.tasks}
                                    theme={column.theme}
                                    columnType={column.type}
                                    onTaskDragStart={handleDragStart}
                                    onTaskDrop={handleDropOnColumn}
                                    onAddTask={() => {
                                        setSelectedTaskType(column.type);
                                        setShowAddTaskModal(true);
                                    }}
                                    onEditTask={(task) => {
                                        setSelectedTaskType(column.type);
                                        setSelectedTaskToEdit(task);
                                        setErrorForm(null);
                                        setShowEditTaskModal(true);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Modal */}
                    <AddTaskModal
                        isOpen={showAddTaskModal}
                        selectedTaskType={selectedTaskType}
                        onClose={() => {
                            setShowAddTaskModal(false);
                            setErrorForm(null);
                            setSelectedTaskType(null);
                        }}
                        onSubmit={async (data) => {
                            try {
                                setIsLoadingForm(true);
                                setErrorForm(null);
                                const createdTask = await createTask({
                                    ...data,
                                    ...(activeProjectId ? { projectId: Number(activeProjectId) } : {}),
                                });
                                if (createdTask) {
                                    const normalizedTask = createdTask.data ? createdTask.data : createdTask;
                                    setTasks((prevTasks) => [...prevTasks, normalizedTask]);
                                }
                                setShowAddTaskModal(false);
                                showSuccessToast(t('taskCreated'));
                            } catch (err) {
                                setErrorForm(err.message);
                                showErrorToast(t('error'));
                                console.error('Error al crear tarea:', err);
                            } finally {
                                setIsLoadingForm(false);
                            }
                        }}
                    />

                    {/* Edit Modal */}
                    <EditTaskModal
                        isOpen={showEditTaskModal}
                        selectedTaskType={selectedTaskType}
                        task={selectedTaskToEdit}
                        errorMessage={errorForm}
                        onClose={() => {
                            setShowEditTaskModal(false);
                            setSelectedTaskToEdit(null);
                            setSelectedTaskType(null);
                            setErrorForm(null);
                        }}
                        onSubmit={async (taskId, data) => {
                            try {
                                setIsLoadingForm(true);
                                setErrorForm(null);
                                setTasks((prevTasks) =>
                                    prevTasks.map((task) =>
                                        task.id === taskId
                                            ? { ...task, ...data, updated_at: new Date().toISOString() }
                                            : task
                                    )
                                );
                                setShowEditTaskModal(false);
                                setSelectedTaskToEdit(null);
                                setSelectedTaskType(null);
                                await updateTaskData(taskId, data);
                                showSuccessToast('Cambios guardados correctamente');
                            } catch (err) {
                                setErrorForm(err.message);
                                showErrorToast('No se pudo guardar la tarea');
                                console.error('Error al actualizar tarea:', err);
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
