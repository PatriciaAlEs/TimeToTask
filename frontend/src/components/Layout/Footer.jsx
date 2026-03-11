import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();
    const devPath = (section) => `/en-desarrollo?section=${encodeURIComponent(section)}`;

    return (
        <footer id="app-footer" className="light-theme-footer bg-gradient-to-r from-primary-800 via-primary-900 to-primary-800 border-t-4 border-accent-300/60 text-gray-200 py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 backdrop-blur-lg rounded-lg flex items-center justify-center">
                                <i className="fas fa-tasks text-xl text-white"></i>
                            </div>
                            <span className="font-display-title text-2xl font-bold text-white light-theme-text">{t('appName')}</span>
                        </div>
                        <p className="text-gray-300 light-theme-muted text-sm">
                            {t('footerTagline')}
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a
                                href="https://www.linkedin.com/in/patricia-alvarez-estevez/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-primary-400 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                                aria-label="LinkedIn"
                                title="LinkedIn"
                            >
                                <i className="fab fa-linkedin text-white text-sm"></i>
                            </a>
                            <a
                                href="https://github.com/PatriciaAlEs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-primary-400 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                                aria-label="GitHub"
                                title="GitHub"
                            >
                                <i className="fab fa-github text-white text-sm"></i>
                            </a>
                            <a
                                href="https://portfoliopatriciaales202603.onrender.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-primary-400 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                                aria-label="Portfolio"
                                title="Portfolio"
                            >
                                <i className="fas fa-globe text-white text-sm"></i>
                            </a>
                        </div>
                            <a
                                href="https://www.linkedin.com/in/patricia-alvarez-estevez/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-primary-400 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                                aria-label="LinkedIn"
                                title="LinkedIn"
                            >
                                <i className="fab fa-linkedin text-white text-sm"></i>
                            </a>
                            <a
                                href="https://github.com/PatriciaAlEs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-primary-400 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                                aria-label="GitHub"
                                title="GitHub"
                            >
                                <i className="fab fa-github text-white text-sm"></i>
                            </a>
                            <a
                                href="https://portfoliopatriciaales202603.onrender.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-primary-400 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                                aria-label="Portfolio"
                                title="Portfolio"
                            >
                                <i className="fas fa-globe text-white text-sm"></i>
                            </a>
>>>>>>> c9fd2e66dfec5f75eff00c983f8c336369a8c442
                        </div>
                    </div>

                    {/* Producto */}
                    <div>
                        <h3 className="font-bold mb-4 text-lg text-accent-300">{t('product')}</h3>
                        <ul className="space-y-2 text-gray-300 light-theme-muted">
                            <li>
                                <Link to={devPath(t('features'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('features')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('pricing'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('pricing')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('security'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('security')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('roadmap'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('roadmap')}
                                </Link>
                            </li>
                            <li>
<<<<<<< HEAD
                                <Link to="/" className="hover:text-accent-300 transition-colors text-sm">
=======
                                <Link to={devPath(t('updates'))} className="hover:text-accent-300 transition-colors text-sm">
>>>>>>> c9fd2e66dfec5f75eff00c983f8c336369a8c442
                                    {t('updates')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Soporte */}
                    <div>
                        <h3 className="font-bold mb-4 text-lg text-accent-300">{t('support')}</h3>
                        <ul className="space-y-2 text-gray-300 light-theme-muted">
                            <li>
<<<<<<< HEAD
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('helpCenter')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('documentation')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    API
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('contactUs')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('systemStatus')}
                                </a>
=======
                                <Link to={devPath(t('helpCenter'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('helpCenter')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('documentation'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('documentation')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('api'))} className="hover:text-accent-300 transition-colors text-sm">{t('api')}</Link>
                            </li>
                            <li>
                                <Link to={devPath(t('contactUs'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('contactUs')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('systemStatus'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('systemStatus')}
                                </Link>
>>>>>>> c9fd2e66dfec5f75eff00c983f8c336369a8c442
                            </li>
                        </ul>
                    </div>

                    {/* Empresa */}
                    <div>
                        <h3 className="font-bold mb-4 text-lg text-accent-300">{t('company')}</h3>
                        <ul className="space-y-2 text-gray-300 light-theme-muted">
                            <li>
<<<<<<< HEAD
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('aboutUs')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('blog')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('careers')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('press')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('partners')}
                                </a>
=======
                                <Link to={devPath(t('aboutUs'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('aboutUs')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('blog'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('blog')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('careers'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('careers')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('press'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('press')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('partners'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('partners')}
                                </Link>
>>>>>>> c9fd2e66dfec5f75eff00c983f8c336369a8c442
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold mb-4 text-lg text-accent-300">{t('legal')}</h3>
                        <ul className="space-y-2 text-gray-300 light-theme-muted">
                            <li>
<<<<<<< HEAD
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('privacy')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('termsOfService')}
                                </a>
=======
                                <Link to={devPath(t('privacy'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('privacy')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('termsOfService'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('termsOfService')}
                                </Link>
>>>>>>> c9fd2e66dfec5f75eff00c983f8c336369a8c442
                            </li>
                            <li>
                                <Link to="/cookies" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('cookiesPolicy')}
                                </Link>
                            </li>
                            <li>
<<<<<<< HEAD
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('compliance')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-300 transition-colors text-sm">
                                    {t('licenses')}
                                </a>
=======
                                <Link to={devPath(t('compliance'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('compliance')}
                                </Link>
                            </li>
                            <li>
                                <Link to={devPath(t('licenses'))} className="hover:text-accent-300 transition-colors text-sm">
                                    {t('licenses')}
                                </Link>
>>>>>>> c9fd2e66dfec5f75eff00c983f8c336369a8c442
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-primary-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 light-theme-muted text-sm">
                        &copy; {currentYear} {t('appName')}. {t('copyright').replace('© 2024 TimeToTask. ', '')}
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400 light-theme-muted">
<<<<<<< HEAD
                        <a href="#" className="hover:text-accent-300 transition-colors">{t('privacy')}</a>
                        <a href="#" className="hover:text-accent-300 transition-colors">{t('terms')}</a>
=======
                        <Link to={devPath(t('privacy'))} className="hover:text-accent-300 transition-colors">{t('privacy')}</Link>
                        <Link to={devPath(t('terms'))} className="hover:text-accent-300 transition-colors">{t('terms')}</Link>
>>>>>>> c9fd2e66dfec5f75eff00c983f8c336369a8c442
                        <Link to="/cookies" className="hover:text-accent-300 transition-colors">{t('cookiesPolicy')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;