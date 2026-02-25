import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const THEME_KEY = 'appTheme';

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem(THEME_KEY);
        return saved === 'light' || saved === 'dark' ? saved : 'dark';
    });

    useEffect(() => {
        localStorage.setItem(THEME_KEY, theme);
        document.body.classList.toggle('light-theme', theme === 'light');
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return context;
}
