import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from './store';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CookieConsentModal from './components/common/CookieConsentModal';
import FooterHintArrow from './components/common/FooterHintArrow';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Board from './pages/Board';
import CookiesPolicy from './pages/CookiesPolicy';
import InDevelopmentPage from './pages/InDevelopment';

const COOKIE_CONSENT_KEY = 'cookie_consent_status';

const ScrollToTop = () => {
    const { pathname, search } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [pathname, search]);

    return null;
};

const AppLayout = ({ showCookieModal, saveConsent, theme }) => {
    const location = useLocation();
    const isInDevelopmentRoute = location.pathname === '/en-desarrollo';

    return (
        <>
            <ScrollToTop />
            <Header />
            <main
                className={`flex-grow ${isInDevelopmentRoute
                    ? `${theme === 'dark' ? 'bg-gradient-to-br from-[#1E1E1E] via-[#2B2B2B] to-[#000000]' : 'bg-[#DDE3EA]'}`
                    : ''}`}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Home />} />
                    <Route path="/register" element={<Home />} />
                    <Route path="/cookies" element={<CookiesPolicy />} />
                    <Route path="/en-desarrollo" element={<InDevelopmentPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/projects"
                        element={
                            <ProtectedRoute>
                                <Projects />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/board"
                        element={
                            <ProtectedRoute>
                                <Board />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
            <AnimatePresence>
                {showCookieModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <CookieConsentModal
                            onAcceptAll={() => saveConsent('all')}
                            onAcceptNecessary={() => saveConsent('necessary')}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <FooterHintArrow hidden={showCookieModal} />
            <ToastContainer
                toastClassName="timetotask-toast"
                bodyClassName="timetotask-toast-body"
                progressClassName="timetotask-toast-progress"
                position="top-right"
                autoClose={2200}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme={theme === 'dark' ? 'dark' : 'light'}
            />
            <Footer />
        </>
    );
};

const AppShell = () => {
    const { theme } = useTheme();
    const [showCookieModal, setShowCookieModal] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent) {
            setShowCookieModal(true);
        }
    }, []);

    const saveConsent = (value) => {
        localStorage.setItem(
            COOKIE_CONSENT_KEY,
            JSON.stringify({
                value,
                acceptedAt: new Date().toISOString(),
            })
        );
        setShowCookieModal(false);
    };

    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppLayout showCookieModal={showCookieModal} saveConsent={saveConsent} theme={theme} />
        </Router>
    );
};

const App = () => {
    return (
        <GlobalProvider>
            <LanguageProvider>
                <ThemeProvider>
                    <AppShell />
                </ThemeProvider>
            </LanguageProvider>
        </GlobalProvider>
    );
};

export default App;