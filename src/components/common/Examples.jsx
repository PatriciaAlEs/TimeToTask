/**
 * Ejemplos de clases Tailwind CSS configuradas
 * Este archivo muestra cómo usar los estilos base definidos en index.css
 */

export function ButtonExamples() {
    return (
        <div className="container mx-auto py-8">
            <h2>Ejemplos de Botones</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {/* Botones Primarios */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700">Primarios</h3>
                    <button className="btn btn-primary">Botón Primario</button>
                    <button className="btn btn-primary btn-small">Pequeño</button>
                    <button className="btn btn-primary btn-large">Grande</button>
                    <button className="btn btn-primary" disabled>Deshabilitado</button>
                </div>

                {/* Botones Secundarios */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700">Secundarios</h3>
                    <button className="btn btn-secondary">Botón Secundario</button>
                    <button className="btn btn-secondary btn-small">Pequeño</button>
                    <button className="btn btn-secondary btn-large">Grande</button>
                    <button className="btn btn-secondary" disabled>Deshabilitado</button>
                </div>

                {/* Botones de Peligro */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700">Peligro</h3>
                    <button className="btn btn-danger">Eliminar</button>
                    <button className="btn btn-danger btn-small">Pequeño</button>
                    <button className="btn btn-danger btn-large">Grande</button>
                    <button className="btn btn-danger" disabled>Deshabilitado</button>
                </div>

                {/* Botones de Éxito */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700">Éxito</h3>
                    <button className="btn btn-success">Guardar</button>
                    <button className="btn btn-success btn-small">Pequeño</button>
                    <button className="btn btn-success btn-large">Grande</button>
                    <button className="btn btn-success" disabled>Deshabilitado</button>
                </div>
            </div>
        </div>
    );
}

export function CardExamples() {
    return (
        <div className="container mx-auto py-8">
            <h2>Ejemplos de Tarjetas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="card">
                    <div className="card-header">
                        <h3>Tarjeta Básica</h3>
                    </div>
                    <div className="card-body">
                        <p className="text-gray-600">Este es el contenido de una tarjeta básica con estilos de Tailwind.</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3>Tarjeta con Acciones</h3>
                    </div>
                    <div className="card-body">
                        <p className="text-gray-600">Tarjeta que contiene acciones en el pie.</p>
                    </div>
                    <div className="card-footer">
                        <div className="flex gap-2">
                            <button className="btn btn-primary btn-small">Guardar</button>
                            <button className="btn btn-secondary btn-small">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FormExamples() {
    return (
        <div className="container mx-auto py-8">
            <h2>Ejemplos de Formularios</h2>

            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mt-6">
                <form className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Usuario
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Ingresa tu usuario"
                            className="input"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            className="input"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="input"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}

export function BadgeExamples() {
    return (
        <div className="container mx-auto py-8">
            <h2>Ejemplos de Badges</h2>

            <div className="flex flex-wrap gap-3 mt-6">
                <span className="badge badge-primary">Primario</span>
                <span className="badge badge-success">Éxito</span>
                <span className="badge badge-warning">Advertencia</span>
                <span className="badge badge-danger">Peligro</span>
            </div>
        </div>
    );
}

export function AlertExamples() {
    return (
        <div className="container mx-auto py-8">
            <h2>Ejemplos de Alertas</h2>

            <div className="space-y-4 mt-6">
                <div className="alert alert-info">
                    <p className="font-semibold">Información</p>
                    <p>Este es un mensaje informativo.</p>
                </div>

                <div className="alert alert-success">
                    <p className="font-semibold">Éxito</p>
                    <p>La operación se completó correctamente.</p>
                </div>

                <div className="alert alert-warning">
                    <p className="font-semibold">Advertencia</p>
                    <p>Por favor, revisa esta información importante.</p>
                </div>

                <div className="alert alert-danger">
                    <p className="font-semibold">Error</p>
                    <p>Ocurrió un error al procesar tu solicitud.</p>
                </div>
            </div>
        </div>
    );
}

export function BackgroundExamples() {
    return (
        <div className="container mx-auto py-8">
            <h2>Ejemplos de Fondos</h2>

            <div className="space-y-4 mt-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <p className="text-gray-700">Fondo Blanco (Default)</p>
                </div>

                <div className="bg-light rounded-lg p-6">
                    <p className="text-gray-700">Fondo Claro</p>
                </div>

                <div className="bg-gray-200 rounded-lg p-6">
                    <p className="text-gray-900">Fondo Gris</p>
                </div>

                <div className="bg-gradient-primary rounded-lg p-6 text-white">
                    <p>Fondo con Gradiente Primario</p>
                </div>

                <div className="bg-darker rounded-lg p-6 text-white">
                    <p>Fondo Oscuro</p>
                </div>
            </div>
        </div>
    );
}

export default function AllExamples() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto py-12">
                <h1 className="text-center text-4xl font-bold text-gray-900 mb-12">
                    Ejemplos de Tailwind CSS
                </h1>

                <div className="space-y-16">
                    <ButtonExamples />
                    <CardExamples />
                    <FormExamples />
                    <BadgeExamples />
                    <AlertExamples />
                    <BackgroundExamples />
                </div>
            </div>
        </div>
    );
}
