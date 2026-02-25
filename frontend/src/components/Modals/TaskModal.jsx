/**
 * Componente: Modal de tarea
 * Permite ver y editar detalles de una tarea
 */

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '../common/Cards';
import { Button, ButtonPrimary, ButtonSecondary, ButtonDanger } from '../common/Buttons';
import { Input, Textarea, Select } from '../common/Inputs';
import { Row } from '../common/Layout';

export function TaskModal({ task, isOpen, onClose, onSave, onDelete }) {
    const [formData, setFormData] = useState(task || {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{task?.id ? 'Editar Tarea' : 'Nueva Tarea'}</CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardBody className="space-y-4">
                        <Input
                            id="key"
                            label="Clave"
                            value={formData.key || ''}
                            disabled
                        />

                        <Input
                            id="title"
                            label="Título"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleChange}
                            required
                        />

                        <Textarea
                            id="description"
                            label="Descripción"
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            rows={4}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                id="priority"
                                label="Prioridad"
                                name="priority"
                                value={formData.priority || 'medium'}
                                onChange={handleChange}
                                options={[
                                    { value: 'low', label: 'Baja' },
                                    { value: 'medium', label: 'Media' },
                                    { value: 'high', label: 'Alta' },
                                ]}
                            />

                            <Select
                                id="status"
                                label="Estado"
                                name="status"
                                value={formData.status || 'todo'}
                                onChange={handleChange}
                                options={[
                                    { value: 'todo', label: 'Por Hacer' },
                                    { value: 'inProgress', label: 'En Progreso' },
                                    { value: 'review', label: 'En Revisión' },
                                    { value: 'done', label: 'Completado' },
                                ]}
                            />
                        </div>
                    </CardBody>

                    <CardFooter justify="between">
                        <Row gap={2}>
                            <ButtonPrimary type="submit" size="sm">
                                Guardar
                            </ButtonPrimary>
                            <ButtonSecondary type="button" size="sm" onClick={onClose}>
                                Cancelar
                            </ButtonSecondary>
                        </Row>
                        {task?.id && (
                            <ButtonDanger type="button" size="sm" onClick={() => onDelete(task.id)}>
                                Eliminar
                            </ButtonDanger>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
