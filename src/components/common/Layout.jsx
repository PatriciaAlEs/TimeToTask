/**
 * Componentes de Layout para Dashboard
 * Estructura principal, sidebar, grillas, etc.
 */

// Layout Principal
export function DashboardLayout({ children, className = '' }) {
    return (
        <div className={`container py-8 ${className}`}>
            {children}
        </div>
    );
}

// Header del Dashboard
export function DashboardHeader({
    title,
    subtitle,
    action,
    className = '',
    ...props
}) {
    return (
        <div className={`dashboard-header ${className}`} {...props}>
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h1 className="dashboard-header-title">{title}</h1>
                    {subtitle && <p className="dashboard-header-subtitle">{subtitle}</p>}
                </div>
                {action && <div>{action}</div>}
            </div>
        </div>
    );
}

// Sidebar Layout
export function SidebarLayout({ sidebar, children, className = '' }) {
    return (
        <div className={`sidebar-layout ${className}`}>
            <aside className="sidebar">{sidebar}</aside>
            <main className="sidebar-content">{children}</main>
        </div>
    );
}

// Grid responsivo
export function DashboardGrid({ children, columns = 3, className = '' }) {
    const gridClass =
        columns === 2
            ? 'dashboard-grid-2'
            : columns === 4
                ? 'dashboard-grid-4'
                : 'dashboard-grid';

    return <div className={`${gridClass} ${className}`}>{children}</div>;
}

// Section
export function Section({ title, subtitle, children, className = '', action, ...props }) {
    return (
        <section className={`section ${className}`} {...props}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    {title && <h2 className="section-title">{title}</h2>}
                    {subtitle && <p className="section-subtitle">{subtitle}</p>}
                </div>
                {action && <div>{action}</div>}
            </div>
            {children}
        </section>
    );
}

// Content Wrapper
export function ContentWrapper({ children, maxWidth = '7xl', className = '' }) {
    const widthClass = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
    }[maxWidth] || 'max-w-7xl';

    return (
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${widthClass} ${className}`}>
            {children}
        </div>
    );
}

// Row (para flexbox rápido)
export function Row({ children, gap = 4, align = 'center', justify = 'start', className = '', ...props }) {
    const gapClass = {
        0: 'gap-0',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        6: 'gap-6',
        8: 'gap-8',
    }[gap] || 'gap-4';

    const alignClass = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        baseline: 'items-baseline',
        stretch: 'items-stretch',
    }[align] || 'items-center';

    const justifyClass = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
    }[justify] || 'justify-start';

    return (
        <div className={`flex ${gapClass} ${alignClass} ${justifyClass} ${className}`} {...props}>
            {children}
        </div>
    );
}

// Column (para flexbox vertical)
export function Column({ children, gap = 4, align = 'start', className = '', ...props }) {
    const gapClass = {
        0: 'gap-0',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        6: 'gap-6',
        8: 'gap-8',
    }[gap] || 'gap-4';

    const alignClass = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
    }[align] || 'items-start';

    return (
        <div className={`flex flex-col ${gapClass} ${alignClass} ${className}`} {...props}>
            {children}
        </div>
    );
}

// Divider
export function Divider({ size = 'md', className = '' }) {
    const sizeClass = size === 'sm' ? 'divider-sm' : 'divider';
    return <div className={`${sizeClass} ${className}`}></div>;
}

// Spacer
export function Spacer({ size = 4, className = '' }) {
    const sizeClass = {
        1: 'my-1',
        2: 'my-2',
        3: 'my-3',
        4: 'my-4',
        6: 'my-6',
        8: 'my-8',
        12: 'my-12',
        16: 'my-16',
    }[size] || 'my-4';

    return <div className={`${sizeClass} ${className}`}></div>;
}

// Breadcrumb
export function Breadcrumb({ items, className = '', ...props }) {
    return (
        <nav className={`flex items-center gap-2 text-sm ${className}`} {...props}>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index > 0 && <span className="text-gray-400">/</span>}
                    {item.href ? (
                        <a href={item.href} className="text-primary-600 hover:text-primary-700">
                            {item.label}
                        </a>
                    ) : (
                        <span className="text-gray-600">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}

// Page Container
export function PageContainer({
    title,
    subtitle,
    children,
    header,
    actions,
    className = '',
    ...props
}) {
    return (
        <div className={`min-h-screen bg-gray-50 ${className}`} {...props}>
            {header ? (
                header
            ) : (
                <div className="bg-white border-b border-gray-200">
                    <ContentWrapper>
                        <DashboardHeader
                            title={title}
                            subtitle={subtitle}
                            action={actions}
                        />
                    </ContentWrapper>
                </div>
            )}
            <ContentWrapper className="py-8">
                {children}
            </ContentWrapper>
        </div>
    );
}

// Flex utilities
export function FlexCenter({ children, className = '', ...props }) {
    return (
        <div className={`flex items-center justify-center ${className}`} {...props}>
            {children}
        </div>
    );
}

export function FlexBetween({ children, className = '', ...props }) {
    return (
        <div className={`flex items-center justify-between ${className}`} {...props}>
            {children}
        </div>
    );
}
