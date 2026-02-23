/**
 * EJEMPLO COMPLETO: Integración de Todos los Componentes
 * Cómo usar la arquitectura en una página real
 */

// ============================================================================
// 1. PÁGINA: Dashboard completo
// ============================================================================

import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import { useAppContext } from '../store';

// Componentes
import { PageContainer, Section, DashboardGrid } from '../components/common/Layout';
import { StatsCard, SimpleCard } from '../components/common/Cards';
import { ProjectList } from '../components/Projects/ProjectList';
import { Board } from '../components/Board/Board';
import { TaskModal } from '../components/Modals/TaskModal';
import { ButtonPrimary } from '../components/common/Buttons';

export default function DashboardPage() {
    // ========================================================================
    // 2. HOOKS: Obtener datos y lógica
    // ========================================================================

    const { projects, selectedProject, setSelectedProject } = useProjects();
    const { tasks, changeTaskStatus, createTask, updateTaskData, deleteTaskData } =
        useTasks(selectedProject);
    const { currentUser } = useAuth();
    const { loading, error } = useAppContext();

    // ========================================================================
    // 3. ESTADO LOCAL: Solo datos específicos de esta página
    // ========================================================================

    const [selectedTask, setSelectedTask] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // ========================================================================
    // 4. MANEJADORES DE EVENTOS
    // ========================================================================

    const handleTaskMove = async (taskId, newStatus) => {
        try {
            await changeTaskStatus(taskId, newStatus);
        } catch (err) {
            console.error('Error moviendo tarea:', err);
        }
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setModalOpen(true);
    };

    const handleSaveTask = async (taskData) => {
        try {
            if (selectedTask?.id) {
                await updateTaskData(selectedTask.id, taskData);
            } else {
                await createTask({
                    ...taskData,
                    projectId: selectedProject,
                });
            }
            setModalOpen(false);
            setSelectedTask(null);
        } catch (err) {
            console.error('Error guardando tarea:', err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('¿Eliminar esta tarea?')) {
            try {
                await deleteTaskData(taskId);
                setModalOpen(false);
                setSelectedTask(null);
            } catch (err) {
                console.error('Error eliminando tarea:', err);
            }
        }
    };

    // ========================================================================
    // 5. RENDERIZADO: Estructura de la página
    // ========================================================================

    return (
        <PageContainer
            title={`Bienvenido, ${currentUser?.name || 'Usuario'}`}
            subtitle="Gestiona tus proyectos y tareas"
            actions={<ButtonPrimary onClick={() => setModalOpen(true)}>+ Nueva Tarea</ButtonPrimary>}
        >
            {/* Error global */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
                    ⚠️ {error}
                </div>
            )}

            {/* Estadísticas */}
            <Section title="Resumen">
                <DashboardGrid columns={4}>
                    <StatsCard
                        title="Proyectos"
                        value={projects.length}
                        icon="📁"
                    />
                    <StatsCard
                        title="Tareas"
                        value={tasks.length}
                        icon="✅"
                    />
                    <StatsCard
                        title="En Progreso"
                        value={tasks.filter(t => t.status === 'inProgress').length}
                        icon="⏳"
                    />
                    <StatsCard
                        title="Completadas"
                        value={tasks.filter(t => t.status === 'done').length}
                        icon="✔️"
                    />
                </DashboardGrid>
            </Section>

            {/* Proyectos */}
            <Section title="Mis Proyectos" className="mt-12">
                {loading ? (
                    <p className="text-center text-gray-600">Cargando proyectos...</p>
                ) : (
                    <ProjectList
                        projects={projects}
                        onSelectProject={setSelectedProject}
                    />
                )}
            </Section>

            {/* Tablero Kanban */}
            {selectedProject && (
                <Section title="Tablero Kanban" className="mt-12">
                    {loading ? (
                        <p className="text-center text-gray-600">Cargando tareas...</p>
                    ) : (
                        <Board
                            tasks={tasks}
                            onTaskMove={handleTaskMove}
                            onTaskClick={handleTaskClick}
                        />
                    )}
                </Section>
            )}

            {/* Modal de Tarea */}
            <TaskModal
                task={selectedTask}
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedTask(null);
                }}
                onSave={handleSaveTask}
                onDelete={handleDeleteTask}
            />
        </PageContainer>
    );
}

