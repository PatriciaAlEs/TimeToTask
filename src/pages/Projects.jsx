/**
 * Ejemplo: Página de proyectos completa
 * Muestra cómo usar todos los componentes juntos
 */

import React, { useState } from 'react';
import { PageContainer, Section, DashboardGrid, Row } from '../components/common/Layout';
import { ProjectList } from '../components/Projects/ProjectList';
import { ButtonPrimary } from '../components/common/Buttons';
import { useProjects } from '../hooks/useProjects.jsx';
import { Card, CardBody } from '../components/common/Cards';
import { Input } from '../components/common/Inputs';

export default function ProjectsPage() {
    const {
        projects,
        loading,
        error,
        createProject,
        deleteProject,
        setSelectedProject,
    } = useProjects();

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProject(formData);
            setFormData({ name: '', description: '' });
            setShowForm(false);
        } catch (err) {
            console.error('Error creando proyecto:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <PageContainer
            title="Proyectos"
            subtitle="Gestiona todos tus proyectos"
            actions={
                <ButtonPrimary onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancelar' : '+ Nuevo Proyecto'}
                </ButtonPrimary>
            }
        >
            {/* Formulario nuevo proyecto */}
            {showForm && (
                <Section title="Crear Nuevo Proyecto" className="mb-8">
                    <Card>
                        <CardBody>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    id="name"
                                    label="Nombre del Proyecto"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Mi Proyecto"
                                    required
                                />
                                <Input
                                    id="description"
                                    label="Descripción"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Descripción breve"
                                />
                                <Row gap={3}>
                                    <ButtonPrimary type="submit" disabled={loading}>
                                        {loading ? 'Creando...' : 'Crear Proyecto'}
                                    </ButtonPrimary>
                                </Row>
                            </form>
                        </CardBody>
                    </Card>
                </Section>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {/* Lista de proyectos */}
            <Section title="Tus Proyectos">
                <ProjectList
                    projects={projects}
                    loading={loading}
                    onSelectProject={setSelectedProject}
                />
            </Section>
        </PageContainer>
    );
}
