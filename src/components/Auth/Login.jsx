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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('welcome')}
            </h1>
            <p className="text-gray-600">{t('signIn')}</p>

            {/* Language Switcher */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => switchLanguage('es')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${language === 'es'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                ES
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {validationError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{validationError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('enterEmail')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('enterPassword')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? t('loading') : t('signIn')}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {t('dontHaveAccount')}{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:text-blue-700 font-medium"
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