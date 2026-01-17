/**
 * Componente ProtectedRoute
 * HOC que protege rutas que requieren autenticación
 * Props:
 *   - children (ReactNode): Componentes a renderizar si está autenticado
 */

import { Navigate } from "react-router-dom";
import { useGlobalContext } from "@/store";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useGlobalContext();

  // Si está cargando, mostrar pantalla de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizar contenido
  return children;
}