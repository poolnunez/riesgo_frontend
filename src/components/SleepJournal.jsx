// src/components/SleepJournal.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SleepJournal() {
    const navigate = useNavigate();
    const [sleepEntries, setSleepEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSleepEntries = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setError('Debes iniciar sesión para ver tu diario de sueño.');
                setLoading(false);
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/sleep-tracker/', { // <-- Asegúrate de tu URL del backend
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Error al cargar el historial de sueño.');
                }

                const data = await response.json();
                setSleepEntries(data);
            } catch (err) {
                console.error('Error al obtener el historial de sueño:', err);
                setError(`No se pudo cargar el diario de sueño: ${err.message}.`);
            } finally {
                setLoading(false);
            }
        };

        fetchSleepEntries();
    }, [navigate]);

    // Función para formatear la fecha y hora
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // --- Estilos --- (Consistentes con tu diseño general)
    const containerStyle = {
        padding: '30px',
        maxWidth: '800px',
        margin: '40px auto',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderRadius: '15px',
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#e0e0e0',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    };

    const titleStyle = {
        fontSize: '2.5em',
        marginBottom: '25px',
        color: '#f0f0f0',
        fontWeight: 'bold',
    };

    const messageStyle = {
        fontSize: '1.1em',
        color: '#c0c0c0',
        marginBottom: '20px',
    };

    const errorStyle = {
        fontSize: '1.1em',
        color: '#ff6b6b', // Rojo para errores
        marginBottom: '20px',
    };

    const entryListStyle = {
        width: '100%',
        maxHeight: '500px', // Limitar altura y permitir scroll
        overflowY: 'auto',
        paddingRight: '15px', // Espacio para la barra de scroll
    };

    const entryItemStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        padding: '15px 20px',
        marginBottom: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
    };

    const entryHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        borderBottom: '1px dashed rgba(255, 255, 255, 0.1)',
        paddingBottom: '5px',
    };

    const dateStyle = {
        fontSize: '0.9em',
        color: '#a0a0a0',
    };

    const qualityHoursStyle = {
        fontSize: '1.2em',
        color: '#bb86fc',
        fontWeight: 'bold',
    };

    const detailStyle = {
        fontSize: '1em',
        color: '#d0d0d0',
        marginBottom: '5px',
    };

    const emptyStateStyle = {
        fontSize: '1.2em',
        color: '#c0c0c0',
        marginTop: '30px',
    };

    const buttonStyle = {
        padding: '12px 25px',
        fontSize: '1.1em',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)', // Gris para volver
        color: 'white',
        boxShadow: '0 6px 20px rgba(108, 117, 125, 0.3)',
        transition: 'all 0.3s ease',
        marginTop: '30px',
    };

    const buttonHoverStyle = {
        background: 'linear-gradient(135deg, #5a6268 0%, #343a40 100%)',
        boxShadow: '0 8px 25px rgba(108, 117, 125, 0.4)',
        transform: 'translateY(-2px)',
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Mi Diario de Sueño</h1>
            <p style={messageStyle}>
                Aquí puedes revisar el historial de tus registros de sueño.
            </p>

            {loading && <p style={messageStyle}>Cargando tu historial de sueño...</p>}
            {error && <p style={errorStyle}>{error}</p>}

            {!loading && !error && sleepEntries.length === 0 && (
                <p style={emptyStateStyle}>Aún no tienes registros de sueño. ¡Haz tu primer chequeo!</p>
            )}

            {!loading && !error && sleepEntries.length > 0 && (
                <div style={entryListStyle}>
                    {sleepEntries.map((entry) => (
                        <div key={entry.id} style={entryItemStyle}>
                            <div style={entryHeaderStyle}>
                                <span style={qualityHoursStyle}>{entry.hours}h ({entry.quality.replace(/_/g, ' ').toUpperCase()})</span>
                                <span style={dateStyle}>{formatDateTime(entry.recorded_at)}</span>
                            </div>
                            <p style={detailStyle}>**Rutina:** {entry.bedtime_routine || 'No especificada'}</p>
                            <p style={detailStyle}>**Al despertar:** {entry.feeling_upon_waking.replace(/_/g, ' ').charAt(0).toUpperCase() + entry.feeling_upon_waking.replace(/_/g, ' ').slice(1)}</p>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={() => navigate('/home')}
                style={buttonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            >
                Volver al Inicio
            </button>
        </div>
    );
}

export default SleepJournal;