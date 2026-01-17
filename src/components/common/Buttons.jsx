/**
 * Componentes reutilizables de Botones
 * Incluye variantes, tamaños y estados
 */

// Botón primario
export function ButtonPrimary({ children, disabled = false, size = 'md', fullWidth = false, ...props }) {
    const sizeClass = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
    }[size] || '';

    const widthClass = fullWidth ? 'btn-block' : '';

    return (
        <button
            className={`btn btn-primary ${sizeClass} ${widthClass}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

// Botón secundario
export function ButtonSecondary({ children, disabled = false, size = 'md', fullWidth = false, ...props }) {
    const sizeClass = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
    }[size] || '';

    const widthClass = fullWidth ? 'btn-block' : '';

    return (
        <button
            className={`btn btn-secondary ${sizeClass} ${widthClass}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

// Botón peligroso
export function ButtonDanger({ children, disabled = false, size = 'md', fullWidth = false, ...props }) {
    const sizeClass = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
    }[size] || '';

    const widthClass = fullWidth ? 'btn-block' : '';

    return (
        <button
            className={`btn btn-danger ${sizeClass} ${widthClass}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

// Botón éxito
export function ButtonSuccess({ children, disabled = false, size = 'md', fullWidth = false, ...props }) {
    const sizeClass = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
    }[size] || '';

    const widthClass = fullWidth ? 'btn-block' : '';

    return (
        <button
            className={`btn btn-success ${sizeClass} ${widthClass}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

// Botón outline
export function ButtonOutline({ children, disabled = false, size = 'md', variant = 'primary', fullWidth = false, ...props }) {
    const variantClass = {
        primary: 'btn-outline-primary',
        secondary: 'btn-outline-secondary',
    }[variant] || 'btn-outline-primary';

    const sizeClass = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
    }[size] || '';

    const widthClass = fullWidth ? 'btn-block' : '';

    return (
        <button
            className={`btn ${variantClass} ${sizeClass} ${widthClass}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

// Botón genérico
export function Button({
    children,
    disabled = false,
    size = 'md',
    variant = 'primary',
    fullWidth = false,
    ...props
}) {
    const variantClass = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        success: 'btn-success',
        'outline-primary': 'btn-outline-primary',
        'outline-secondary': 'btn-outline-secondary',
    }[variant] || 'btn-primary';

    const sizeClass = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
    }[size] || '';

    const widthClass = fullWidth ? 'btn-block' : '';

    return (
        <button
            className={`btn ${variantClass} ${sizeClass} ${widthClass}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
