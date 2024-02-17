import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import Perfil from './Perfil'; // Importa el componente de perfil

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  // Define cargarUsuarios fuera de useEffect
  const cargarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  };

  useEffect(() => {
    cargarUsuarios(); // Llama a cargarUsuarios aquí
  }, []);

  const eliminarUsuario = async (correo) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/usuarios/${correo}`);
        cargarUsuarios();
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    }
  };

  const editarUsuario = (correo) => {
    const usuarioSeleccionado = usuarios.find((usuario) => usuario.correo === correo);
    setUsuarioEditando(usuarioSeleccionado);
  };

  const handleGuardarCambios = async (nuevosDatosUsuario) => {
    try {
      // Realizar la solicitud HTTP para actualizar los datos del usuario
      await axios.put('http://localhost:5000/api/users/profile', nuevosDatosUsuario);

      // Limpiar el estado de usuarioEditando y recargar la lista de usuarios
      setUsuarioEditando(null);
      cargarUsuarios(); // Llama a cargarUsuarios aquí
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  return (
    <div className="lista-usuarios">
      <h2>Lista de Usuarios</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Role</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.correo}>
              <td>{usuario.name}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.role}</td>
              <td>
                {usuario.role !== 'Administrador' && (
                  <>
                    <button className="btn btn-primary" onClick={() => editarUsuario(usuario.correo)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => eliminarUsuario(usuario.correo)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {usuarioEditando && (
        <Perfil usuario={usuarioEditando} onSave={handleGuardarCambios} />
      )}
    </div>
  );
};

export default ListaUsuarios;
