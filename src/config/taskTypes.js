/**
 * Configuración de tipos de tareas
 * Define los tipos de tareas disponibles y sus colores
 */

export const TASK_TYPES = {
    feature: {
        id: 'feature',
        name: 'Feature',
        icon: 'fa-star',
        color: 'from-cyan-500 to-cyan-600 from-[oklch(62.3%_0.214_259.815)] to-[oklch(57%_0.19_259.815)]',
        bgColor: 'bg-cyan-500/15',
        textColor: 'text-cyan-300',
        borderColor: 'border-cyan-500'
    },
    bug: {
        id: 'bug',
        name: 'Bug',
        icon: 'fa-bug',
        color: 'from-red-500 to-red-600 from-[oklch(39.6%_0.141_25.723)] to-[oklch(35%_0.12_25.723)]',
        bgColor: 'bg-red-500/15',
        textColor: 'text-red-300',
        borderColor: 'border-red-500'
    },
    improvement: {
        id: 'improvement',
        name: 'Mejora',
        icon: 'fa-arrow-up',
        color: 'from-orange-500 to-orange-600 from-[oklch(55.5%_0.163_48.998)] to-[oklch(50%_0.14_48.998)]',
        bgColor: 'bg-orange-500/15',
        textColor: 'text-orange-300',
        borderColor: 'border-orange-500'
    },
    documentation: {
        id: 'documentation',
        name: 'Documentación',
        icon: 'fa-file-alt',
        color: 'from-purple-500 to-purple-600 from-[oklch(70.2%_0.183_293.541)] to-[oklch(65%_0.16_293.541)]',
        bgColor: 'bg-purple-500/15',
        textColor: 'text-purple-300',
        borderColor: 'border-purple-500'
    },
    testing: {
        id: 'testing',
        name: 'Testing',
        icon: 'fa-flask',
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-500/15',
        textColor: 'text-green-300',
        borderColor: 'border-green-500'
    },
    design: {
        id: 'design',
        name: 'Diseño',
        icon: 'fa-palette',
        color: 'from-pink-500 to-pink-600 from-[oklch(71.2%_0.194_13.428)] to-[oklch(65%_0.17_13.428)]',
        bgColor: 'bg-pink-500/15',
        textColor: 'text-pink-300',
        borderColor: 'border-pink-500'
    }
};

export const getTaskTypeConfig = (typeId) => {
    return TASK_TYPES[typeId] || TASK_TYPES.feature;
};

export const getTaskTypeList = () => {
    return Object.values(TASK_TYPES);
};
