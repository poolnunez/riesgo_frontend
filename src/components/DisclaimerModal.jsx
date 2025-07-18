import React from 'react';

function DisclaimerModal({ isOpen, onClose, onAccept }) {
    if (!isOpen) return null; // No renderiza nada si no está abierto

    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro semitransparente
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000 // Asegura que esté por encima de todo
    };

    const modalContentStyle = {
        background: 'rgba(255, 255, 255, 0.15)', // Fondo semitransparente para el modal
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '30px',
        borderRadius: '15px',
        maxWidth: '550px',
        width: '90%',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        color: '#e0e0e0', // Color de texto claro
        textAlign: 'center',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.2)'
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'none',
        border: 'none',
        color: '#e0e0e0',
        fontSize: '1.5em',
        cursor: 'pointer',
        fontWeight: 'bold'
    };

    const acceptButtonStyle = {
        padding: '12px 25px',
        fontSize: '1.1em',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#6a1aab', // Morado vibrante
        color: 'white',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        marginTop: '25px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <button style={closeButtonStyle} onClick={onClose}>&times;</button>
                <h2 style={{ color: '#90ee90', marginBottom: '20px', fontSize: '2em' }}>¡Bienvenido/a!</h2>
                <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
                    El objetivo de esta página es ayudar a identificar personas en riesgo y ofrecer apoyo.
                </p>
                <p style={{ fontSize: '1.1em', lineHeight: '1.6', marginTop: '15px' }}>
                    Toda información brindada aquí se utilizará con **fines de ayuda** y nos comprometemos a su confidencialidad y uso ético.
                </p>
                <p style={{ fontSize: '1.1em', lineHeight: '1.6', marginTop: '15px', fontWeight: 'bold', color: '#ffcc00' }}>
                    Por favor, recuerda que es importante buscar ayuda profesional si experimentas dificultades. Esta herramienta es un apoyo, no un diagnóstico.
                </p>
                <button style={acceptButtonStyle} onClick={onAccept}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default DisclaimerModal;