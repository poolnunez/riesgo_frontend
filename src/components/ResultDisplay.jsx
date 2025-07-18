// src/components/ResultDisplay.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultDisplay() {
    const location = useLocation();
    const navigate = useNavigate();
    // Inicializamos el estado para los resultados
    const [results, setResults] = useState(null);

    useEffect(() => {
        // Obtenemos los datos del estado de la ruta
        const { predicted_risk_level_label, recommendations } = location.state || {};

        // Validamos que los datos esenciales estén presentes
        if (predicted_risk_level_label && Array.isArray(recommendations)) {
            setResults({ predicted_risk_level_label, recommendations });
        } else {
            // Si no hay datos válidos, navegamos de vuelta o mostramos un error
            console.error("No se encontraron datos de resultados válidos en location.state.");
            // Podrías redirigir al cuestionario o mostrar un mensaje de error detallado
            // Por ahora, lo dejo para que muestre el mensaje de "Error al Cargar Resultados"
            // y los botones para reintentar.
        }
    }, [location.state, navigate]); // Dependencias para que se ejecute cuando cambie el estado de la ruta

    // Estilos generales del contenedor
    const containerStyle = {
        minHeight: 'calc(100vh - 60px)', // Ajuste para ocupar casi toda la altura
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#243d4bf1', // Fondo oscuro unificado con Questionnaire
        color: '#e0e0e0',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        boxSizing: 'border-box',
    };

    const resultsBoxStyle = {
        background: 'rgba(50, 40, 60, 0.9)', // Fondo más oscuro para el cuadro de resultados
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '15px',
        padding: '40px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        maxWidth: '800px',
        width: '90%',
        margin: 'auto',
    };

    const titleStyle = {
        fontSize: '2.5em',
        marginBottom: '20px',
        color: '#bb86fc', // Color púrpura vibrante
        textShadow: '0 0 10px rgba(187, 134, 252, 0.3)', // Efecto de sombra para el título
    };

    const riskLevelStyle = (level) => {
        let color = '#f0f0f0'; // Default color
        // Asumiendo que tu backend puede devolver 'Low', 'Medium', 'High' o similar
        // Adapta estos colores a los niveles que tu modelo pueda devolver.
        switch (level.toLowerCase()) {
            case 'low':
            case 'bajo':
            case 'minimo':
                color = '#8bc34a'; // Verde
                break;
            case 'medium':
            case 'moderado':
            case 'intermedio':
                color = '#ffeb3b'; // Amarillo
                break;
            case 'high':
            case 'alto':
                color = '#f44336'; // Rojo
                break;
            default:
                color = '#bb86fc'; // Púrpura para desconocido
                break;
        }
        return {
            fontSize: '1.8em',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: color,
            transition: 'color 0.3s ease', // Suaviza el cambio de color
        };
    };

    const recommendationsStyle = {
        textAlign: 'left',
        marginBottom: '30px',
        fontSize: '1.1em',
        lineHeight: '1.6',
        color: '#c0c0c0',
    };

    // Estilo base para los botones
    const buttonBaseStyle = {
        padding: '15px 30px',
        fontSize: '1.2em',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        margin: '0 10px',
        marginTop: '30px',
        minWidth: '200px', // Asegura un ancho mínimo para ambos botones
    };

    // Estilo específico para el botón "Volver a Empezar" (cuestionario)
    const startOverButtonStyle = {
        ...buttonBaseStyle,
        background: 'linear-gradient(135deg, #4CAF50 0%, #66bb6a 100%)', // Degradado verde
        color: 'white',
    };
    const startOverButtonHoverStyle = {
        background: 'linear-gradient(135deg, #43A047 0%, #5CB85C 100%)',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
        transform: 'translateY(-2px)',
    };

    // Estilo específico para el botón "Ir a Inicio"
    const goToHomeButtonStyle = {
        ...buttonBaseStyle,
        background: 'linear-gradient(135deg, #8a2be2 0%, #9370db 100%)', // Degradado púrpura
        color: 'white',
    };
    const goToHomeButtonHoverStyle = {
        background: 'linear-gradient(135deg, #6a1aab 0%, #7c58c2 100%)',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
        transform: 'translateY(-2px)',
    };

    const handleStartQuestionnaire = () => {
        navigate('/cuestionario');
    };

    const handleGoToHome = () => {
        navigate('/home');
    };

    if (!results) {
        return (
            <div style={containerStyle}>
                <div style={resultsBoxStyle}>
                    <h2 style={titleStyle}>Error al Cargar Resultados</h2>
                    <p style={{ color: '#ff6b6b', fontSize: '1.1em' }}>
                        No se encontraron datos de resultados válidos. Esto podría deberse a un problema con el servidor o porque no completaste el cuestionario. Por favor, vuelve a intentarlo.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <button
                            onClick={handleStartQuestionnaire}
                            style={startOverButtonStyle}
                            onMouseOver={(e) => Object.assign(e.target.style, startOverButtonHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.target.style, startOverButtonStyle)}
                        >
                            Volver a Empezar Cuestionario
                        </button>
                        <button
                            onClick={handleGoToHome}
                            style={goToHomeButtonStyle}
                            onMouseOver={(e) => Object.assign(e.target.style, goToHomeButtonHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.target.style, goToHomeButtonStyle)}
                        >
                            Ir a Inicio Principal
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={resultsBoxStyle}>
                <h2 style={titleStyle}>Resultado del Cuestionario</h2>
                <p style={riskLevelStyle(results.predicted_risk_level_label)}>
                    Nivel de Riesgo: **{results.predicted_risk_level_label}**
                </p>
                <div style={recommendationsStyle}>
                    <h3>Recomendaciones Personalizadas:</h3>
                    {results.recommendations && results.recommendations.length > 0 ? (
                        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                            {results.recommendations.map((rec, index) => (
                                <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ marginRight: '10px', color: '#bb86fc', fontSize: '1.2em' }}>&bull;</span>
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se proporcionaron recomendaciones.</p>
                    )}
                </div>
                <p style={{ fontSize: '0.9em', color: '#999', marginTop: '20px' }}>
                    *Estos resultados son generados por un modelo predictivo y son solo una guía. No sustituyen un diagnóstico o consejo profesional. Si te sientes preocupado, te animamos a buscar apoyo.*
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <button
                        onClick={handleStartQuestionnaire}
                        style={startOverButtonStyle}
                        onMouseOver={(e) => Object.assign(e.target.style, startOverButtonHoverStyle)}
                        onMouseOut={(e) => Object.assign(e.target.style, startOverButtonStyle)}
                    >
                        Volver a Empezar Cuestionario
                    </button>
                    <button
                        onClick={handleGoToHome}
                        style={goToHomeButtonStyle}
                        onMouseOver={(e) => Object.assign(e.target.style, goToHomeButtonHoverStyle)}
                        onMouseOut={(e) => Object.assign(e.target.style, goToHomeButtonStyle)}
                    >
                        Ir a Inicio Principal
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultDisplay;