import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = ({ onLogout }) => {
  // Elimina la importación de useHistory

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Llama a la función de cierre de sesión pasada como prop
    onLogout();
    // Elimina la sesión del almacenamiento local
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('usucorreo');
    // Redirige al usuario a la página de inicio de sesión
    window.location.href = '/'; // Usa window.location.href para redirigir
  };
  return (
    <div style={{ backgroundColor: '#02371b', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h3>TecnoZone</h3>
      </div>
      <div> 
        <Link to="#" onClick={handleLogout} className="topbar-link">Salir</Link>
      </div>
    </div>
  );
};

export default Topbar;