// ============================================================================
// 6. EXPLICACIÓN DEL FLUJO
// ============================================================================

/*
FLUJO DE EJECUCIÓN:

1. RENDERIZADO INICIAL:
   - useProjects() hace fetch a Backend → /api/projects
   - useTasks() hace fetch a Backend → /api/projects/:id/tasks
   - Los datos van al Store (Context)
   - Los componentes se renderizan con los datos

2. USUARIO MUEVE UNA TAREA:
   - onClick en Card → handleTaskMove()
   - handleTaskMove() → changeTaskStatus()
   - changeTaskStatus() → taskService.updateStatus()
   - taskService hace PATCH a /api/tasks/:id/status
   - Backend actualiza base de datos
   - Hook actualiza Store
   - Board se re-renderiza con nuevo estado

3. USUARIO ABRE MODAL:
   - onClick → handleTaskClick() → setSelectedTask()
   - Modal abre con datos de la tarea
   - Usa estado local (selectedTask)

4. USUARIO GUARDA CAMBIOS:
   - onSubmit → handleSaveTask()
   - updateTaskData() → taskService.update()
   - Backend actualiza
   - Store actualiza
   - Lista se re-renderiza
   - Modal cierra

5. USUARIO BORRA TAREA:
   - handleDeleteTask() → deleteTaskData()
   - taskService.delete()
   - Backend borra
   - Store remueve de lista
   - UI se actualiza

VENTAJAS DE ESTA ARQUITECTURA:

✅ Separación de responsabilidades
   - Componentes solo renderizan
   - Hooks manejan lógica
   - Services comunican con API

✅ Reutilizable
   - useProjects() y useTasks() se usan en múltiples páginas
   - Los mismos servicios desde cualquier lugar
   - Componentes comunes en muchas vistas

✅ Mantenible
   - Cambiar lógica → editar hook
   - Cambiar API → editar service
   - Cambiar UI → editar componente

✅ Escalable
   - Agregar nueva feature sin tocar código existente
   - Mismo patrón para todos

✅ Testeable
   - Testear componentes sin hooks
   - Testear hooks en aislamiento
   - Mockear services fácilmente
*/

// ============================================================================
// 7. ESTRUCTURA PARA ESCALAR A MÁS FEATURES
// ============================================================================

/*
Para agregar COMENTARIOS a las tareas:

1. components/Comments/
   ├── CommentList.jsx      (renderiza lista)
   ├── CommentForm.jsx      (formulario nuevo)
   └── CommentCard.jsx      (comentario individual)

2. hooks/useComments.js
   - fetchComments(taskId)
   - createComment(taskId, text)
   - deleteComment(commentId)

3. services/commentService.js
   - getComments(taskId)
   - createComment(taskId, data)
   - deleteComment(commentId)

4. store/reducer.js
   - ADD_COMMENT, DELETE_COMMENT, SET_COMMENTS cases

5. pages/TaskDetail.jsx
   - <CommentList comments={comments} />
   - <CommentForm onSubmit={createComment} />

MISMO PATRÓN = CONSISTENCIA
*/

// ============================================================================
// 8. GUÍA RÁPIDA: ¿DÓNDE PONGO X?
// ============================================================================

/*
¿Dónde pongo el formulario de login?
→ components/Auth/LoginForm.jsx

¿Dónde pongo la lógica de autenticación?
→ hooks/useAuth.js

¿Dónde hago la llamada a /api/auth/login?
→ services/authService.js

¿Dónde guardo el usuario actual?
→ store/context.jsx (setUser action)

¿Dónde renderizo el formulario?
→ pages/Login.jsx

¿Dónde obtengo el usuario en cualquier componente?
→ const { currentUser } = useAppContext()

¿Dónde hago logout?
→ useAuth().logout()

¿Dónde valido el formulario?
→ En el componente (useState) O en el hook
*/

export { };
