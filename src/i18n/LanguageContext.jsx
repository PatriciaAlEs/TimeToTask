/**
 * Language Context
 * Gestiona el idioma de la aplicación
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
import { translations } from './translations';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Detectar idioma del navegador o usar español por defecto
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('appLanguage');
        if (saved && ['es', 'en'].includes(saved)) {
            return saved;
        }
        // Detectar idioma del navegador
        const browserLang = navigator.language.split('-')[0];
        return ['es', 'en'].includes(browserLang) ? browserLang : 'es';
    });

    // Guardar en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem('appLanguage', language);
    }, [language]);

    // Función para cambiar idioma
    const switchLanguage = useCallback((lang) => {
        if (['es', 'en'].includes(lang)) {
            setLanguage(lang);
        }
    }, []);

    // Función para traducir
    const t = useCallback((key, defaultValue = key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return defaultValue;
            }
        }

        return value || defaultValue;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook para usar el contexto
export const useLanguage = () => {
    const context = React.useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
