/**
 * Componente Navbar
 * Barra de navegaci√≥n con usuario y opciones
 * Props:
 *   - user (object): Objeto usuario con name, email, avatar
 *   - onLogout (function): Callback al cerrar sesi√≥n
 *   - loading (boolean): Estado de carga
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user = null, onLogout = () => {}, loading = false }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await onLogout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-primary-800 via-primary-900 to-primary-800 backdrop-blur-lg border-b-2 border-orange-500/30 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Marca */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-xl font-black text-white hover:text-orange-300 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                <i className="fas fa-tasks text-white"></i>
              </div>
              TimeToTask
            </button>

            {/* Links de navegaci√≥n */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-200 hover:text-orange-300 transition font-semibold"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/tasks")}
                className="text-gray-200 hover:text-orange-300 transition font-semibold"
              >
                Tareas
              </button>
              <button
                onClick={() => navigate("/projects")}
                className="text-gray-200 hover:text-orange-300 transition font-semibold"
              >
                Proyectos
              </button>
            </div>
          </div>

          {/* Lado derecho - Usuario y men√∫ */}
          <div className="flex items-center gap-4">
            {/* Usuario info */}
            {user && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-gray-300">{user.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-white flex items-center justify-center font-black text-sm shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}

            {/* Men√∫ usuario */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
                title="Men√∫"
              >
                <svg
                  className="w-6 h-6 text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-primary-800 backdrop-blur-lg rounded-lg shadow-2xl z-10 border-2 border-orange-500/30">
                  {user && (
                    <>
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-white/10 transition first:rounded-t-lg text-gray-200 hover:text-orange-300 font-semibold"
                      >
                        Ì±§ Mi Perfil
                      </button>
                      <button
                        onClick={() => {
                          navigate("/settings");
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-white/10 transition text-gray-200 hover:text-orange-300 font-semibold"
                      >
                        ‚öôÔ∏è Configuraci√≥n
                      </button>
                      <button
                        onClick={() => {
                          navigate("/help");
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-white/10 transition text-gray-200 hover:text-orange-300 font-semibold"
                      >
                        ‚ùì Ayuda
                      </button>
                      <hr className="my-1 border-primary-700" />
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="w-full text-left px-4 py-3 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition last:rounded-b-lg disabled:opacity-50 font-semibold"
                  >
                    Ì∫™ {loading ? "Cerrando..." : "Cerrar sesi√≥n"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
