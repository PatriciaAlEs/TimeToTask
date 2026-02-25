import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from './store';
import { LanguageProvider } from './i18n/LanguageContext';
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

const COOKIE_CONSENT_KEY = 'cookie_consent_status';

const App = () => {
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
        <GlobalProvider>
            <LanguageProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Home />} />
                            <Route path="/register" element={<Home />} />
                            <Route path="/cookies" element={<CookiesPolicy />} />
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
                    {showCookieModal && (
                        <CookieConsentModal
                            onAcceptAll={() => saveConsent('all')}
                            onAcceptNecessary={() => saveConsent('necessary')}
                        />
                    )}
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
                        theme="dark"
                    />
                    <Footer />
                </Router>
            </LanguageProvider>
        </GlobalProvider>
    );
};

export default App;