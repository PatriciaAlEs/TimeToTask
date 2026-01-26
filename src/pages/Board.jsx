/**
 * Página: Board - Vista Kanban
 * Gestión de tareas por estados
 */

import React, { useState, useEffect } from 'react';
import { KanbanColumn } from '../components/Board/KanbanColumn';
import { AddTaskModal } from '../components/Modals/AddTaskModal';
import { EditTaskModal } from '../components/Modals/EditTaskModal';
import { useGlobalContext } from '../store';
import { useTasks } from '../hooks/useTasks.jsx';
import { TASK_TYPES } from '../config/taskTypes';
import axios from 'axios';

export default function BoardPage() {
    const { projects, selectedProject } = useGlobalContext();
    const { createTask, updateTaskData } = useTasks(selectedProject);
    const [tasks, setTasks] = useState([]);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [selectedTaskType, setSelectedTaskType] = useState(null);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [errorForm, setErrorForm] = useState(null);
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [selectedTaskToEdit, setSelectedTaskToEdit] = useState(null);

    // Cargar todas las tareas (sin autenticación para desarrollo)
    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tasks/all');
                if (response.data && response.data.data) {
                    setTasks(response.data.data);
                }
            } catch (error) {
                console.error('Error loading tasks:', error);
            }
        };
        fetchAllTasks();
    }, []);

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
                            <p className="text-lg text-gray-100 font-medium">Aquí organizamos y priorizamos tareas por tipo para visualizar el flujo de trabajo.</p>
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
                                    onAddTask={() => {
                                        setSelectedTaskType(column.type);
                                        setShowAddTaskModal(true);
                                    }}
                                    onEditTask={(task) => {
                                        setSelectedTaskType(column.type);
                                        setSelectedTaskToEdit(task);
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

                    {/* Edit Modal */}
                    <EditTaskModal
                        isOpen={showEditTaskModal}
                        selectedTaskType={selectedTaskType}
                        task={selectedTaskToEdit}
                        onClose={() => {
                            setShowEditTaskModal(false);
                            setSelectedTaskToEdit(null);
                            setSelectedTaskType(null);
                        }}
                        onSubmit={async (taskId, data) => {
                            try {
                                setIsLoadingForm(true);
                                setErrorForm(null);
                                await updateTaskData(taskId, data);
                                setShowEditTaskModal(false);
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
