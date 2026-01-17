/**
 * Hook para manejar proyectos
 * Lógica centralizada de proyectos
 */

import { useEffect } from 'react';
import { useGlobalContext } from '../store';
import { projectService } from '../services/projectService';

export function useProjects() {
    const { projects, selectedProject, loading, error, setProjects, setLoading, setError, setSelectedProject } =
        useGlobalContext();

    // Cargar proyectos
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const data = await projectService.getAll();
            setProjects(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error cargando proyectos');
        } finally {
            setLoading(false);
        }
    };

    // Crear proyecto
    const createProject = async (projectData) => {
        setLoading(true);
        try {
            const newProject = await projectService.create(projectData);
            setProjects([...projects, newProject]);
            return newProject;
        } catch (err) {
            setError(err.response?.data?.message || 'Error creando proyecto');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Actualizar proyecto
    const updateProjectData = async (projectId, projectData) => {
        setLoading(true);
        try {
            const updated = await projectService.update(projectId, projectData);
            setProjects(
                projects.map((p) =>
                    p.id === projectId ? updated : p
                )
            );
            return updated;
        } catch (err) {
            setError(err.response?.data?.message || 'Error actualizando proyecto');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Eliminar proyecto
    const deleteProject = async (projectId) => {
        setLoading(true);
        try {
            await projectService.delete(projectId);
            setProjects(projects.filter((p) => p.id !== projectId));
            if (selectedProject === projectId) {
                setSelectedProject(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error eliminando proyecto');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Cargar inicial
    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        selectedProject,
        loading,
        error,
        fetchProjects,
        createProject,
        updateProjectData,
        deleteProject,
        setSelectedProject,
    };
}
