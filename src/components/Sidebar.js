import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Importa tu archivo de estilos

const correo = localStorage.getItem('usucorreo');

const Sidebar = ({ setMostrarListaUsuarios, setMostrarRegistroProductos, setMostrarListaProductos, setMostrarProductos, setMostrarFavoritos }) => {
  return (
    <div style={{ height: 'auto', width: '140px', backgroundColor: '#333', padding: '15px', display: 'flex', flexDirection: 'column', margin: 0, overflowY: 'auto' }}>    
      <ul style={{ listStyleType: 'none', padding: 0 }}>

      <li style={{ marginBottom: '15px' }}>
           <button className="sidebar-link" onClick={() => setMostrarProductos(true)}>Productos</button> {/* Llama a mostrarProductos cuando se haga clic */}
        </li>
         <li style={{ marginBottom: '15px' }}>
             <button className="sidebar-link" onClick={() => setMostrarFavoritos(true)}>Favoritos</button> {/* Llama a mostrarfavoritos cuando se haga clic */}
        </li>
        
        {correo === 'admin@gmail.com' && (
          <>
          
            
            <li style={{ marginBottom: '15px' }}>
              <button className="sidebar-link" onClick={() => setMostrarRegistroProductos(true)}>Registrar </button> {/* Llama a setMostrarRegistroProductos cuando se haga clic */}
            </li>
           
            <li style={{ marginBottom: '15px' }}>
          <button className="sidebar-link" onClick={() => setMostrarListaProductos(true)}>Consultar</button> {/* Llama a mostrarListaProductos cuando se haga clic */}
        </li>
        <li style={{ marginBottom: '15px' }}>
            <button className="sidebar-link" onClick={() => setMostrarListaUsuarios(true)}>Usuarios</button> {/* Llama a setMostrarListaUsuarios cuando se haga clic */}
          </li>
          </>
        )}
        
       
        
       
      </ul>
    </div>
  );
};

export default Sidebar;
