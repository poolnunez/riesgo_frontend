// src/components/SleepQuestionnaire.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SleepQuestionnaire() {
    const navigate = useNavigate();
    const [sleepData, setSleepData] = useState({
        hours: 7,
        quality: 'promedio',
        bedtimeRoutine: '',
        // CAMBIAR A snake_case aquí:
        feeling_upon_waking: '', // <-- ¡CAMBIO AQUÍ!
    });
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSleepData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionMessage('Enviando tus datos de sueño...');

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setSubmissionMessage('Error: No has iniciado sesión. Redirigiendo al login...');
            setIsSubmitting(false);
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/sleep-tracker/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(sleepData)
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parsea el error del backend
                console.error('Datos de error del backend:', errorData); // <-- MUY IMPORTANTE: Ver esto en la consola

                let errorMessage = 'Error desconocido al guardar los datos de sueño.';

                // Intenta obtener un mensaje de error más específico
                if (errorData.detail) {
                    errorMessage = errorData.detail;
                } else if (errorData.non_field_errors && errorData.non_field_errors.length > 0) {
                    errorMessage = errorData.non_field_errors[0];
                } else if (Object.keys(errorData).length > 0) {
                    // Si hay otros errores de campo, muestra el primero que encuentres
                    const firstKey = Object.keys(errorData)[0];
                    errorMessage = `${firstKey}: ${errorData[firstKey][0]}`;
                }

                throw new Error(errorMessage); // Lanza un error con un mensaje legible
            }

            const data = await response.json();
            console.log('Datos de sueño guardados:', data);
            setSubmissionMessage('¡Datos de sueño registrados con éxito! Redirigiendo a tu diario...');
            setTimeout(() => {
                navigate('/diario-sueno');
            }, 2000);

        } catch (error) {
            console.error('Error al enviar datos de sueño:', error);
            // El mensaje de error ya viene de la lógica de arriba
            setSubmissionMessage(`Error: ${error.message}. Por favor, inténtalo de nuevo.`);
        } finally {
            setIsSubmitting(false);
        }
    
    };

    // --- DEFINICIONES DE ESTILO FALTANTES ---
    const containerStyle = {
        padding: "30px",
        maxWidth: "600px", // Un poco más pequeño que el diario
        margin: "40px auto",
        fontFamily: "Segoe UI, Arial, sans-serif",
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: "15px",
        boxShadow: "0 10px 40px 0 rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "#e0e0e0",
        textAlign: "center",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    };

    const titleStyle = {
        fontSize: "2.5em",
        marginBottom: "25px",
        color: "#f0f0f0",
        fontWeight: "bold"
    };

    const formStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px', // Espacio entre cada grupo de label/input
        alignItems: 'stretch',
        marginTop: '20px',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontSize: '1.1em',
        color: '#f0f0f0',
        textAlign: 'left',
        fontWeight: 'bold',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#e0e0e0',
        fontSize: '1em',
        boxSizing: 'border-box', // Incluye padding y border en el width
        marginBottom: '15px', // Espacio después del input
    };

    const sliderStyle = {
        width: '100%',
        height: '8px',
        borderRadius: '5px',
        background: '#5a5a5a', // Fondo de la barra del slider
        outline: 'none',
        opacity: '0.7',
        transition: 'opacity .2s',
        WebkitAppearance: 'none', // Ocultar estilo predeterminado en WebKit
        appearance: 'none',

        // Estilos para el "pulgar" del slider (Thumb)
        '&::-webkit-slider-thumb': {
            WebkitAppearance: 'none',
            appearance: 'none',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#bb86fc', // Púrpura brillante
            cursor: 'pointer',
            border: '2px solid #e0e0e0',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        },
        '&::-moz-range-thumb': {
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#bb86fc',
            cursor: 'pointer',
            border: '2px solid #e0e0e0',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        }
    };

    const selectStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#e0e0e0',
        fontSize: '1em',
        boxSizing: 'border-box',
        marginBottom: '15px',
        cursor: 'pointer',
        WebkitAppearance: 'none', // Para personalizar la apariencia en Chrome/Safari
        MozAppearance: 'none', // Para Firefox
        appearance: 'none',
        backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23e0e0e0%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13.6-6.4H18.9c-7.9%200-13.6%204.3-13.6%206.4s4.3%206.4%2013.6%206.4h254.6c7.9%200%2013.6-4.3%2013.6-6.4zm-13.6%20153.2H18.9c-7.9%200-13.6%204.3-13.6%206.4s4.3%206.4%2013.6%206.4h254.6c7.9%200%2013.6-4.3%2013.6-6.4z%22%2F%3E%3C%2Fsvg%3E")', // Flecha SVG para select
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px top 50%',
        backgroundSize: '12px auto',
    };

    const textAreaStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#e0e0e0',
        fontSize: '1em',
        boxSizing: 'border-box',
        marginBottom: '15px',
        minHeight: '80px',
        resize: 'vertical',
    };

    const buttonStyle = {
        padding: "12px 25px",
        fontSize: "1.1em",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        background: "linear-gradient(135deg, #bb86fc 0%, #6200ee 100%)", // Púrpura brillante
        color: "white",
        boxShadow: "0 6px 20px rgba(187, 134, 252, 0.3)",
        transition: "all 0.3s ease",
        marginTop: "20px",
    };

    const buttonHoverStyle = {
        background: "linear-gradient(135deg, #a06dfc 0%, #4e00b8 100%)",
        boxShadow: "0 8px 25px rgba(187, 134, 252, 0.4)",
        transform: "translateY(-2px)"
    };

    const messageStyle = {
        fontSize: "1.1em",
        marginTop: "20px",
        padding: "10px 15px",
        borderRadius: "8px",
        color: "#e0e0e0",
        background: "rgba(187, 134, 252, 0.1)", // Fondo sutil para mensajes
        border: "1px solid rgba(187, 134, 252, 0.3)",
    };

    // --- FIN DE DEFINICIONES DE ESTILO FALTANTES ---

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Chequeo Rápido de Sueño</h1>
            <p style={{marginBottom: '20px', color: '#c0c0c0'}}>
                Un buen descanso es clave para tu bienestar. Cuéntanos un poco sobre tus hábitos de sueño.
            </p>

            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <label htmlFor="hours" style={labelStyle}>¿Cuántas horas sueles dormir por noche?</label>
                    <input
                        type="range"
                        id="hours"
                        name="hours"
                        min="4"
                        max="12"
                        value={sleepData.hours}
                        onChange={handleChange}
                        style={sliderStyle}
                    />
                    <p style={{textAlign: 'center', marginTop: '10px', color: '#bb86fc'}}>
                        {sleepData.hours} horas
                    </p>
                </div>

                <div>
                    <label htmlFor="quality" style={labelStyle}>¿Cómo describirías la calidad de tu sueño?</label>
                    <select
                        id="quality"
                        name="quality"
                        value={sleepData.quality}
                        onChange={handleChange}
                        style={selectStyle}
                    >
                        <option value="muy_mala">Muy Mala</option>
                        <option value="mala">Mala</option>
                        <option value="promedio">Promedio</option>
                        <option value="buena">Buena</option>
                        <option value="muy_buena">Muy Buena</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="bedtimeRoutine" style={labelStyle}>¿Tienes alguna rutina antes de ir a dormir? (Ej: leer, meditar, ver TV)</label>
                    <textarea
                        id="bedtimeRoutine"
                        name="bedtimeRoutine"
                        value={sleepData.bedtimeRoutine}
                        onChange={handleChange}
                        style={textAreaStyle}
                        placeholder="Describe tu rutina..."
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="feelingUponWaking" style={labelStyle}>¿Cómo te sientes generalmente al despertar?</label>
                        <select
                            id="feelingUponWaking" // El ID puede quedarse así si quieres, no afecta al envío
                            name="feeling_upon_waking" // <-- ¡CAMBIO CLAVE AQUÍ!
                            value={sleepData.feeling_upon_waking} // <-- ¡CAMBIO AQUÍ!
                            onChange={handleChange}
                            style={selectStyle}
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="muy_cansado">Muy cansado/a</option>
                            <option value="cansado">Cansado/a</option>
                            <option value="normal">Normal</option>
                            <option value="fresco">Fresco/a y con energía</option>
                        </select>
                </div>

                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => isSubmitting ? null : Object.assign(e.target.style, buttonHoverStyle)}
                    onMouseOut={(e) => isSubmitting ? null : Object.assign(e.target.style, buttonStyle)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar mis Hábitos de Sueño'}
                </button>
            </form>

            {submissionMessage && <p style={messageStyle}>{submissionMessage}</p>}

            <button
                onClick={() => navigate('/home')}
                style={{...buttonStyle, background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)', marginTop: '30px'}}
                onMouseOver={(e) => Object.assign(e.target.style, {background: 'linear-gradient(135deg, #5a6268 0%, #343a40 100%)', boxShadow: '0 8px 25px rgba(108, 117, 125, 0.4)', transform: 'translateY(-2px)'})}
                onMouseOut={(e) => Object.assign(e.target.style, {background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)', boxShadow: '0 6px 20px rgba(108, 117, 125, 0.3)', transform: 'none'})}
            >
                Volver
            </button>
        </div>
    );
}

export default SleepQuestionnaire;