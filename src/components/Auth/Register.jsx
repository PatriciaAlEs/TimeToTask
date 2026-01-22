/**
 * Componente Register
 * Formulario de registro con validación y estado global
 * Props: None
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/store";
import { useLanguage } from "@/i18n/LanguageContext";
import api from "@/services/api";

export default function Register() {
  const navigate = useNavigate();
  const { setUser, setToken, setError: setGlobalError, setLoading, loading } =
    useGlobalContext();
  const { t, language, switchLanguage } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    // Validación
    if (!name || !email || !password || !confirmPassword) {
      setValidationError(t('completeAllFields'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError(t('invalidEmail'));
      return;
    }

    if (password.length < 6) {
      setValidationError(t('passwordMinLength'));
      return;
    }

    if (password !== confirmPassword) {
      setValidationError(t('passwordsNotMatch'));
      return;
    }

    setLoading(true);

    try {
      const result = await api.auth.register(email, password, name);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('createAccount')}
            </h1>
            <p className="text-gray-600">{t('joinPlatform')}</p>

            {/* Language Switcher */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => switchLanguage('es')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${language === 'es'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                ES
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${language === 'en'
                    ? 'bg-indigo-600 text-white'
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
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('fullName')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('enterName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('confirmPassword')}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('enterPassword')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? t('loading') : t('register')}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {t('haveAccount')}{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                {t('signInHere')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}