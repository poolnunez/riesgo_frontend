import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    background: 'rgba(30, 0, 60, 0.8)', // Fondo oscuro semitransparente
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '15px 20px', // Reducido el padding horizontal para más espacio
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    position: 'fixed', // Fija el navbar en la parte superior
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 100, // Asegura que esté por encima del contenido
    boxSizing: 'border-box' // Para que el padding no cause desbordamiento
 };

  const logoStyle = {
    fontSize: '1.6em', // Reducido el tamaño de la fuente del logo
    fontWeight: 'bold',
    color: '#9370db', // Morado más claro para el logo
    textDecoration: 'none'
 };

  const linkContainerStyle = {
    display: 'flex',
    gap: '15px', // Reducido el espacio entre los enlaces
    flexWrap: 'wrap', // Permite que los enlaces se envuelvan en pantallas pequeñas
    justifyContent: 'flex-end', // Alinea los enlaces a la derecha si se envuelven
 };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1em', // Ligeramente reducido para mayor consistencia
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  const linkHoverStyle = {
    backgroundColor: 'rgba(147, 112, 219, 0.2)', // Fondo morado claro al pasar el mouse
  };


  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>MindSupport</Link>
      <div style={linkContainerStyle}>
        {/* "Inicio" ahora lleva a la página de bienvenida con el disclaimer */}
         <Link to="/bienvenida" style={linkStyle} onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}>Bienvenida</Link>
        {/* "Cuestionario" ahora es la página de inicio por defecto */}
        <Link to="/" style={linkStyle} onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}>Cuestionario</Link>
        <Link to="/register" style={linkStyle} onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}>Registro</Link>
        <Link to="/login" style={linkStyle} onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}>Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;