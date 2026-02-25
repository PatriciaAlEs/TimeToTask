import React from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsentModal({ onAcceptAll, onAcceptNecessary }) {
    return (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
            <div className="w-full max-w-2xl rounded-2xl border border-white/20 bg-[#1E1E1E]/95 p-6 text-white shadow-2xl">
                <h3 className="text-2xl font-semibold mb-3">Cookies en TimeToTask</h3>
                <p className="text-gray-200 mb-4 leading-relaxed">
                    Usamos cookies para que la app funcione correctamente, recordar tus preferencias y mejorar la experiencia.
                    Puedes aceptar todas o continuar solo con las necesarias.
                </p>

                <p className="text-sm text-gray-300 mb-6">
                    Más información en nuestra{' '}
                    <Link to="/cookies" className="text-[#F4E285] hover:text-[#FFF6D0] underline" target="_self">
                        Política de Cookies
                    </Link>.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                        type="button"
                        onClick={onAcceptNecessary}
                        className="px-5 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition-colors"
                    >
                        Solo necesarias
                    </button>
                    <button
                        type="button"
                        onClick={onAcceptAll}
                        className="px-5 py-3 rounded-xl bg-[#5B8E7D] text-[#EAF4E2] font-semibold hover:bg-[#6FA08E] transition-colors"
                    >
                        Aceptar todas
                    </button>
                </div>
            </div>
        </div>
    );
}
