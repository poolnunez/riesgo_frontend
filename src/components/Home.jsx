// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const username = localStorage.getItem('username') || 'Invitado';
    const profilePicUrl = localStorage.getItem('profilePicUrl') || `https://via.placeholder.com/50/6a1aab/FFFFFF?text=${username.charAt(0).toUpperCase()}`;

    // Revisa el estado de autenticación al cargar el componente
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleStartQuestionnaire = () => {
        if (!isLoggedIn) {
            alert('Debes iniciar sesión para acceder al cuestionario.'); // Mantenemos el alert simple por ahora
            navigate('/login');
        } else {
            navigate('/cuestionario');
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
        setShowProfileMenu(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('username');
        localStorage.removeItem('profilePicUrl');
        setIsLoggedIn(false);
        navigate('/'); // Redirige a la bienvenida al cerrar sesión
        window.location.reload(); // Recarga para limpiar completamente la sesión
    };

    const pageContainerStyle = {
        display: 'flex',
        minHeight: 'calc(100vh - 60px)',
        backgroundColor: '#243d4bf1',
        color: '#e0e0e0',
        width: '100%',
        boxSizing: 'border-box',
    };

    const sidebarStyle = {
        width: '280px',
        flexShrink: 0,
        background: 'rgba(60, 42, 77, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '25px',
        boxShadow: '5px 0 20px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const mainContentStyle = {
        flexGrow: 1,
        padding: '30px 40px',
        textAlign: 'center',
        overflowY: 'auto',
        maxWidth: 'calc(100% - 280px)',
        boxSizing: 'border-box',
    };

    const logoStyle = { // Este estilo ya no es para el logo principal de la app, sino para un posible título dentro de la sidebar
        fontSize: '2em',
        fontWeight: 'bold',
        marginBottom: '40px',
        color: '#bb86fc',
        textAlign: 'left',
        letterSpacing: '1px',
    };

    const navItemStyle = {
        padding: '15px 20px',
        marginBottom: '10px',
        borderRadius: '10px',
        cursor: 'pointer',
        background: 'rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '1.05em',
        color: '#c0c0c0',
    };

    const navItemHoverStyle = {
        background: 'rgba(255, 255, 255, 0.15)',
        color: '#ffffff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    };

    const userSectionStyle = {
        marginTop: 'auto',
        paddingTop: '25px',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        textAlign: 'center',
        position: 'relative',
    };

    const userProfileButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        background: 'rgba(255, 255, 255, 0.05)',
        border: 'none',
        color: '#e0e0e0',
        padding: '10px 15px',
        borderRadius: '10px',
        transition: 'background-color 0.2s ease',
        width: '100%',
        justifyContent: 'center',
    };

    const userProfileButtonHoverStyle = {
        background: 'rgba(255, 255, 255, 0.15)',
    };

    const profilePictureStyle = {
        width: '55px',
        height: '55px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '3px solid #bb86fc',
        boxShadow: '0 0 10px rgba(187, 134, 252, 0.5)',
    };

    const profileMenuContainerStyle = {
        position: 'absolute',
        bottom: 'calc(100% + 15px)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(50, 40, 60, 0.98)',
        borderRadius: '10px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)',
        width: '220px',
        zIndex: 1001,
        padding: '10px 0',
    };

    const profileMenuItemStyle = {
        padding: '12px 18px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background-color 0.2s ease, color 0.2s ease',
        color: '#e0e0e0',
    };

    const profileMenuItemHoverStyle = {
        background: '#bb86fc',
        color: 'white',
    };

    const startQButton = {
        padding: '18px 40px',
        fontSize: '1.3em',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #8a2be2 0%, #9370db 100%)',
        color: 'white',
        fontWeight: 'bold',
        marginTop: '40px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
    };
    const startQButtonHover = {
        background: 'linear-gradient(135deg, #6a1aab 0%, #7c58c2 100%)',
        boxShadow: '0 8px 25px rgba(138, 43, 226, 0.5)',
    };


    return (
        <div style={pageContainerStyle}>
            {/* Barra lateral izquierda */}
            <div style={sidebarStyle}>
                <div>
                    <div style={logoStyle}>Tu Bienestar</div> {/* Título o logo dentro de la barra lateral */}

                    {/* Opciones de navegación principales */}
                    <div
                        style={navItemStyle}
                        onMouseOver={(e) => Object.assign(e.target.style, navItemHoverStyle)}
                        onMouseOut={(e) => Object.assign(e.target.style, navItemStyle)}
                        onClick={() => handleNavigate('/home')}
                    >
                        <span>🏠</span> Inicio Principal
                    </div>
                    {/* El cuestionario siempre requerirá login */}
                    <div
                        style={navItemStyle}
                        onMouseOver={(e) => Object.assign(e.target.style, navItemHoverStyle)}
                        onMouseOut={(e) => Object.assign(e.target.style, navItemStyle)}
                        onClick={handleStartQuestionnaire}
                    >
                        <span>📋</span> Cuestionario Principal
                    </div>
                    <div
                        style={navItemStyle}
                        onMouseOver={(e) => Object.assign(e.target.style, navItemHoverStyle)}
                        onMouseOut={(e) => Object.assign(e.target.style, navItemStyle)}
                        onClick={() => handleNavigate('/chequeo-sueno')}
                    >
                        <span>😴</span> Chequeo de Sueño
                    </div>
                    {/* NUEVO ITEM: Diario de Sueño */}
                <div
                    style={navItemStyle}
                    onMouseOver={(e) => Object.assign(e.target.style, navItemHoverStyle)}
                    onMouseOut={(e) => Object.assign(e.target.style, navItemStyle)}
                    onClick={() => handleNavigate('/diario-sueno')}
                >
                    <span>📖</span> Mi Diario de Sueño
                </div>
                    <div
                        style={navItemStyle}
                        onMouseOver={(e) => Object.assign(e.target.style, navItemHoverStyle)}
                        onMouseOut={(e) => Object.assign(e.target.style, navItemStyle)}
                        onClick={() => handleNavigate('/recursos')}
                    >
                        <span>❤️</span> Recursos de Apoyo
                    </div>
                    <div
                        style={navItemStyle}
                        onMouseOver={(e) => Object.assign(e.target.style, navItemHoverStyle)}
                        onMouseOut={(e) => Object.assign(e.target.style, navItemStyle)}
                        onClick={() => alert('Información de Contacto del Psicólogo')}
                    >
                        <span>👨‍⚕️</span> Contacto Psicólogo U.
                    </div>
                </div>

                {/* Sección de usuario: Muestra opciones de perfil si logueado, o login/registro si no */}
                <div style={userSectionStyle}>
                    {isLoggedIn ? (
                        <>
                            <button
                                style={userProfileButtonStyle}
                                onMouseOver={(e) => Object.assign(e.target.style, userProfileButtonHoverStyle)}
                                onMouseOut={(e) => Object.assign(e.target.style, userProfileButtonStyle)}
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >
                                <img src={profilePicUrl} alt="Perfil" style={profilePictureStyle} />
                                <span>{username}</span>
                            </button>
                            {showProfileMenu && (
                                <div style={profileMenuContainerStyle}>
                                    <div
                                        style={profileMenuItemStyle}
                                        onMouseOver={(e) => Object.assign(e.target.style, profileMenuItemHoverStyle)}
                                        onMouseOut={(e) => Object.assign(e.target.style, profileMenuItemStyle)}
                                        onClick={() => handleNavigate('/profile-settings')}
                                    >
                                        Configurar Perfil
                                    </div>
                                    <div
                                        style={profileMenuItemStyle}
                                        onMouseOver={(e) => Object.assign(e.target.style, profileMenuItemHoverStyle)}
                                        onMouseOut={(e) => Object.assign(e.target.style, profileMenuItemStyle)}
                                        onClick={handleLogout}
                                    >
                                        Cerrar Sesión
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        // Si NO está logueado, se muestran opciones para Iniciar Sesión/Registrarse
                        <>
                            <div
                                style={{...navItemStyle, justifyContent: 'center', fontSize: '1.1em'}}
                                onMouseOver={(e) => Object.assign(e.target.style, navItemHoverStyle)}
                                onMouseOut={(e) => Object.assign(e.target.style, navItemStyle)}
                                onClick={() => handleNavigate('/login')}
                            >
                                <span>👤</span> Iniciar Sesión
                            </div>
                            <div
                                style={{...navItemStyle, justifyContent: 'center', fontSize: '1.1em'}}
                                onMouseOver={(e) => Object.assign(e.target.style, navItemHoverStyle)}
                                onMouseOut={(e) => Object.assign(e.target.style, navItemStyle)}
                                onClick={() => handleNavigate('/register')}
                            >
                                <span>📝</span> Registrarse
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Contenido principal del Home */}
            <div style={mainContentStyle}>
                <h2 style={{fontSize: '2.5em', marginBottom: '30px', color: '#bb86fc'}}>
                    Tu Espacio Personal de Bienestar
                </h2>
                <p style={{fontSize: '1.2em', lineHeight: '1.6', marginBottom: '40px', color: '#c0c0c0'}}>
                    Aquí encontrarás herramientas y recursos dedicados a tu salud mental. Explora cuestionarios, accede a información relevante y contacta con profesionales.
                </p>
                <button
                    onClick={handleStartQuestionnaire}
                    style={startQButton}
                    onMouseOver={(e) => Object.assign(e.target.style, startQButtonHover)}
                    onMouseOut={(e) => Object.assign(e.target.style, startQButton)}
                >
                    Iniciar Cuestionario Principal
                </button>

                <div style={{marginTop: '60px', textAlign: 'left'}}>
                    <h3 style={{fontSize: '1.8em', color: '#bb86fc', marginBottom: '20px'}}>Recursos Sugeridos</h3>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center'}}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            padding: '20px',
                            width: 'calc(50% - 30px)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <h4 style={{color: '#fff', marginBottom: '10px'}}>Guías de Autocuidado</h4>
                            <p style={{fontSize: '0.95em', color: '#c0c0c0'}}>Descubre técnicas y estrategias para manejar el estrés y mejorar tu bienestar diario.</p>
                        </div>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            padding: '20px',
                            width: 'calc(50% - 30px)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <h4 style={{color: '#fff', marginBottom: '10px'}}>Artículos de Interés</h4>
                            <p style={{fontSize: '0.95em', color: '#c0c0c0'}}>Mantente informado con los últimos hallazgos y consejos sobre salud mental.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;