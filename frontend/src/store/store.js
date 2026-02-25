/**
 * Estado inicial global de la aplicación
 * Define la estructura y valores por defecto
 */

export const INITIAL_STATE = {
  // Autenticación
  user: null,
  token: null,
  isAuthenticated: false,

  // Datos
  tasks: [],
  projects: [],

  // UI
  loading: false,
  error: null,
};

/**
 * Estructura del estado:
 *
 * {
 *   user: { id, email, name, role },           // Usuario actual
 *   token: "jwt-token-string",                 // Token de autenticación
 *   isAuthenticated: true/false,               // Boolean de sesión
 *   tasks: [{ id, title, status, ... }],      // Lista de tareas
 *   projects: [{ id, name, ... }],            // Lista de proyectos
 *   loading: true/false,                       // Estado de carga global
 *   error: "error-message" || null,            // Mensaje de error global
 * }
 */
