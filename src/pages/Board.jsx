/**
 * Página: Board - Vista Kanban
 * Gestión de tareas por estados
 */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { KanbanColumn } from '../components/Board/KanbanColumn';
import { AddTaskModal } from '../components/Modals/AddTaskModal';
import { EditTaskModal } from '../components/Modals/EditTaskModal';
import { useGlobalContext } from '../store';
import { useTasks } from '../hooks/useTasks.jsx';
import { TASK_TYPES } from '../config/taskTypes';

export default function BoardPage() {
    const { projects } = useGlobalContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activeProjectId = queryParams.get('projectId');
    const { tasks, createTask, updateTaskData } = useTasks(activeProjectId);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [selectedTaskType, setSelectedTaskType] = useState(null);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [errorForm, setErrorForm] = useState(null);
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [selectedTaskToEdit, setSelectedTaskToEdit] = useState(null);

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

        try {
            await updateTaskData(taskToMove.id, { type: targetType });
        } catch (error) {
            console.error('Error updating task type:', error);
        }
    };

    // Agrupar tareas por tipo
    const tasksByType = {};
    Object.keys(TASK_TYPES).forEach((typeKey) => {
        tasksByType[typeKey] = tasks.filter((t) => t.type === typeKey || (!t.type && typeKey === 'feature'));
    });

    // Crear columnas dinámicas basadas en tipos de tareas
    const columns = Object.entries(TASK_TYPES).map(([typeKey, typeConfig]) => ({
        id: typeKey,
        title: typeConfig.name,
        type: typeKey,
        color: typeConfig.color,
        icon: typeConfig.icon,
        bgColor: typeConfig.bgColor,
        textColor: typeConfig.textColor,
        borderColor: typeConfig.borderColor,
        tasks: tasksByType[typeKey],
    })); return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
            <div className="relative min-h-screen px-4 py-8">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-4"></div>
                    <div className="absolute w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 -right-4"></div>
                    <div className="absolute w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-20"></div>
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-8 px-4">
                        <div>
                            <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">Panel de trabajo</h1>
                            <p className="text-lg text-gray-100 font-medium">
                                {selectedProjectInfo
                                    ? `Proyecto: ${selectedProjectInfo.name} · tareas organizadas por columnas`
                                    : 'Aquí organizamos y priorizamos tareas por tipo para visualizar el flujo de trabajo.'}
                            </p>
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
                                    color={column.color}
                                    bgColor={column.bgColor}
                                    textColor={column.textColor}
                                    borderColor={column.borderColor}
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
                                setShowAddTaskModal(false);
                            } catch (err) {
                                setErrorForm(err.message);
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
                                setShowEditTaskModal(false);
                                setSelectedTaskToEdit(null);
                                setSelectedTaskType(null);
                                await updateTaskData(taskId, data);
                            } catch (err) {
                                setErrorForm(err.message);
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
