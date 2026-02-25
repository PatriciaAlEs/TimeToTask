/**
 * Configuración y utilidades de color para proyectos
 */

export const DEFAULT_PROJECT_COLOR = 'from-[#8CB369] to-[#5B8E7D]';

export const PROJECT_COLOR_OPTIONS = [
    { name: 'Verde Oliva', value: 'from-[#8CB369] to-[#5B8E7D]', start: '#8CB369', end: '#5B8E7D' },
    { name: 'Amarillo', value: 'from-[#F4E285] to-[#DFC96F]', start: '#F4E285', end: '#DFC96F' },
    { name: 'Naranja', value: 'from-[#F4A259] to-[#DB8F4D]', start: '#F4A259', end: '#DB8F4D' },
    { name: 'Verde Azulado', value: 'from-[#5B8E7D] to-[#4F7C6D]', start: '#5B8E7D', end: '#4F7C6D' },
    { name: 'Rojo Terracota', value: 'from-[#BC4B51] to-[#9F3E43]', start: '#BC4B51', end: '#9F3E43' },
    { name: 'Blanco', value: 'from-[#FFFFFF] to-[#F3F3F3]', start: '#FFFFFF', end: '#F3F3F3' },
    { name: 'Negro', value: 'from-[#1E1E1E] to-[#000000]', start: '#1E1E1E', end: '#000000' },
    { name: 'Personalizado', value: 'custom' },
];

const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

const normalizeHex = (hex) => {
    if (!hex || typeof hex !== 'string') {
        return null;
    }

    const cleanHex = hex.trim();
    if (!HEX_COLOR_REGEX.test(cleanHex)) {
        return null;
    }

    if (cleanHex.length === 4) {
        const [_, r, g, b] = cleanHex;
        return `#${r}${r}${g}${g}${b}${b}`;
    }

    return cleanHex;
};

const hexToRgb = (hex) => {
    const normalized = normalizeHex(hex);
    if (!normalized) {
        return null;
    }

    const numericValue = parseInt(normalized.slice(1), 16);
    return {
        r: (numericValue >> 16) & 255,
        g: (numericValue >> 8) & 255,
        b: numericValue & 255,
    };
};

const rgba = (hex, alpha) => {
    const rgb = hexToRgb(hex);
    if (!rgb) {
        return `rgba(140, 179, 105, ${alpha})`;
    }

    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

export const resolveProjectColorVisual = (projectColor) => {
    const fallback = PROJECT_COLOR_OPTIONS[0];
    const rawColor = typeof projectColor === 'string' ? projectColor.trim() : '';

    const hex = normalizeHex(rawColor);
    if (hex) {
        return {
            isCustom: true,
            start: hex,
            end: hex,
            chipBackground: rgba(hex, 0.18),
            surface: rgba(hex, 0.14),
            border: rgba(hex, 0.44),
            cardBorder: rgba(hex, 0.55),
            text: rgba(hex, 0.96),
            value: hex,
        };
    }

    const selected = PROJECT_COLOR_OPTIONS.find((option) => option.value === rawColor) || fallback;

    return {
        isCustom: false,
        start: selected.start,
        end: selected.end,
        chipBackground: `linear-gradient(135deg, ${selected.start}, ${selected.end})`,
        surface: rgba(selected.start, 0.14),
        border: rgba(selected.start, 0.44),
        cardBorder: rgba(selected.start, 0.55),
        text: rgba(selected.start, 0.96),
        value: selected.value,
    };
};
