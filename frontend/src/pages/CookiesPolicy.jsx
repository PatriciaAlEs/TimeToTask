import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTheme } from '@/theme/ThemeContext';

export default function CookiesPolicy() {
    const { t } = useLanguage();
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen py-12 px-4 ${theme === 'dark' ? 'bg-gradient-to-br from-[#1E1E1E] via-[#2B2B2B] to-[#000000]' : 'light-theme-page'}`}>
            <div className={`max-w-4xl mx-auto rounded-2xl border p-8 md:p-10 backdrop-blur-lg ${theme === 'dark' ? 'border-white/20 bg-white/10 text-white' : 'light-theme-card'}`}>
                <h1 className="text-4xl font-semibold mb-4 light-theme-text">{t('cookiesTitle')}</h1>
                <p className="text-gray-200 light-theme-muted mb-8">
                    {t('cookiesIntro')}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 light-theme-text">1. {t('cookiesWhat')}</h2>
                    <p className="text-gray-200 light-theme-muted leading-relaxed">
                        {t('cookiesWhatText')}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 light-theme-text">2. {t('cookiesUsed')}</h2>
                    <ul className="list-disc pl-6 text-gray-200 light-theme-muted space-y-2">
                        <li><span className="font-semibold text-white light-theme-text">{t('cookiesNecessary')}:</span> {t('cookiesNecessaryText')}</li>
                        <li><span className="font-semibold text-white light-theme-text">{t('cookiesPrefs')}:</span> {t('cookiesPrefsText')}</li>
                        <li><span className="font-semibold text-white light-theme-text">{t('cookiesAnalytics')}:</span> {t('cookiesAnalyticsText')}</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 light-theme-text">3. {t('cookiesConsent')}</h2>
                    <p className="text-gray-200 light-theme-muted leading-relaxed">
                        {t('cookiesConsentText')}
                    </p>
                </section>

                <section className="mb-2">
                    <h2 className="text-2xl font-semibold mb-3 light-theme-text">4. {t('contact')}</h2>
                    <p className="text-gray-200 light-theme-muted leading-relaxed">
                        {t('cookiesContactText')}
                    </p>
                </section>
            </div>
        </div>
    );
}
