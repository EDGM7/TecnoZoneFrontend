import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Perfil from './Perfil';
import ListaUsuarios from './ListaUsuarios';
import ListaProductos from './ListaProductos';
import RegistroProducto from './RegistroProducto';
import EditarProducto from './EditarProducto';
import GaleriaProductos from './GaleriaProductos'; 
import Listafavoritos from './Listafavoritos'; 

const HomePage = ({ loggedIn }) => {
  const [formularioActivo, setFormularioActivo] = useState(null);
  const [usuario, setUsuario] = useState({
    name: '',
    lastName: '',
    correo: '',
    password: '',
    telefono: '',
    direccion: ''
  });
  const [messagex, setMessagex] = useState('');
  const correo = localStorage.getItem('usucorreo');

  useEffect(() => {
    if (formularioActivo === 'perfil') {
      obtenerDatosUsuario();
    }
  }, [formularioActivo]);

  const obtenerDatosUsuario = async () => {
    try {
      if (!correo) {
        console.error('Correo del usuario no encontrado en el localStorage');
        return;
      }
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        params: {
          correo: correo
        }
      });
      setUsuario(response.data);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };
 
  const handleGuardarCambios = async (nuevosDatosUsuario) => {
    try {
      if (!correo) {
        console.error('Correo del usuario no encontrado en el localStorage');
        return;
      }
      await axios.put('http://localhost:5000/api/users/profile', nuevosDatosUsuario);
      setMessagex('Perfil actualizado con éxito!!');
      setFormularioActivo(null);
      obtenerDatosUsuario();
      setTimeout(() => {
        setMessagex('');
      }, 3000);
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  const mostrarFormularioEditarPerfil = () => {
    setFormularioActivo('perfil');
  };

  const mostrarListaDeUsuarios = () => {
    setFormularioActivo('listaUsuarios');
  };

  const mostrarFormularioRegistroProductos = () => {
    setFormularioActivo('registroProductos');
  };

  const mostrarListaProductos = () => {
    setFormularioActivo('listaProductos');
  };

   const mostrarFormularioEditarProductos = () => {
    setFormularioActivo('editaProductos');
  };


  const mostrarProductos = () => {
    setFormularioActivo('galeria');
  };

  const mostrarFavoritos = () => {
    setFormularioActivo('favoritos');
  };

  

  return (
    <div style={{ display: 'flex' }}>
      {loggedIn && <Topbar />}
      <div style={{ flex: '1', padding: '0', display: 'flex' }}>
        <Sidebar 
          setMostrarListaUsuarios={mostrarListaDeUsuarios} 
          setMostrarRegistroProductos={mostrarFormularioRegistroProductos} 
          setMostrarListaProductos={mostrarListaProductos}     
          setMostrarEditarProductos={mostrarFormularioEditarProductos} 
          setMostrarProductos={mostrarProductos}          
          setMostrarFavoritos={mostrarFavoritos}  
    
        />
        <div style={{ flex: '1', padding: '0 20px', minHeight: 'calc(100vh - 80px)' }}>
         
        {formularioActivo === null && (
            <button
              onClick={mostrarFormularioEditarPerfil}
              style={{
                backgroundColor: '#02371b',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                cursor: 'pointer',
                outline: 'none',
                marginTop: '10px',
              }}
            >
              Editar perfil
            </button>
          )}
         {formularioActivo === 'galeria' && (
           <GaleriaProductos/>
         )}      

          {formularioActivo === 'perfil' && (
            <Perfil usuario={usuario} onSave={handleGuardarCambios} />
          )}
          {formularioActivo === 'listaUsuarios' && (
            <ListaUsuarios />
          )}
          {formularioActivo === 'registroProductos' && (
            <RegistroProducto />
          )}
          {formularioActivo === 'listaProductos' && (
            <ListaProductos />
          )}
           {formularioActivo === 'editaProductos' && (
            <EditarProducto />
          )}
          {formularioActivo === 'favoritos' && (
            <Listafavoritos />
          )}
          {messagex && <div className="alert alert-info">{messagex}</div>}
         
        </div>
      </div>
    </div>
  );
  
  
  
};

export default HomePage;
