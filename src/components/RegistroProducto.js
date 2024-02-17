import React, { useState } from 'react';
import axios from 'axios';

const RegistroProducto = () => {
  const [producto, setProducto] = useState({
    nombreInput: '',
    descripcionInput: '',
    cantidadInput: 0,
    categoriaInput: '',
    imagenInput: null,
    precio: 0
  });

  const handleChange = (e) => {
    if (e.target.name === 'imagen') {
      setProducto({ ...producto, [e.target.name]: e.target.files[0] });
    } else {
      setProducto({ ...producto, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nombreInput', producto.nombreInput);
      formData.append('descripcionInput', producto.descripcionInput);
      formData.append('cantidadInput', producto.cantidadInput);
      formData.append('categoriaInput', producto.categoriaInput);
      formData.append('imagenInput', producto.imagenInput);
      formData.append('precio', producto.precio);

      await axios.post('http://localhost:5000/api/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Producto registrado correctamente');

       // Ocultar el formulario de registro después de un registro exitoso
      setTimeout(() => {   
        window.location.reload(); // Recargar la página después de 2 segundos
      }, 2000); // Espera 2 segundos antes de ocultar el formulario


    } catch (error) {
      console.error('Error al registrar el producto:', error);
      alert('Error al registrar el producto. Por favor, inténtalo de nuevo.');
    }
  };

  const handleChangeFile = (e) => {
    setProducto({ ...producto, imagenInput: e.target.files[0] });
  };
  

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '10px auto', background: 'linear-gradient(to bottom right, #02371b, #009b10)', padding: '50px 20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>
    <h2 style={{ color: 'white' }}>Registrar Producto</h2>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-3">
        <label htmlFor="nombreInput" className="form-label" style={{ color: 'white' }}>Nombre</label>
        <input type="text" className="form-control" id="nombreInput" name="nombreInput" value={producto.nombreInput} onChange={handleChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
      </div>
      <div className="mb-3">
        <label htmlFor="descripcionInput" className="form-label" style={{ color: 'white' }}>Descripción</label>
        <textarea className="form-control" id="descripcionInput" name="descripcionInput" value={producto.descripcionInput} onChange={handleChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }}/>
      </div>
      <div className="mb-3">
        <label htmlFor="cantidadInput" className="form-label" style={{ color: 'white' }}>Cantidad</label>
        <input type="number" className="form-control" id="cantidadInput" name="cantidadInput" value={producto.cantidadInput} onChange={handleChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }}/>
      </div>
      <div className="mb-3">
        <label htmlFor="precio" className="form-label" style={{ color: 'white' }}>Precio</label>
        <input type="number" className="form-control" id="precio" name="precio" value={producto.precio} onChange={handleChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }}/>
      </div>
      <div className="mb-3">
        <label htmlFor="categoriaInput" className="form-label" style={{ color: 'white' }}>Categoría</label>
        <select className="form-control" id="categoriaInput" name="categoriaInput" value={producto.categoriaInput} onChange={handleChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }}>
          <option value="">Selecciona una categoría</option>
          <option value="SmartTV">Smart TV</option>
          <option value="Laptops">Laptops</option>
          <option value="Telefonos">Teléfonos</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="imagenInput" className="form-label" style={{ color: 'white' }}>Imagen</label>
        <input type="file" className="form-control" id="imagenInput" name="imagenInput" onChange={handleChangeFile} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }}/>
      </div>
      <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#c94301', borderColor: '#00ffbf', width: '100%' }}>Registrar</button>
    </form>
  </div>
  
  );
};

export default RegistroProducto;
