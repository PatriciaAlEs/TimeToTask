/**
 * Componente: Lista de proyectos
 * Muestra todos los proyectos disponibles
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, SimpleCard } from '../common/Cards';
import { ButtonPrimary } from '../common/Buttons';
import { Row } from '../common/Layout';

export function ProjectList({ projects, loading, onSelectProject }) {
    if (loading) {
        return <div className="text-center py-8">Cargando proyectos...</div>;
    }

    if (projects.length === 0) {
        return (
            <Card className="text-center py-12">
                <p className="text-gray-600 mb-4">No hay proyectos aún</p>
                <ButtonPrimary href="/projects/new">Crear Proyecto</ButtonPrimary>
            </Card>
        );
    }

    return (
        <div className="dashboard-grid">
            {projects.map((project) => (
                <SimpleCard
                    key={project.id}
                    title={project.name}
                    footer={
                        <Row justify="between" className="w-full">
                            <Link to={`/projects/${project.id}`} className="text-primary-600 hover:text-primary-700">
                                Ver detalles
                            </Link>
                            <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded">
                                {project.taskCount} tareas
                            </span>
                        </Row>
                    }
                >
                    <p className="text-gray-600 text-sm">{project.description}</p>
                    <div className="mt-2 text-xs text-gray-500">
                        Líder: {project.owner?.name}
                    </div>
                </SimpleCard>
            ))}
        </div>
    );
}
