/**
 * Tipos de acciones disponibles en el reducer
 */

export const ACTIONS = {
  // Autenticación
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKEN",
  LOGOUT: "LOGOUT",

  // Tareas
  SET_TASKS: "SET_TASKS",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  CLEAR_TASKS: "CLEAR_TASKS",

  // Proyectos
  SET_PROJECTS: "SET_PROJECTS",
  ADD_PROJECT: "ADD_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  CLEAR_PROJECTS: "CLEAR_PROJECTS",

  // UI
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

/**
 * Action Creators - Facilitan la creación de acciones
 */

export const setUser = (user) => ({
  type: ACTIONS.SET_USER,
  payload: user,
});

export const setToken = (token) => ({
  type: ACTIONS.SET_TOKEN,
  payload: token,
});

export const logout = () => ({
  type: ACTIONS.LOGOUT,
});

export const setTasks = (tasks) => ({
  type: ACTIONS.SET_TASKS,
  payload: tasks,
});

export const addTask = (task) => ({
  type: ACTIONS.ADD_TASK,
  payload: task,
});

export const updateTask = (id, updates) => ({
  type: ACTIONS.UPDATE_TASK,
  payload: { id, updates },
});

export const deleteTask = (id) => ({
  type: ACTIONS.DELETE_TASK,
  payload: id,
});

export const clearTasks = () => ({
  type: ACTIONS.CLEAR_TASKS,
});

export const setProjects = (projects) => ({
  type: ACTIONS.SET_PROJECTS,
  payload: projects,
});

export const addProject = (project) => ({
  type: ACTIONS.ADD_PROJECT,
  payload: project,
});

export const updateProject = (id, updates) => ({
  type: ACTIONS.UPDATE_PROJECT,
  payload: { id, updates },
});

export const deleteProject = (id) => ({
  type: ACTIONS.DELETE_PROJECT,
  payload: id,
});

export const clearProjects = () => ({
  type: ACTIONS.CLEAR_PROJECTS,
});

export const setLoading = (loading) => ({
  type: ACTIONS.SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: ACTIONS.SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: ACTIONS.CLEAR_ERROR,
});
