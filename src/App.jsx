import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './store';
import { LanguageProvider } from './i18n/LanguageContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Board from './pages/Board';

const App = () => {
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
                    <Footer />
                </Router>
            </LanguageProvider>
        </GlobalProvider>
    );
};

export default App;