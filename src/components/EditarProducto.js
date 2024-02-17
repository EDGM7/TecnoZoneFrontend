import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarProducto = ({ producto,onSave}) => {

  
  const [datosProducto, setDatosProducto] = useState({
    nombreInput: '',
    descripcionInput: '',
    cantidadInput: 0,
    precio: 0
  });

  useEffect(() => {
    // Verificar si el producto está definido y no es null
    if (producto && Object.keys(producto).length > 0) {
      setDatosProducto(producto);
    }
  }, [producto]);

  const handleChangepro = (e) => {
    const { name, value } = e.target;
    setDatosProducto({ ...datosProducto, [name]: value });
  };
  const handleSubmitpro = async (e) => {
    e.preventDefault();
    try {
      const updatedProducto = { ...datosProducto };
      await onSave(updatedProducto);
      console.log('Producto actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el Producto:', error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '10px auto', background: 'linear-gradient(to bottom right, #02371b, #009b10)', padding: '50px 20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>
    
      <h2 style={{ color: 'white' }}>Editar Producto</h2>
      <form onSubmit={handleSubmitpro} encType="multipart/form-data">
        <div className="mb-3">
          <label style={{ color: 'white' }}>Nombre:</label>
          <input type="text" className="form-control" name="nombreInput" value={datosProducto.nombreInput} onChange={handleChangepro} style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }}/>
        </div>

        <div className="mb-3">
          <label style={{ color: 'white' }}>Descripción:</label>
          <textarea className="form-control" name="descripcionInput" value={datosProducto.descripcionInput} onChange={handleChangepro} style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }}/>
        </div>

        <div className="mb-3">
          <label style={{ color: 'white' }}>Precio:</label>
          <input type="number" className="form-control" name="precio" value={datosProducto.precio} onChange={handleChangepro} style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }}/>
        </div>
        <div className="mb-3">
          <label style={{ color: 'white' }}>Cantidad:</label>
          <input type="number" className="form-control" name="cantidadInput" value={datosProducto.cantidadInput} onChange={handleChangepro} style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }}/>
        </div>        
     
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#c94301', borderColor: '#00ffbf', width: '100%' }}>Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;
