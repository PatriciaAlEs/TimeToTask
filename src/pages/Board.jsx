/**
 * Página: Board - Vista Kanban
 * Gestión de tareas por estados
 */

import React, { useState, useEffect } from 'react';
import { KanbanColumn } from '../components/Board/KanbanColumn';
import { AddTaskModal } from '../components/Modals/AddTaskModal';
import { useGlobalContext } from '../store';
import { useTasks } from '../hooks/useTasks.jsx';
import { TASK_TYPES } from '../config/taskTypes';
import axios from 'axios';

export default function BoardPage() {
    const { projects, selectedProject } = useGlobalContext();
    const { addTask } = useTasks(selectedProject);
    const [tasks, setTasks] = useState([]);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [errorForm, setErrorForm] = useState(null);

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
                    <div className="mb-8 px-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">Tablero</h1>
                            <p className="text-xl text-gray-100 font-semibold">Organiza tus tareas por tipo</p>
                        </div>
                        <button
                            onClick={() => setShowAddTaskModal(true)}
                            className="px-6 py-3 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <i className="fas fa-plus"></i>
                            Nueva Tarea
                        </button>
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
                                    icon={column.icon}
                                    bgColor={column.bgColor}
                                    textColor={column.textColor}
                                    borderColor={column.borderColor}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Modal */}
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
                                if (addTask) {
                                    await addTask(data);
                                }
                                setShowAddTaskModal(false);
                            } catch (err) {
                                setErrorForm(err.message);
                                console.error('Error al crear tarea:', err);
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
