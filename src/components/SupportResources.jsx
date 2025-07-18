// src/components/SupportResources.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SupportResources() {
    const navigate = useNavigate();

    const resources = [
        {
            category: "Líneas de Ayuda y Emergencia",
            description: "Contactos directos para situaciones de crisis o si necesitas hablar con alguien de inmediato.",
            items: [
                {
                    name: "Línea 113 - Opción 5 (Salud Mental - Minsa)",
                    contact: "Llama al 113, opción 5",
                    details: "Servicio gratuito del Ministerio de Salud del Perú para orientación, consejería y soporte psicológico.",
                    link: "https://www.gob.pe/saludmentalparatodos"
                },
                {
                    name: "Servicio de Salud Mental en Línea (Perú)",
                    contact: "Consulta web o por teléfono",
                    details: "Plataformas que ofrecen atención psicológica remota. Busca opciones gratuitas o de bajo costo en tu región.",
                    link: "https://telepsicologia.minsa.gob.pe/" // Ejemplo, podrías investigar más
                },
                // Puedes añadir más líneas de ayuda específicas de tu región
                // {
                //     name: "Línea de Apoyo Universitaria [Si aplica]",
                //     contact: "Número de teléfono o extensión de tu universidad",
                //     details: "Servicio de consejería o psicología de tu institución educativa."
                // }
            ]
        },
        {
            category: "Directorio de Profesionales",
            description: "Encuentra psicólogos, psiquiatras y terapeutas.",
            items: [
                {
                    name: "Colegio de Psicólogos del Perú",
                    contact: "Visita su directorio en línea",
                    details: "Puedes buscar profesionales colegiados y habilitados en todo el Perú.",
                    link: "https://www.cpsp.pe/directorio/" // Enlace real
                },
                {
                    name: "Plataformas de Teleterapia",
                    contact: "Explora sitios web como 'Psicología Online'",
                    details: "Conecta con terapeutas a través de videollamadas. Algunas ofrecen primeras consultas gratuitas o a bajo costo.",
                    link: "https://www.psicologia-online.com/" // Ejemplo genérico, busca plataformas con base en Perú
                }
            ]
        },
        {
            category: "Comunidades y Grupos de Apoyo",
            description: "Conecta con personas que comparten experiencias similares.",
            items: [
                {
                    name: "Grupos de Apoyo Locales (ONGs/Comunitarios)",
                    contact: "Consulta organizaciones locales",
                    details: "Muchas ONGs ofrecen reuniones de apoyo para ansiedad, depresión, duelo, etc. Busca en tu comunidad.",
                    link: "#" // No hay un enlace global, pero puedes poner información general
                },
                {
                    name: "Foros y Comunidades Online Seguras",
                    contact: "Explora foros dedicados a la salud mental",
                    details: "Espacios virtuales para compartir, aprender y encontrar empatía. Asegúrate de que sean moderados.",
                    link: "#" // Puedes enlazar a un foro específico si conoces uno seguro
                }
            ]
        },
        {
            category: "Herramientas de Autocuidado y Bienestar",
            description: "Recursos para mejorar tu bienestar diario.",
            items: [
                {
                    name: "Aplicaciones de Mindfulness y Meditación",
                    contact: "Descarga apps como Headspace o Calm (pruebas gratuitas)",
                    details: "Ejercicios guiados para reducir el estrés y mejorar la concentración.",
                    link: "https://www.headspace.com/es"
                },
                {
                    name: "Guías de Hábitos Saludables",
                    contact: "Artículos y blogs especializados",
                    details: "Información sobre sueño, nutrición, ejercicio y gestión del tiempo.",
                    link: "#" // Podrías enlazar a un blog de salud o a tu propio contenido si lo creas
                },
                {
                    name: "Diarios de Gratitud y Emociones",
                    contact: "Usa un cuaderno físico o una app de journaling",
                    details: "Herramienta para reflexionar sobre tus sentimientos y lo positivo de tu día.",
                    link: "#" // O enlazar a una app de journaling
                }
            ]
        }
    ];

    // --- Estilos --- (Adaptados para consistencia con tu app)
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
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    };

    const titleStyle = {
        fontSize: '2.5em',
        marginBottom: '25px',
        color: '#f0f0f0',
        fontWeight: 'bold',
    };

    const sectionStyle = {
        marginBottom: '30px',
        width: '100%',
        textAlign: 'left',
    };

    const categoryTitleStyle = {
        fontSize: '1.8em',
        color: '#bb86fc', // Púrpura vibrante
        marginBottom: '15px',
        borderBottom: '2px solid rgba(187, 134, 252, 0.3)',
        paddingBottom: '10px',
    };

    const descriptionStyle = {
        fontSize: '1.05em',
        color: '#c0c0c0',
        marginBottom: '20px',
    };

    const resourceItemStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        padding: '15px 20px',
        marginBottom: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    };

    const resourceNameStyle = {
        fontSize: '1.3em',
        color: '#f0f0f0',
        marginBottom: '5px',
        fontWeight: 'bold',
    };

    const resourceContactStyle = {
        fontSize: '1em',
        color: '#d0d0d0',
        marginBottom: '8px',
    };

    const resourceDetailsStyle = {
        fontSize: '0.95em',
        color: '#a0a0a0',
        marginBottom: '10px',
    };

    const resourceLinkStyle = {
        display: 'inline-block',
        marginTop: '10px',
        padding: '8px 15px',
        backgroundColor: '#9370db', // Púrpura más oscuro
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '0.9em',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        '&:hover': {
            backgroundColor: '#8a2be2',
            transform: 'scale(1.05)',
        },
    };

    const backButtonStyle = {
        padding: '12px 25px',
        fontSize: '1.1em',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #4f80e4 0%, #6a5acd 100%)', // Un azul/púrpura
        color: 'white',
        boxShadow: '0 6px 20px rgba(79, 128, 228, 0.3)',
        transition: 'all 0.3s ease',
        marginTop: '30px',
        alignSelf: 'center',
    };

    const backButtonHoverStyle = {
        background: 'linear-gradient(135deg, #436fc7 0%, #5d4fab 100%)',
        boxShadow: '0 8px 25px rgba(79, 128, 228, 0.5)',
        transform: 'translateY(-2px)',
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Recursos de Apoyo para tu Bienestar</h1>
            <p style={descriptionStyle}>
                Aquí encontrarás una variedad de recursos y herramientas para cuidar tu salud mental y emocional.
            </p>

            {resources.map((section, sectionIndex) => (
                <div key={sectionIndex} style={sectionStyle}>
                    <h2 style={categoryTitleStyle}>{section.category}</h2>
                    <p style={descriptionStyle}>{section.description}</p>
                    {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} style={resourceItemStyle}>
                            <h3 style={resourceNameStyle}>{item.name}</h3>
                            <p style={resourceContactStyle}>{item.contact}</p>
                            <p style={resourceDetailsStyle}>{item.details}</p>
                            {item.link && item.link !== '#' && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={resourceLinkStyle}
                                    onMouseOver={(e) => { e.target.style.backgroundColor = resourceLinkStyle['&:hover'].backgroundColor; e.target.style.transform = resourceLinkStyle['&:hover'].transform; }}
                                    onMouseOut={(e) => { e.target.style.backgroundColor = resourceLinkStyle.backgroundColor; e.target.style.transform = 'none'; }}
                                >
                                    Más Información
                                </a>
                            )}
                            {item.link === '#' && (
                                <span style={{ ...resourceLinkStyle, cursor: 'default', opacity: 0.7, background: '#555' }}>
                                    Información adicional (enlace no disponible)
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            ))}

            <button
                onClick={() => navigate('/home')} // O la ruta a tu página de inicio principal
                style={backButtonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, backButtonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, backButtonStyle)}
            >
                Volver al Inicio
            </button>
        </div>
    );
}

export default SupportResources;