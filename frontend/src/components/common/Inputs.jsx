/**
 * Componentes de Inputs y Formularios
 * Incluye inputs, textareas, labels con validación
 */

import React from 'react';

// Input base
export function Input({
    id,
    label,
    error,
    success,
    warning,
    helpText,
    required = false,
    disabled = false,
    type = 'text',
    ...props
}) {
    const inputClass = `input ${error ? 'input-error' : ''} ${success ? 'input-success' : ''} ${warning ? 'input-warning' : ''}`;

    return (
        <div className="form-group">
            {label && (
                <label htmlFor={id} className={required ? 'label label-required' : 'label'}>
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={inputClass}
                disabled={disabled}
                {...props}
            />
            {helpText && (
                <span
                    className={`help-text ${error
                            ? 'help-text-error'
                            : success
                                ? 'help-text-success'
                                : warning
                                    ? 'help-text-warning'
                                    : ''
                        }`}
                >
                    {helpText}
                </span>
            )}
        </div>
    );
}

// Textarea
export function Textarea({
    id,
    label,
    error,
    success,
    helpText,
    required = false,
    disabled = false,
    rows = 4,
    ...props
}) {
    const textareaClass = `textarea ${error ? 'input-error' : ''} ${success ? 'input-success' : ''}`;

    return (
        <div className="form-group">
            {label && (
                <label htmlFor={id} className={required ? 'label label-required' : 'label'}>
                    {label}
                </label>
            )}
            <textarea
                id={id}
                className={textareaClass}
                disabled={disabled}
                rows={rows}
                {...props}
            />
            {helpText && (
                <span className={`help-text ${error ? 'help-text-error' : success ? 'help-text-success' : ''}`}>
                    {helpText}
                </span>
            )}
        </div>
    );
}

// Select
export function Select({
    id,
    label,
    options,
    error,
    success,
    helpText,
    required = false,
    disabled = false,
    ...props
}) {
    const selectClass = `select ${error ? 'input-error' : ''} ${success ? 'input-success' : ''}`;

    return (
        <div className="form-group">
            {label && (
                <label htmlFor={id} className={required ? 'label label-required' : 'label'}>
                    {label}
                </label>
            )}
            <select id={id} className={selectClass} disabled={disabled} {...props}>
                <option value="">Selecciona una opción</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {helpText && (
                <span className={`help-text ${error ? 'help-text-error' : success ? 'help-text-success' : ''}`}>
                    {helpText}
                </span>
            )}
        </div>
    );
}

// Checkbox
export function Checkbox({
    id,
    label,
    error,
    helpText,
    disabled = false,
    ...props
}) {
    return (
        <div className="form-group-sm">
            <div className="flex items-center gap-2">
                <input
                    id={id}
                    type="checkbox"
                    className={`checkbox ${error ? 'border-red-500' : ''}`}
                    disabled={disabled}
                    {...props}
                />
                {label && (
                    <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
                        {label}
                    </label>
                )}
            </div>
            {helpText && <span className={`help-text ${error ? 'help-text-error' : ''}`}>{helpText}</span>}
        </div>
    );
}

// Radio
export function Radio({
    id,
    label,
    error,
    helpText,
    disabled = false,
    ...props
}) {
    return (
        <div className="form-group-sm">
            <div className="flex items-center gap-2">
                <input
                    id={id}
                    type="radio"
                    className={`radio ${error ? 'border-red-500' : ''}`}
                    disabled={disabled}
                    {...props}
                />
                {label && (
                    <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
                        {label}
                    </label>
                )}
            </div>
            {helpText && <span className={`help-text ${error ? 'help-text-error' : ''}`}>{helpText}</span>}
        </div>
    );
}

// FormGroup
export function FormGroup({ children, compact = false }) {
    return <div className={compact ? 'form-group-sm' : 'form-group'}>{children}</div>;
}

// Form
export function Form({ children, onSubmit, ...props }) {
    return (
        <form onSubmit={onSubmit} {...props}>
            {children}
        </form>
    );
}
