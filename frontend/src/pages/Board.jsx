/**
 * Página: Board - Vista Kanban
 * Gestión de tareas por estados
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
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
    const archivedPreviewLimit = 5;
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
    const [showArchivedTasks, setShowArchivedTasks] = useState(false);
    const [showAllFinalized, setShowAllFinalized] = useState(false);
    const [showAllDiscarded, setShowAllDiscarded] = useState(false);

    const isArchivedTask = (task) => {
        const normalizedStatus = String(task?.status || '').toLowerCase();
        return (
            task?.completed === true ||
            normalizedStatus === 'done' ||
            normalizedStatus === 'completed' ||
            normalizedStatus === 'discarded' ||
            normalizedStatus === 'cancelled'
        );
    };

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

    const handleCompleteTask = async (taskId) => {
        const targetTask = tasks.find((task) => task.id === taskId);
        if (!targetTask || targetTask.completed === true) {
            return;
        }

        const previousTasks = tasks;
        const nextTasks = tasks.map((task) =>
            task.id === taskId
                ? { ...task, completed: true, status: 'done', updated_at: new Date().toISOString() }
                : task
        );

        setTasks(nextTasks);

        try {
            await updateTaskData(taskId, { completed: true, status: 'done' });
            showSuccessToast('Tarea finalizada');
        } catch (error) {
            setTasks(previousTasks);
            showErrorToast('No se pudo finalizar la tarea');
            console.error('Error finishing task:', error);
        }
    };

    const handleDiscardTask = async (taskId) => {
        const targetTask = tasks.find((task) => task.id === taskId);
        if (!targetTask || String(targetTask.status).toLowerCase() === 'discarded') {
            return;
        }

        const previousTasks = tasks;
        const nextTasks = tasks.map((task) =>
            task.id === taskId
                ? { ...task, completed: false, status: 'discarded', updated_at: new Date().toISOString() }
                : task
        );

        setTasks(nextTasks);

        try {
            await updateTaskData(taskId, { completed: false, status: 'discarded' });
            showSuccessToast('Tarea descartada');
        } catch (error) {
            setTasks(previousTasks);
            showErrorToast('No se pudo descartar la tarea');
            console.error('Error discarding task:', error);
        }
    };

    const handleRestoreTask = async (taskId) => {
        const targetTask = tasks.find((task) => task.id === taskId);
        if (!targetTask) {
            return;
        }

        const previousTasks = tasks;
        const nextTasks = tasks.map((task) =>
            task.id === taskId
                ? { ...task, completed: false, status: 'backlog', updated_at: new Date().toISOString() }
                : task
        );

        setTasks(nextTasks);

        try {
            await updateTaskData(taskId, { completed: false, status: 'backlog' });
            showSuccessToast('Tarea reabierta');
        } catch (error) {
            setTasks(previousTasks);
            showErrorToast('No se pudo reabrir la tarea');
            console.error('Error restoring task:', error);
        }
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
    const activeTasks = tasks.filter((task) => !isArchivedTask(task));
    const archivedTasks = [...tasks]
        .filter((task) => isArchivedTask(task))
        .sort((a, b) => {
            const aDate = new Date(a.updated_at || a.updatedAt || a.created_at || a.createdAt || 0);
            const bDate = new Date(b.updated_at || b.updatedAt || b.created_at || b.createdAt || 0);
            return bDate - aDate;
        });
    const discardedTasks = archivedTasks.filter(
        (task) => String(task.status || '').toLowerCase() === 'discarded'
    );
    const finalizedTasks = archivedTasks.filter(
        (task) => String(task.status || '').toLowerCase() !== 'discarded'
    );

    const tasksByType = {};
    Object.keys(TASK_TYPES).forEach((typeKey) => {
        tasksByType[typeKey] = activeTasks.filter((t) => t.type === typeKey || (!t.type && typeKey === 'feature'));
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
                            <AnimatePresence>
                                {showBoardInfo && (
                                    <motion.div
                                        className="mt-3 rounded-xl border border-[#B6D1C7]/35 bg-[#1E1E1E]/70 light-theme-card p-3 text-sm text-[#E6E6E6] shadow-lg backdrop-blur"
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}
                                    >
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
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
                                    onCompleteTask={handleCompleteTask}
                                    onDiscardTask={handleDiscardTask}
                                />
                            ))}
                        </div>

                        <div className="mt-4 rounded-xl border border-white/15 bg-black/15 px-4 py-3">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-white/80">
                                    Archivadas: <span className="text-[#F4E285]">{archivedTasks.length}</span>
                                    <span className="ml-2 text-[#8CB369]">Finalizadas {finalizedTasks.length}</span>
                                    <span className="ml-2 text-[#F4A259]">Descartadas {discardedTasks.length}</span>
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setShowArchivedTasks((prev) => !prev)}
                                    className="rounded-md border border-white/20 px-3 py-1 text-xs font-semibold text-white/85 transition hover:bg-white/10"
                                >
                                    {showArchivedTasks ? 'Ocultar' : 'Ver'}
                                </button>
                            </div>

                            <AnimatePresence>
                                {showArchivedTasks && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}
                                        className="mt-3 space-y-2"
                                    >
                                        {archivedTasks.length > 0 ? (
                                            <>
                                                <div>
                                                    <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#8CB369]">Finalizadas</p>
                                                    <div className="space-y-2">
                                                        {(showAllFinalized ? finalizedTasks : finalizedTasks.slice(0, archivedPreviewLimit)).map((task) => (
                                                            <div
                                                                key={`archived-finalized-${task.id}`}
                                                                className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2"
                                                            >
                                                                <div className="min-w-0">
                                                                    <p className="line-clamp-1 text-sm font-semibold text-white/90">{task.title || task.name}</p>
                                                                    <p className="text-xs font-bold text-[#8CB369]">Finalizada</p>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRestoreTask(task.id)}
                                                                    className="ml-3 rounded-md border border-white/20 px-2 py-1 text-[11px] font-bold text-white transition hover:bg-white/10"
                                                                >
                                                                    Reabrir
                                                                </button>
                                                            </div>
                                                        ))}
                                                        {finalizedTasks.length === 0 && (
                                                            <p className="text-xs text-white/50">Sin tareas finalizadas.</p>
                                                        )}
                                                        {finalizedTasks.length > archivedPreviewLimit && (
                                                            <div className="flex justify-end">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowAllFinalized((prev) => !prev)}
                                                                    className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-bold text-white transition hover:bg-white/10"
                                                                >
                                                                    {showAllFinalized ? 'Ver menos' : 'Ver todas'}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="pt-2">
                                                    <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#F4A259]">Descartadas</p>
                                                    <div className="space-y-2">
                                                        {(showAllDiscarded ? discardedTasks : discardedTasks.slice(0, archivedPreviewLimit)).map((task) => (
                                                            <div
                                                                key={`archived-discarded-${task.id}`}
                                                                className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2"
                                                            >
                                                                <div className="min-w-0">
                                                                    <p className="line-clamp-1 text-sm font-semibold text-white/90">{task.title || task.name}</p>
                                                                    <p className="text-xs font-bold text-[#F4A259]">Descartada</p>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRestoreTask(task.id)}
                                                                    className="ml-3 rounded-md border border-white/20 px-2 py-1 text-[11px] font-bold text-white transition hover:bg-white/10"
                                                                >
                                                                    Reabrir
                                                                </button>
                                                            </div>
                                                        ))}
                                                        {discardedTasks.length === 0 && (
                                                            <p className="text-xs text-white/50">Sin tareas descartadas.</p>
                                                        )}
                                                        {discardedTasks.length > archivedPreviewLimit && (
                                                            <div className="flex justify-end">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowAllDiscarded((prev) => !prev)}
                                                                    className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-bold text-white transition hover:bg-white/10"
                                                                >
                                                                    {showAllDiscarded ? 'Ver menos' : 'Ver todas'}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-xs text-white/60">No hay tareas archivadas.</p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Modal */}
                    <AddTaskModal
                        isOpen={showAddTaskModal}
                        isSubmitting={isLoadingForm}
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
                        isSubmitting={isLoadingForm}
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
