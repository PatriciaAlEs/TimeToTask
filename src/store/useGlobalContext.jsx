/**
 * Hook personalizado para acceder al contexto global
 * Facilita el acceso al estado y acciones desde cualquier componente
 *
 * Uso:
 * const { user, setUser, tasks, addTask } = useGlobalContext();
 */

import { useContext } from "react";
import { GlobalContext } from "./provider.jsx";

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "useGlobalContext debe usarse dentro de <GlobalProvider>"
    );
  }

  return context;
}
