// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Bienvenida from './components/Bienvenida';
import Home from './components/Home';
import Questionnaire from './components/Questionnaire';
import ResultDisplay from './components/ResultDisplay';
import Login from './components/Login';
import Register from './components/Register';
import SupportResources from './components/SupportResources';
import SleepQuestionnaire from './components/SleepQuestionnaire';
import SleepJournal from './components/SleepJournal'; // Asegúrate de la ruta correcta

function App() {
    // El logo/título siempre llevará a /home, sin importar si está logueado o no.
    // Las protecciones de ruta se manejarán dentro de los componentes mismos o con un sistema de rutas más avanzado.
    const appTitleStyle = {
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: '#bb86fc', // Color púrpura brillante para el título
        textDecoration: 'none',
    };

    return (
        <Router>
            <nav style={{
                padding: '10px 30px',
                background: 'rgba(30, 20, 40, 0.8)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                color: 'white',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                width: '100%',
                boxSizing: 'border-box',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 2px 15px rgba(0, 0, 0, 0.3)',
            }}>
                {/* El logo/título siempre llevará a Home */}
                <Link to="/home" style={appTitleStyle}>
                    Tu Bienestar
                </Link>
            </nav>
            <Routes>
                <Route path="/" element={<Bienvenida />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* La ruta Home ahora será accesible sin necesidad de estar logueado */}
                <Route path="/home" element={<Home />} />
                <Route path="/cuestionario" element={<Questionnaire />} />
                <Route path="/resultados" element={<ResultDisplay />} />
                <Route path="/recursos" element={<SupportResources />} />
                <Route path="/chequeo-sueno" element={<SleepQuestionnaire />} />
                <Route path="/diario-sueno" element={<SleepJournal />} />
            </Routes>
        </Router>
    );
}

export default App;