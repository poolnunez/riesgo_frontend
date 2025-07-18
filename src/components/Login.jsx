// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        try {
            // Envía las credenciales al backend para obtener un token de acceso
            const response = await axios.post(
                'http://localhost:8000/token',
                new URLSearchParams({
                    username: emailOrUsername,
                    password: password,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            // Almacena el token de acceso recibido
            const { access_token, token_type } = response.data;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('tokenType', token_type);

            console.log('Login exitoso. Token:', access_token);
            alert('¡Inicio de sesión exitoso!');
            
            // Redirige al usuario a la nueva página principal (/home)
            navigate('/home'); 

        } catch (err) {
            console.error('Error durante el login:', err.response ? err.response.data : err.message);
            if (err.response && err.response.status === 401) {
                setError('Credenciales incorrectas. Verifica tu correo/nombre de usuario y contraseña.');
            } else {
                setError('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    // Estilos para el formulario de login
    const formContainerStyle = { 
        padding: '30px', maxWidth: '450px', margin: '60px auto', fontFamily: 'Segoe UI, Arial, sans-serif', 
        background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', 
        borderRadius: '15px', boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.15)', 
        color: '#e0e0e0', textAlign: 'center', 
    };
    const inputStyle = { 
        width: 'calc(100% - 20px)', padding: '12px 10px', margin: '10px 0', borderRadius: '8px', 
        border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', 
        color: '#e0e0e0', fontSize: '1em', outline: 'none', boxSizing: 'border-box' 
    };
    const buttonStyle = { 
        width: '100%', padding: '15px', marginTop: '20px', borderRadius: '8px', border: 'none', 
        cursor: 'pointer', backgroundColor: '#6a1aab', color: 'white', fontSize: '1.2em', 
        fontWeight: 'bold', transition: 'background-color 0.3s ease', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' 
    };
    const errorStyle = { 
        color: '#ff6b6b', marginBottom: '15px', fontSize: '0.9em' 
    };
    const linkStyle = { 
        color: '#9370db', textDecoration: 'none', marginTop: '15px', display: 'block', fontSize: '0.9em' 
    };

    return (
        <div style={formContainerStyle}>
            <h2 style={{ color: '#f0f0f0', marginBottom: '25px', fontSize: '2em' }}>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={errorStyle}>{error}</p>}
                <input 
                    type="text" 
                    placeholder="Correo Electrónico o Nombre de Usuario" 
                    value={emailOrUsername} 
                    onChange={(e) => setEmailOrUsername(e.target.value)} 
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
                <button type="submit" style={buttonStyle}>Acceder</button>
            </form>
            <Link to="/register" style={linkStyle}>¿No estás registrado? Crea una cuenta</Link>
        </div>
    );
}

export default Login;