/**
 * Reducer - Función pura que maneja todas las transiciones de estado
 * Recibe estado actual + acción, retorna nuevo estado
 */

import { ACTIONS } from "./actions.js";
import { INITIAL_STATE } from "./store.js";

export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // ==================== AUTENTICACIÓN ====================
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        error: null,
      };

    case ACTIONS.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: !!action.payload,
        error: null,
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        tasks: [],
        projects: [],
        error: null,
      };

    // ==================== TAREAS ====================
    case ACTIONS.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };

    case ACTIONS.ADD_TASK:
      return {
        ...state,
    tasks: [...state.tasks, action.payload],
      error: null,
    };

  case ACTIONS.UPDATE_TASK: {
    const { id, updates } = action.payload;
    return {
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
      error: null,
    };
  }

  case ACTIONS.DELETE_TASK:
    return {
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.payload),
      error: null,
    };

  case ACTIONS.CLEAR_TASKS:
    return {
      ...state,
      tasks: [],
    };

  // ==================== PROYECTOS ====================
  case ACTIONS.SET_PROJECTS:
    return {
      ...state,
      projects: action.payload,
      loading: false,
      error: null,
    };

  case ACTIONS.ADD_PROJECT:
    return {
      ...state,
      projects: [...state.projects, action.payload],
      error: null,
    };

  case ACTIONS.UPDATE_PROJECT: {
    const { id, updates } = action.payload;
    return {
      ...state,
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      ),
      error: null,
    };
  }

  case ACTIONS.DELETE_PROJECT:
    return {
      ...state,
      projects: state.projects.filter(
        (project) => project.id !== action.payload
      ),
      error: null,
    };

  case ACTIONS.CLEAR_PROJECTS:
    return {
      ...state,
      projects: [],
    };

  // ==================== UI ====================
  case ACTIONS.SET_LOADING:
    return {
      ...state,
      loading: action.payload,
    };

  case ACTIONS.SET_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };

  case ACTIONS.CLEAR_ERROR:
    return {
      ...state,
      error: null,
    };

  // ==================== DEFAULT ====================
  default:
    return state;
  }
};
