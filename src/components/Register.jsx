// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post('https://riesgo-backend.onrender.com/register', {
                username,
                email,
                password,
            });
            console.log('Registro exitoso:', response.data);
            alert('¡Registro exitoso! Por favor, inicia sesión.');
            navigate('/login'); // Redirige al usuario a la página de login
        } catch (err) {
            console.error('Error durante el registro:', err.response ? err.response.data : err.message);
            if (err.response && err.response.data && err.response.data.detail) {
                // Manejar errores específicos de FastAPI (ej: usuario o email ya existen)
                if (typeof err.response.data.detail === 'string') {
                    setError(err.response.data.detail);
                } else if (Array.isArray(err.response.data.detail)) {
                    // Si 'detail' es una lista de objetos (errores de validación de Pydantic)
                    const errorMessages = err.response.data.detail.map(err => err.msg).join('; ');
                    setError(errorMessages);
                } else {
                    setError('Error desconocido en el registro.');
                }
            } else {
                setError('Error al registrarse. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    // Estilos (manteniendo el diseño glassmorphism)
    const formContainerStyle = {
        padding: '30px',
        maxWidth: '450px',
        margin: '60px auto',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        background: 'rgba(255, 255, 255, 0.08)', // Fondo translúcido
        backdropFilter: 'blur(15px)', // Efecto de desenfoque detrás
        WebkitBackdropFilter: 'blur(15px)', // Para compatibilidad con Safari
        borderRadius: '15px',
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.3)', // Sombra sutil
        border: '1px solid rgba(255, 255, 255, 0.15)', // Borde translúcido
        color: '#e0e0e0', // Color de texto claro
        textAlign: 'center',
    };

    const inputStyle = {
        width: 'calc(100% - 20px)', // Resta padding horizontal
        padding: '12px 10px',
        margin: '10px 0',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.3)', // Borde de input translúcido
        background: 'rgba(255, 255, 255, 0.1)', // Fondo de input translúcido
        color: '#e0e0e0', // Color de texto de input
        fontSize: '1em',
        outline: 'none', // Quita el contorno al enfocar
        boxSizing: 'border-box', // Incluye padding y borde en el ancho total
    };

    const buttonStyle = {
        width: '100%',
        padding: '15px',
        marginTop: '20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#6a1aab', // Un color vibrante para el botón
        color: 'white',
        fontSize: '1.2em',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease', // Transición suave al pasar el ratón
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Sombra para el botón
    };

    const errorStyle = {
        color: '#ff6b6b', // Color de error rojo suave
        marginBottom: '15px',
        fontSize: '0.9em',
    };

    const linkStyle = { // Estilo para el enlace a Login
        color: '#9370db', // Un tono más claro de púrpura
        textDecoration: 'none',
        marginTop: '15px',
        display: 'block',
        fontSize: '0.9em',
    };

    return (
        <div style={formContainerStyle}>
            <h2 style={{ color: '#f0f0f0', marginBottom: '25px', fontSize: '2em' }}>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={errorStyle}>{error}</p>}
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={inputStyle}
                />
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Registrarse</button>
            </form>
            <Link to="/login" style={linkStyle}>¿Ya tienes una cuenta? Inicia Sesión</Link>
        </div>
    );
}

export default Register;