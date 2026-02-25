/**
 * Configuración de tipos de tareas
 * Define los tipos de tareas disponibles y sus colores
 */

export const TASK_TYPES = {
    feature: {
        id: 'feature',
        name: 'Feature',
        icon: 'fa-star',
        color: 'bg-cyan-500',
        bgColor: 'bg-cyan-500/15',
        textColor: 'text-cyan-300',
        borderColor: 'border-cyan-500'
    },
    bug: {
        id: 'bug',
        name: 'Bug',
        icon: 'fa-bug',
        color: 'bg-red-500',
        bgColor: 'bg-red-500/15',
        textColor: 'text-red-300',
        borderColor: 'border-red-500'
    },
    improvement: {
        id: 'improvement',
        name: 'Mejora',
        icon: 'fa-arrow-up',
        color: 'bg-orange-500',
        bgColor: 'bg-orange-500/15',
        textColor: 'text-orange-300',
        borderColor: 'border-orange-500'
    },
    documentation: {
        id: 'documentation',
        name: 'Documentación',
        icon: 'fa-file-alt',
        color: 'bg-purple-500',
        bgColor: 'bg-purple-500/15',
        textColor: 'text-purple-300',
        borderColor: 'border-purple-500'
    },
    testing: {
        id: 'testing',
        name: 'Testing',
        icon: 'fa-flask',
        color: 'bg-green-400',
        bgColor: 'bg-green-400/18',
        textColor: 'text-green-200',
        borderColor: 'border-green-400'
    },
    design: {
        id: 'design',
        name: 'Diseño',
        icon: 'fa-palette',
        color: 'bg-pink-500',
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
