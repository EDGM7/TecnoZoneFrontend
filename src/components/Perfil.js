import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs'; // Importa bcryptjs para hashear la contraseña


const Perfil = ({ usuario, onSave }) => {
  const [datosUsuario, setDatosUsuario] = useState({
    name: '',
    lastName: '',
    correo: '',
    password: '',
    telefono: '',
    direccion: ''
  });

  useEffect(() => {
    // Verificar si el usuario está definido y no es null
    if (usuario && Object.keys(usuario).length > 0) {
      setDatosUsuario(usuario);
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosUsuario({ ...datosUsuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hashear la contraseña antes de enviarla al servidor
      const hashedPassword = await bcrypt.hash(datosUsuario.password, 10);
      // Actualizar el estado del usuario con la contraseña hasheada
      const updatedUser = { ...datosUsuario, password: hashedPassword };
      await onSave(updatedUser);
      console.log('Perfil actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '10px auto', background: 'linear-gradient(to bottom right, #02371b, #009b10)', padding: '50px 20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '10px' }}>Editar Usuario</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label" style={{ color: 'white' }}>Nombre</label>
          <input type="text" className="form-control" name="name" value={datosUsuario.name || ''} onChange={handleChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Apellido:</label>
          <input type="text" className="form-control" name="lastName" value={datosUsuario.lastName || ''} onChange={handleChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electrónico:</label>
          <input type="email" className="form-control" name="correo" value={datosUsuario.correo} onChange={handleChange} disabled />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input type="password" className="form-control" name="password" value={datosUsuario.password} onChange={handleChange} style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono:</label>
          <input type="text" className="form-control" name="telefono" value={datosUsuario.telefono || ''} onChange={handleChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección:</label>
          <input type="text" className="form-control" name="direccion" value={datosUsuario.direccion || ''} onChange={handleChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
        </div>
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#c94301', borderColor: '#00ffbf', width: '100%' }}>Guardar cambios</button>
      </form>
    </div>
  );
};

export default Perfil;
