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
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => {
    return (
        <GlobalProvider>
            <LanguageProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            {/* TODO: Volver a proteger estas rutas una vez que la autenticación esté lista */}
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/board" element={<Board />} />
                        </Routes>
                    </main>
                    <Footer />
                </Router>
            </LanguageProvider>
        </GlobalProvider>
    );
};

export default App;