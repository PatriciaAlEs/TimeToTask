/**
 * Página: Dashboard
 * Vista general con estadísticas y resumen
 */

import React from 'react';
import { PageContainer, Section, DashboardGrid } from '../components/common/Layout';
import { StatsCard } from '../components/common/Cards';
import { useGlobalContext } from '../store';
import { ProjectList } from '../components/Projects/ProjectList';
import { useTasks } from '../hooks/useTasks.jsx';

export default function DashboardPage() {
    const { projects, selectedProject, loading } = useGlobalContext();
    const { tasks } = useTasks(selectedProject);

    const stats = {
        totalProjects: projects.length,
        totalTasks: tasks.length,
        completedTasks: tasks.filter((t) => t.status === 'done').length,
        inProgressTasks: tasks.filter((t) => t.status === 'inProgress').length,
    };

    return (
        <PageContainer
            title="Dashboard"
            subtitle="Resumen de tus proyectos y tareas"
        >
            {/* Estadísticas */}
            <Section title="Resumen">
                <DashboardGrid columns={4}>
                    <StatsCard title="Proyectos" value={stats.totalProjects} icon="📁" />
                    <StatsCard title="Tareas Totales" value={stats.totalTasks} icon="✅" />
                    <StatsCard title="En Progreso" value={stats.inProgressTasks} icon="⏳" />
                    <StatsCard title="Completadas" value={stats.completedTasks} icon="✔️" />
                </DashboardGrid>
            </Section>

            {/* Proyectos */}
            <Section title="Mis Proyectos" className="mt-8">
                <ProjectList projects={projects} loading={loading} />
            </Section>
        </PageContainer>
    );
}