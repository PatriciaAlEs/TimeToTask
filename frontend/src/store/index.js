/**
 * Exporta todo el sistema de estado global
 * Punto de entrada única para el store
 */

// Provider
export { GlobalProvider } from "./provider.jsx";

// Hook
export { useGlobalContext } from "./useGlobalContext.jsx";

// Store inicial
export { INITIAL_STATE } from "./store.js";

// Actions
export { ACTIONS } from "./actions.js";
export * as ActionCreators from "./actions.js";

// Reducer
export { appReducer } from "./reducer.js";
