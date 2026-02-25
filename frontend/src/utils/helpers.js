/**
 * Utilities y Helpers para el Gestor de Tareas
 */

// Modo desarrollo
const IS_DEV = import.meta.env.MODE === 'development';

/**
 * Log en consola (solo en desarrollo)
 */
export function logDebug(label, data) {
  if (IS_DEV) {
    console.log(`[${label}]`, data);
  }
}

/**
 * Log de errores
 */
export function logError(label, error) {
  console.error(`[ERROR - ${label}]`, error);
}

/**
 * Log de API calls
 */
export function logApiCall(method, endpoint, data = null) {
  if (IS_DEV) {
    console.log(`📡 [API] ${method.toUpperCase()} ${endpoint}`, data || '');
  }
}

/**
 * Formatear fecha para tareas
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

/**
 * Formatear prioridad de tarea
 */
export function getPriorityLabel(priority) {
  const priorities = {
    low: '🟢 Baja',
    medium: '🟡 Media',
    high: '🔴 Alta',
  };
  return priorities[priority] || priority;
}

/**
 * Formatear estado de tarea
 */
export function getStatusLabel(status) {
  const statuses = {
    todo: '📋 Por Hacer',
    'in-progress': '⏳ En Progreso',
    done: '✅ Completado',
  };
  return statuses[status] || status;
}

/**
 * Validar email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validar contraseña (mínimo 6 caracteres)
 */
export function isValidPassword(password) {
  return password && password.length >= 6;
}

/**
 * Limpar espacios en blanco
 */
export function trimInputs(obj) {
  const trimmed = {};
  Object.keys(obj).forEach((key) => {
    trimmed[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
  });
  return trimmed;
}

/**
 * Verificar si está autenticado
 */
export function isAuthenticated() {
  try {
    const token = localStorage.getItem('token');
    return !!token && token.length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Obtener información del usuario del localStorage
 */
export function getCurrentUser() {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    logError('getCurrentUser', error);
    return null;
  }
}

/**
 * Capitalizar primera letra
 */
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Verificar si objeto está vacío
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Debounce para optimizar búsquedas
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};