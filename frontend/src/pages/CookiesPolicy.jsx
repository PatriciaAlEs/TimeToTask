import React from 'react';

export default function CookiesPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1E1E1E] via-[#2B2B2B] to-[#000000] py-12 px-4">
            <div className="max-w-4xl mx-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-8 md:p-10 text-white">
                <h1 className="text-4xl font-semibold mb-4">Política de Cookies</h1>
                <p className="text-gray-200 mb-8">
                    Esta política explica qué cookies usamos en TimeToTask, para qué sirven y cómo puedes gestionarlas.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">1. ¿Qué son las cookies?</h2>
                    <p className="text-gray-200 leading-relaxed">
                        Las cookies son pequeños archivos de texto que se guardan en tu dispositivo cuando visitas un sitio web.
                        Ayudan a recordar preferencias, mantener sesiones y mejorar la experiencia de navegación.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">2. Cookies que usamos</h2>
                    <ul className="list-disc pl-6 text-gray-200 space-y-2">
                        <li><span className="font-semibold text-white">Necesarias:</span> permiten el funcionamiento básico de la aplicación.</li>
                        <li><span className="font-semibold text-white">Preferencias:</span> recuerdan ajustes de idioma y opciones de usuario.</li>
                        <li><span className="font-semibold text-white">Analíticas (opcional):</span> nos ayudan a entender el uso para mejorar la plataforma.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">3. Gestión del consentimiento</h2>
                    <p className="text-gray-200 leading-relaxed">
                        Al entrar por primera vez, te mostramos un modal para aceptar o limitar cookies.
                        Puedes cambiar tu preferencia borrando el almacenamiento local del navegador.
                    </p>
                </section>

                <section className="mb-2">
                    <h2 className="text-2xl font-semibold mb-3">4. Contacto</h2>
                    <p className="text-gray-200 leading-relaxed">
                        Si tienes dudas sobre esta política, puedes escribirnos a info@timetotask.com.
                    </p>
                </section>
            </div>
        </div>
    );
}
