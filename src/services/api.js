/**
 * API Client Centralizado
 * Maneja todas las llamadas al backend con autenticación y errores
 *
 * Uso:
 * import api, { get, post, put, delete_ } from "@/services/api";
 * const data = await get("/tasks");
 * const user = await api.auth.login(email, password);
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Obtiene el token del localStorage
 */
function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.warn("No se pudo obtener el token:", error);
    return null;
  }
}

/**
 * Limpia la sesión (cuando token expira)
 */
function clearSession() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirigir a login (opcional, comentado)
    // window.location.href = "/login";
  } catch (error) {
    console.warn("No se pudo limpiar la sesión:", error);
  }
}

/**
 * Manejo centralizado de errores HTTP
 */
function handleError(error, response) {
  const status = response?.status || error.status;
  const message = response?.statusText || error.message || "Error desconocido";

  switch (status) {
    case 400:
      throw new Error(`Solicitud inválida: ${message}`);
    case 401:
      clearSession();
      throw new Error("Sesión expirada. Por favor, inicia sesión de nuevo.");
    case 403:
      throw new Error("No tienes permisos para esta acción.");
    case 404:
      throw new Error("Recurso no encontrado.");
    case 500:
      throw new Error("Error del servidor. Intenta más tarde.");
    case 503:
      throw new Error("Servidor no disponible. Intenta más tarde.");
    default:
      throw new Error(message || "Error en la solicitud");
  }
}

/**
 * Función centralizada para hacer llamadas API
 *
 * @param {string} endpoint - Ruta del endpoint (ej: "/tasks", "/auth/login")
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE, PATCH)
 * @param {object} body - Cuerpo de la solicitud (opcional)
 * @param {object} options - Opciones adicionales (headers, etc)
 * @returns {Promise} Promesa con los datos de respuesta
 */
export async function apiCall(endpoint, method = "GET", body = null, options = {}) {
  try {
    // Headers por defecto
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Agregar token si existe
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Configuración de la solicitud
    const config = {
      method,
      headers,
      ...options,
    };

    // Agregar body si existe
    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
      config.body = JSON.stringify(body);
    }

    // Log en desarrollo
    if (process.env.NODE_ENV === "development") {
      console.log(`[API] ${method} ${API_BASE_URL}${endpoint}`, body || "");
    }

    // Hacer la solicitud
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Parsear respuesta
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }

    // Manejar errores HTTP
    if (!response.ok) {
      handleError(data, response);
    }

    // Log de éxito en desarrollo
    if (process.env.NODE_ENV === "development") {
      console.log(`[API] ✅ ${response.status}`, data);
    }

    return data;
  } catch (error) {
    // Log de error en desarrollo
    if (process.env.NODE_ENV === "development") {
      console.error(`[API] ❌ Error:`, error.message);
    }
    throw error;
  }
}

/**
 * GET - Obtener datos
 *
 * @param {string} endpoint - Ruta del endpoint
 * @param {object} options - Opciones adicionales
 * @returns {Promise}
 *
 * @example
 * const tasks = await get("/tasks");
 * const task = await get("/tasks/1");
 */
export async function get(endpoint, options = {}) {
  return apiCall(endpoint, "GET", null, options);
}

/**
 * POST - Crear datos
 *
 * @param {string} endpoint - Ruta del endpoint
 * @param {object} body - Datos a enviar
 * @param {object} options - Opciones adicionales
 * @returns {Promise}
 *
 * @example
 * const newTask = await post("/tasks", { title: "Nueva", description: "..." });
 * const user = await post("/auth/login", { email, password });
 */
export async function post(endpoint, body = {}, options = {}) {
  return apiCall(endpoint, "POST", body, options);
}

/**
 * PUT - Actualizar datos completos
 *
 * @param {string} endpoint - Ruta del endpoint
 * @param {object} body - Datos a enviar
 * @param {object} options - Opciones adicionales
 * @returns {Promise}
 *
 * @example
 * const updated = await put("/tasks/1", { title: "Actualizado", status: "done" });
 */
export async function put(endpoint, body = {}, options = {}) {
  return apiCall(endpoint, "PUT", body, options);
}

/**
 * PATCH - Actualizar datos parciales
 *
 * @param {string} endpoint - Ruta del endpoint
 * @param {object} body - Datos a actualizar
 * @param {object} options - Opciones adicionales
 * @returns {Promise}
 *
 * @example
 * const updated = await patch("/tasks/1", { status: "done" });
 */
export async function patch(endpoint, body = {}, options = {}) {
  return apiCall(endpoint, "PATCH", body, options);
}

/**
 * DELETE - Eliminar datos
 *
 * @param {string} endpoint - Ruta del endpoint
 * @param {object} options - Opciones adicionales
 * @returns {Promise}
 *
 * @example
 * await delete_("/tasks/1");
 */
export async function delete_(endpoint, options = {}) {
  return apiCall(endpoint, "DELETE", null, options);
}

/**
 * Métodos de autenticación
 */
export const auth = {
  /**
   * Login
   * @param {string} email
   * @param {string} password
   * @returns {Promise} { user, token }
   */
  login: async (email, password) => {
    const response = await post("/auth/login", { email, password });
    const { token, user } = response.data || response;
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
    return { token, user };
  },

  /**
   * Register
   * @param {string} email
   * @param {string} password
   * @param {string} name
   * @returns {Promise} { user, token }
   */
  register: async (email, password, name) => {
    const response = await post("/auth/register", { email, password, username: name });
    const user = response.data || response;
    return { user };
  },

  /**
   * Logout
   */
  logout: async () => {
    clearSession();
    // Opcionalmente notificar al backend
    try {
      await post("/auth/logout", {});
    } catch (error) {
      console.warn("Error al logout en backend:", error);
    }
  },

  /**
   * Verificar token
   * @returns {Promise} { valid: boolean, user: object }
   */
  verify: async () => {
    return get("/auth/verify");
  },

  /**
   * Obtener usuario actual
   * @returns {Promise} { user: object }
   */
  getCurrentUser: async () => {
    return get("/auth/me");
  },

  /**
   * Cambiar contraseña
   * @param {string} oldPassword
   * @param {string} newPassword
   * @returns {Promise}
   */
  changePassword: async (oldPassword, newPassword) => {
    return put("/auth/change-password", { oldPassword, newPassword });
  },
};

