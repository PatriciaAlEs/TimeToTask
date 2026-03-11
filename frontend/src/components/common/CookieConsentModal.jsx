import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTheme } from '@/theme/ThemeContext';

export default function CookieConsentModal({ onAcceptAll, onAcceptNecessary }) {
    const { t } = useLanguage();
    const { theme } = useTheme();

    return (
        <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className={`w-full max-w-2xl rounded-2xl border p-6 shadow-2xl ${theme === 'dark' ? 'border-white/20 bg-[#1E1E1E]/95 text-white' : 'light-theme-card'}`}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
                <h3 className="text-2xl font-semibold mb-3 light-theme-text">{t('cookiesInApp')}</h3>
                <p className="text-gray-200 light-theme-muted mb-4 leading-relaxed">
                    {t('cookiesModalText')}
                </p>

                <p className="text-sm text-gray-300 light-theme-muted mb-6">
                    {t('moreInfo')}{' '}
                    <Link to="/cookies" className="text-[#F4E285] hover:text-[#FFF6D0] underline" target="_self">
                        {t('cookiesPolicy')}
                    </Link>.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                        type="button"
                        onClick={onAcceptNecessary}
                        className="px-5 py-3 rounded-xl border border-white/30 text-white light-theme-text hover:bg-white/10 transition-colors"
                    >
                        {t('onlyNecessary')}
                    </button>
                    <button
                        type="button"
                        onClick={onAcceptAll}
                        className="px-5 py-3 rounded-xl bg-[#5B8E7D] text-[#EAF4E2] font-semibold hover:bg-[#6FA08E] transition-colors"
                    >
                        {t('acceptAll')}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
