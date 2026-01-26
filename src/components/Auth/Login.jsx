/**
 * Componente Login
 * Formulario de inicio de sesión con validación y estado global
 * Props: None
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/store";
import { useLanguage } from "@/i18n/LanguageContext";
import api from "@/services/api";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setToken, setError: setGlobalError, setLoading, loading } =
    useGlobalContext();
  const { t, language, switchLanguage } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    // Validación
    if (!email || !password) {
      setValidationError(t('completeAllFields'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError(t('invalidEmail'));
      return;
    }

    setLoading(true);

    try {
      const result = await api.auth.login(email, password);
      setUser(result.user);
      setToken(result.token);
      navigate("/dashboard");
    } catch (err) {
      setGlobalError(err.message);
      setValidationError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center px-4 py-12 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-4"></div>
        <div className="absolute w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 -right-4"></div>
        <div className="absolute w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-20"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-primary-400/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-primary-400/50">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-3xl mb-4 transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-xl">
              <i className="fas fa-tasks text-4xl text-white drop-shadow-lg"></i>
            </div>
            <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
              {t('welcome')}
            </h1>
            <p className="text-gray-100 font-semibold">{t('signIn')}</p>

            {/* Language Switcher */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => switchLanguage('es')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${language === 'es'
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
              >
                ES
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${language === 'en'
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {validationError && (
            <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-lg border border-red-400 rounded-xl">
              <p className="text-white text-sm font-semibold">{validationError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('enterEmail')}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('enterPassword')}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/50 transform hover:scale-105"
            >
              {loading ? t('loading') : t('signIn')}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-100 text-sm">
              {t('dontHaveAccount')}{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-orange-300 hover:text-orange-200 font-bold underline"
              >
                {t('signUpHere')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}