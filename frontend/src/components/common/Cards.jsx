/**
 * Componentes de Cards/Tarjetas
 * Incluye variantes y composición flexible
 */

// Card base
export function Card({
    children,
    variant = 'default',
    padding = 'default',
    className = '',
    ...props
}) {
    const variantClass = {
        default: '',
        primary: 'card-primary',
        danger: 'card-danger',
        success: 'card-success',
        warning: 'card-warning',
    }[variant] || '';

    const paddingClass = {
        compact: 'card-compact',
        default: 'card-default',
        spacious: 'card-spacious',
    }[padding] || 'card-default';

    return (
        <div className={`card ${paddingClass} ${variantClass} ${className}`} {...props}>
            {children}
        </div>
    );
}

// Card Header
export function CardHeader({ children, className = '', ...props }) {
    return (
        <div className={`card-header ${className}`} {...props}>
            {children}
        </div>
    );
}

// Card Title
export function CardTitle({ children, className = '', ...props }) {
    return (
        <h3 className={`card-header-title ${className}`} {...props}>
            {children}
        </h3>
    );
}

// Card Body
export function CardBody({ children, className = '', ...props }) {
    return (
        <div className={`card-body ${className}`} {...props}>
            {children}
        </div>
    );
}

// Card Footer
export function CardFooter({ children, className = '', align = 'between', ...props }) {
    const alignClass =
        align === 'between' ? 'justify-between' : align === 'end' ? 'justify-end' : 'justify-start';

    return (
        <div className={`card-footer ${alignClass} ${className}`} {...props}>
            {children}
        </div>
    );
}

// Simple Card (composición rápida)
export function SimpleCard({
    title,
    children,
    footer,
    variant = 'default',
    className = '',
    ...props
}) {
    const variantClass = {
        default: '',
        primary: 'card-primary',
        danger: 'card-danger',
        success: 'card-success',
        warning: 'card-warning',
    }[variant] || '';

    return (
        <Card className={`${variantClass} ${className}`} {...props}>
            {title && (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            )}
            <CardBody>{children}</CardBody>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
}

// Stats Card (para mostrar estadísticas)
export function StatsCard({
    title,
    value,
    icon,
    trend,
    trendUp = true,
    className = '',
    ...props
}) {
    return (
        <Card padding="compact" className={`${className}`} {...props}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                        {trend && (
                            <span className={`text-xs font-semibold ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                                {trendUp ? '↑' : '↓'} {trend}
                            </span>
                        )}
                    </div>
                </div>
                {icon && <div className="text-3xl text-primary-600">{icon}</div>}
            </div>
        </Card>
    );
}

// Loading Card
export function LoadingCard({ padding = 'default', className = '' }) {
    return (
        <Card padding={padding} className={`${className} opacity-50`}>
            <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
        </Card>
    );
}

// Error Card
export function ErrorCard({ title = 'Error', message, action, className = '' }) {
    return (
        <Card variant="danger" className={`${className}`}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardBody>
                <p className="text-red-900 mb-4">{message}</p>
                {action && <div>{action}</div>}
            </CardBody>
        </Card>
    );
}

// Success Card
export function SuccessCard({ title = 'Éxito', message, action, className = '' }) {
    return (
        <Card variant="success" className={`${className}`}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardBody>
                <p className="text-green-900 mb-4">{message}</p>
                {action && <div>{action}</div>}
            </CardBody>
        </Card>
    );
}
