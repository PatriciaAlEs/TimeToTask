import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTheme } from '@/theme/ThemeContext';

export default function InDevelopmentPage() {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const section = params.get('section');

    return (
        <div className={`w-full py-10 px-4 ${theme === 'dark' ? 'bg-gradient-to-br from-[#1E1E1E] via-[#2B2B2B] to-[#000000]' : 'bg-[#DDE3EA]'}`}>
            <div className={`max-w-3xl mx-auto rounded-2xl border p-8 md:p-10 shadow-2xl ${theme === 'dark' ? 'border-white/20 bg-white/10 text-white' : 'light-theme-card'}`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E79A56] flex items-center justify-center shadow-lg">
                        <i className="fas fa-tools text-white"></i>
                    </div>
                    <h1 className={`text-3xl md:text-4xl font-display-title font-bold ${theme === 'dark' ? 'text-[#F6E7D2]' : 'light-theme-text'}`}>
                        {t('inDevelopmentTitle')}
                    </h1>
                </div>

                <p className="text-base md:text-lg light-theme-muted mb-4">
                    {t('inDevelopmentDescription')}
                </p>

                {section && (
                    <p className="text-sm md:text-base mb-8 light-theme-muted">
                        {t('requestedSection')}: <span className="font-semibold light-theme-text">{section}</span>
                    </p>
                )}

                <div className="flex flex-wrap gap-3">
                    <Link
                        to="/"
                        className="px-5 py-3 rounded-xl bg-[#E79A56] text-white font-semibold hover:bg-[#D98943] transition"
                    >
                        {t('backHome')}
                    </Link>
                    <Link
                        to="/dashboard"
                        className="px-5 py-3 rounded-xl bg-[#E79A56] text-white font-semibold hover:bg-[#D98943] transition"
                    >
                        {t('continueDashboard')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
