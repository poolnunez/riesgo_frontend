// src/components/Bienvenida.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Bienvenida() {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/login'); // Lleva directamente a la página de login
    };

    const containerStyle = {
        minHeight: 'calc(100vh - 60px)', // Ajustado para la barra superior
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#243d4bf1', // Fondo consistente con Home
        color: '#e0e0e0',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        boxSizing: 'border-box',
    };

    const contentBoxStyle = {
        background: 'rgba(50, 40, 60, 0.9)', // Fondo semi-transparente
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '15px',
        padding: '40px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        maxWidth: '800px',
        width: '90%',
        margin: 'auto',
    };

    const headingStyle = {
        fontSize: '3em',
        color: '#bb86fc', // Púrpura para el título
        marginBottom: '20px',
        textShadow: '0 0 10px rgba(187, 134, 252, 0.3)',
    };

    const paragraphStyle = {
        fontSize: '1.2em',
        lineHeight: '1.8',
        marginBottom: '30px',
        color: '#c0c0c0',
    };

    const buttonStyle = {
        padding: '15px 30px',
        fontSize: '1.2em',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #8a2be2 0%, #9370db 100%)',
        color: 'white',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        marginTop: '40px', // ¡Este es el cambio para el margen!
    };

    const buttonHoverStyle = {
        background: 'linear-gradient(135deg, #6a1aab 0%, #7c58c2 100%)',
        boxShadow: '0 6px 20px rgba(138, 43, 226, 0.4)',
        transform: 'translateY(-2px)',
    };

    const disclaimerStyle = {
        fontSize: '0.9em',
        color: '#999',
        marginTop: '30px',
        maxWidth: '600px',
        margin: '30px auto 0',
    };

    return (
        <div style={containerStyle}>
            <div style={contentBoxStyle}>
                <h1 style={headingStyle}>Bienvenido a Tu Plataforma de Bienestar</h1>
                <p style={paragraphStyle}>
                    Tu espacio personal para el autodescubrimiento y el crecimiento emocional.
                    Aquí encontrarás herramientas y recursos diseñados para apoyar tu salud mental
                    y bienestar general. Nuestro objetivo es proporcionarte un camino claro hacia una vida más plena y consciente.
                </p>
                <p style={disclaimerStyle}>
                    *Este contenido es de naturaleza informativa y de apoyo, no sustituye el consejo profesional.
                    Si necesitas ayuda especializada, por favor busca la orientación de un psicólogo calificado.*
                </p>
                <button
                    onClick={handleContinue}
                    style={buttonStyle}
                    onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                    onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default Bienvenida;