/**
 * Métodos de tareas
 */
export const tasks = {
  /**
   * Obtener todas las tareas
   * @param {object} filters - Filtros opcionales
   * @returns {Promise} Array de tareas
   */
  getAll: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return get(`/tasks${query ? "?" + query : ""}`);
  },

  /**
   * Obtener tarea por ID
   * @param {string} id
   * @returns {Promise} Objeto tarea
   */
  getById: async (id) => {
    return get(`/tasks/${id}`);
  },

  /**
   * Crear tarea
   * @param {object} data - { title, description, projectId, status, priority, etc }
   * @returns {Promise} Tarea creada
   */
  create: async (data) => {
    return post("/tasks", data);
  },

  /**
   * Actualizar tarea
   * @param {string} id
   * @param {object} data - Campos a actualizar
   * @returns {Promise} Tarea actualizada
   */
  update: async (id, data) => {
    return put(`/tasks/${id}`, data);
  },

  /**
   * Eliminar tarea
   * @param {string} id
   * @returns {Promise}
   */
  delete: async (id) => {
    return delete_(`/tasks/${id}`);
  },

  /**
   * Cambiar estado de tarea
   * @param {string} id
   * @param {string} status - 'todo', 'in-progress', 'done', etc
   * @returns {Promise}
   */
  updateStatus: async (id, status) => {
    return patch(`/tasks/${id}`, { status });
  },

  /**
   * Asignar tarea a usuario
   * @param {string} id
   * @param {string} userId
   * @returns {Promise}
   */
  assignTo: async (id, userId) => {
    return patch(`/tasks/${id}`, { assignedTo: userId });
  },

  /**
   * Agregar comentario a tarea
   * @param {string} id
   * @param {string} comment
   * @returns {Promise}
   */
  addComment: async (id, comment) => {
    return post(`/tasks/${id}/comments`, { comment });
  },

  /**
   * Obtener tareas por proyecto
   * @param {string} projectId
   * @returns {Promise} Array de tareas
   */
  getByProject: async (projectId) => {
    return get(`/projects/${projectId}/tasks`);
  },
};

/**
 * Métodos de proyectos
 */
export const projects = {
  /**
   * Obtener todos los proyectos
   * @returns {Promise} Array de proyectos
   */
  getAll: async () => {
    return get("/projects");
  },

  /**
   * Obtener proyecto por ID
   * @param {string} id
   * @returns {Promise} Objeto proyecto
   */
  getById: async (id) => {
    return get(`/projects/${id}`);
  },

  /**
   * Crear proyecto
   * @param {object} data - { name, description, etc }
   * @returns {Promise} Proyecto creado
   */
  create: async (data) => {
    return post("/projects", data);
  },

  /**
   * Actualizar proyecto
   * @param {string} id
   * @param {object} data - Campos a actualizar
   * @returns {Promise} Proyecto actualizado
   */
  update: async (id, data) => {
    return put(`/projects/${id}`, data);
  },

  /**
   * Eliminar proyecto
   * @param {string} id
   * @returns {Promise}
   */
  delete: async (id) => {
    return delete_(`/projects/${id}`);
  },

  /**
   * Agregar miembro al proyecto
   * @param {string} projectId
   * @param {string} userId
   * @param {string} role - 'owner', 'admin', 'member'
   * @returns {Promise}
   */
  addMember: async (projectId, userId, role = "member") => {
    return post(`/projects/${projectId}/members`, { userId, role });
  },

  /**
   * Eliminar miembro del proyecto
   * @param {string} projectId
   * @param {string} userId
   * @returns {Promise}
   */
  removeMember: async (projectId, userId) => {
    return delete_(`/projects/${projectId}/members/${userId}`);
  },

  /**
   * Obtener miembros del proyecto
   * @param {string} projectId
   * @returns {Promise} Array de miembros
   */
  getMembers: async (projectId) => {
    return get(`/projects/${projectId}/members`);
  },
};

/**
 * Métodos de usuarios
 */
export const users = {
  /**
   * Obtener todos los usuarios
   * @returns {Promise} Array de usuarios
   */
  getAll: async () => {
    return get("/users");
  },

  /**
   * Obtener usuario por ID
   * @param {string} id
   * @returns {Promise} Objeto usuario
   */
  getById: async (id) => {
    return get(`/users/${id}`);
  },

  /**
   * Actualizar perfil de usuario
   * @param {string} id
   * @param {object} data - { name, email, avatar, etc }
   * @returns {Promise} Usuario actualizado
   */
  updateProfile: async (id, data) => {
    return put(`/users/${id}`, data);
  },

  /**
   * Obtener perfil actual
   * @returns {Promise} Objeto usuario
   */
  getProfile: async () => {
    return get("/users/profile/me");
  },

  /**
   * Buscar usuarios
   * @param {string} query
   * @returns {Promise} Array de usuarios
   */
  search: async (query) => {
    return get(`/users/search?q=${query}`);
  },
};

/**
 * Objeto global de API con todos los métodos
 */
export default {
  apiCall,
  get,
  post,
  put,
  patch,
  delete: delete_,
  auth,
  tasks,
  projects,
  users,
  getToken,
  clearSession,
};