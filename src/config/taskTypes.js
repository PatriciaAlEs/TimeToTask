/**
 * Configuración de tipos de tareas
 * Define los tipos de tareas disponibles y sus colores
 */

export const TASK_TYPES = {
    feature: {
        id: 'feature',
        name: 'Feature',
        icon: 'fa-star',
        color: 'from-[oklch(62.3%_0.214_259.815)] to-[oklch(57%_0.19_259.815)]',
        bgColor: 'bg-[oklch(25%_0.12_259.815)]',
        textColor: 'text-[oklch(62.3%_0.214_259.815)]',
        borderColor: 'border-[oklch(55%_0.18_259.815)]'
    },
    bug: {
        id: 'bug',
        name: 'Bug',
        icon: 'fa-bug',
        color: 'from-[oklch(39.6%_0.141_25.723)] to-[oklch(35%_0.12_25.723)]',
        bgColor: 'bg-[oklch(20%_0.1_25.723)]',
        textColor: 'text-[oklch(39.6%_0.141_25.723)]',
        borderColor: 'border-[oklch(50%_0.15_25.723)]'
    },
    improvement: {
        id: 'improvement',
        name: 'Mejora',
        icon: 'fa-arrow-up',
        color: 'from-[oklch(55.5%_0.163_48.998)] to-[oklch(50%_0.14_48.998)]',
        bgColor: 'bg-[oklch(25%_0.1_48.998)]',
        textColor: 'text-[oklch(55.5%_0.163_48.998)]',
        borderColor: 'border-[oklch(60%_0.16_48.998)]'
    },
    documentation: {
        id: 'documentation',
        name: 'Documentación',
        icon: 'fa-file-alt',
        color: 'from-[oklch(70.2%_0.183_293.541)] to-[oklch(65%_0.16_293.541)]',
        bgColor: 'bg-[oklch(30%_0.12_293.541)]',
        textColor: 'text-[oklch(70.2%_0.183_293.541)]',
        borderColor: 'border-[oklch(65%_0.17_293.541)]'
    },
    testing: {
        id: 'testing',
        name: 'Testing',
        icon: 'fa-flask',
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-900/70',
        textColor: 'text-green-300',
        borderColor: 'border-green-500'
    },
    design: {
        id: 'design',
        name: 'Diseño',
        icon: 'fa-palette',
        color: 'from-[oklch(71.2%_0.194_13.428)] to-[oklch(65%_0.17_13.428)]',
        bgColor: 'bg-[oklch(30%_0.12_13.428)]',
        textColor: 'text-[oklch(71.2%_0.194_13.428)]',
        borderColor: 'border-[oklch(65%_0.18_13.428)]'
    }
};

export const getTaskTypeConfig = (typeId) => {
    return TASK_TYPES[typeId] || TASK_TYPES.feature;
};

export const getTaskTypeList = () => {
    return Object.values(TASK_TYPES);
};
