/**
 * Servicio OpenWeather
 * Consulta clima actual por ciudad
 */

const OPENWEATHER_BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5';
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const OPENWEATHER_CITY = import.meta.env.VITE_OPENWEATHER_CITY || 'Madrid,ES';

function getWeatherErrorMessage(status, apiMessage) {
    if (status === 401) {
        return 'La API key de OpenWeather aún no está activa o es inválida.';
    }

    if (status === 404) {
        return 'No se encontró la ciudad configurada para el clima.';
    }

    if (status === 429) {
        return 'Se alcanzó el límite de solicitudes de OpenWeather.';
    }

    return apiMessage || 'No se pudo obtener el clima en este momento.';
}

export async function getCurrentWeather(language = 'es') {
    if (!OPENWEATHER_API_KEY) {
        throw new Error('Falta VITE_OPENWEATHER_API_KEY en variables de entorno.');
    }

    const queryParams = new URLSearchParams({
        q: OPENWEATHER_CITY,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        lang: language,
    });

    const response = await fetch(`${OPENWEATHER_BASE_URL}/weather?${queryParams.toString()}`);
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message = getWeatherErrorMessage(response.status, payload?.message);
        throw new Error(message);
    }

    return {
        city: `${payload?.name || OPENWEATHER_CITY}${payload?.sys?.country ? `, ${payload.sys.country}` : ''}`,
        description: payload?.weather?.[0]?.description || 'Sin descripción',
        icon: payload?.weather?.[0]?.icon || '01d',
        temperature: Math.round(payload?.main?.temp ?? 0),
        feelsLike: Math.round(payload?.main?.feels_like ?? 0),
        humidity: payload?.main?.humidity ?? 0,
        windSpeed: payload?.wind?.speed ?? 0,
        fetchedAt: new Date().toISOString(),
    };
}

export function getWeatherIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
