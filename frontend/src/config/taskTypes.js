/**
 * Configuración de tipos de tareas
 * Define los tipos de tareas disponibles y sus colores
 */

export const TASK_TYPES = {
    feature: {
        id: 'feature',
        name: 'Feature',
        icon: 'fa-star',
        color: 'from-[#F4E285] to-[#F4A259]',
        bgColor: 'bg-[#F4E285]/18',
        textColor: 'text-[#F4E285]',
        borderColor: 'border-[#F4E285]'
    },
    bug: {
        id: 'bug',
        name: 'Bug',
        icon: 'fa-bug',
        color: 'from-[#BC4B51] to-[#9F3E43]',
        bgColor: 'bg-[#BC4B51]/15',
        textColor: 'text-[#F6D4D6]',
        borderColor: 'border-[#BC4B51]'
    },
    improvement: {
        id: 'improvement',
        name: 'Mejora',
        icon: 'fa-arrow-up',
        color: 'from-[#FFFFFF] to-[#F4E285]',
        bgColor: 'bg-[#F4A259]/15',
        textColor: 'text-[#FFF9E0]',
        borderColor: 'border-[#F4A259]'
    },
    documentation: {
        id: 'documentation',
        name: 'Documentación',
        icon: 'fa-file-alt',
        color: 'from-[#5B8E7D] to-[#1E1E1E]',
        bgColor: 'bg-[#5B8E7D]/15',
        textColor: 'text-[#B6D1C7]',
        borderColor: 'border-[#5B8E7D]'
    },
    testing: {
        id: 'testing',
        name: 'Testing',
        icon: 'fa-flask',
        color: 'bg-[#8CB369]',
        bgColor: 'bg-[#8CB369]/20',
        textColor: 'text-[#EAF4E2]',
        borderColor: 'border-[#8CB369]'
    },
    design: {
        id: 'design',
        name: 'Diseño',
        icon: 'fa-palette',
        color: 'from-[#F4A259] to-[#BC4B51]',
        bgColor: 'bg-[#BC4B51]/18',
        textColor: 'text-[#FFE6D8]',
        borderColor: 'border-[#BC4B51]'
    }
};

export const TASK_TYPE_SOFT_THEME = {
    default: {
        headerFrom: 'rgba(255, 255, 255, 0.62)',
        headerTo: 'rgba(244, 226, 133, 0.62)',
        surface: 'rgba(255, 255, 255, 0.08)',
        surfaceBorder: 'rgba(255, 255, 255, 0.34)',
        cardSurface: 'rgba(255, 255, 255, 0.10)',
        cardBorder: 'rgba(255, 255, 255, 0.44)',
        inputSurface: 'rgba(15, 23, 42, 0.48)',
    },
    feature: {
        headerFrom: 'rgba(244, 226, 133, 0.72)',
        headerTo: 'rgba(244, 162, 89, 0.72)',
        surface: 'rgba(244, 226, 133, 0.12)',
        surfaceBorder: 'rgba(244, 226, 133, 0.40)',
        cardSurface: 'rgba(244, 226, 133, 0.14)',
        cardBorder: 'rgba(244, 226, 133, 0.50)',
        inputSurface: 'rgba(15, 23, 42, 0.48)',
    },
    bug: {
        headerFrom: 'rgba(188, 75, 81, 0.72)',
        headerTo: 'rgba(159, 62, 67, 0.72)',
        surface: 'rgba(188, 75, 81, 0.10)',
        surfaceBorder: 'rgba(188, 75, 81, 0.38)',
        cardSurface: 'rgba(188, 75, 81, 0.12)',
        cardBorder: 'rgba(188, 75, 81, 0.48)',
        inputSurface: 'rgba(15, 23, 42, 0.48)',
    },
    improvement: {
        headerFrom: 'rgba(255, 255, 255, 0.70)',
        headerTo: 'rgba(244, 226, 133, 0.70)',
        surface: 'rgba(255, 255, 255, 0.10)',
        surfaceBorder: 'rgba(255, 255, 255, 0.34)',
        cardSurface: 'rgba(255, 255, 255, 0.12)',
        cardBorder: 'rgba(255, 255, 255, 0.46)',
        inputSurface: 'rgba(15, 23, 42, 0.48)',
    },
    documentation: {
        headerFrom: 'rgba(91, 142, 125, 0.72)',
        headerTo: 'rgba(30, 30, 30, 0.72)',
        surface: 'rgba(91, 142, 125, 0.10)',
        surfaceBorder: 'rgba(91, 142, 125, 0.34)',
        cardSurface: 'rgba(91, 142, 125, 0.12)',
        cardBorder: 'rgba(91, 142, 125, 0.44)',
        inputSurface: 'rgba(15, 23, 42, 0.48)',
    },
    testing: {
        headerFrom: 'rgba(140, 179, 105, 0.78)',
        headerTo: 'rgba(140, 179, 105, 0.78)',
        surface: 'rgba(140, 179, 105, 0.16)',
        surfaceBorder: 'rgba(140, 179, 105, 0.42)',
        cardSurface: 'rgba(140, 179, 105, 0.18)',
        cardBorder: 'rgba(140, 179, 105, 0.50)',
        inputSurface: 'rgba(15, 23, 42, 0.48)',
    },
    design: {
        headerFrom: 'rgba(244, 162, 89, 0.72)',
        headerTo: 'rgba(188, 75, 81, 0.72)',
        surface: 'rgba(188, 75, 81, 0.10)',
        surfaceBorder: 'rgba(188, 75, 81, 0.34)',
        cardSurface: 'rgba(188, 75, 81, 0.12)',
        cardBorder: 'rgba(188, 75, 81, 0.44)',
        inputSurface: 'rgba(15, 23, 42, 0.48)',
    },
};

export const getTaskTypeConfig = (typeId) => {
    return TASK_TYPES[typeId] || TASK_TYPES.feature;
};

export const getTaskTypeList = () => {
    return Object.values(TASK_TYPES);
};
