import React from 'react';
import axios from 'axios';

const Producto = ({ producto }) => {

  const handleClickFavorito = async (productoId,nombreInput,descripcionInput,categoriaInput) => {
    const correo = localStorage.getItem('usucorreo');
    console.log('productoId:',productoId);
    try {
      // Enviar una solicitud al servidor para guardar el producto como favorito
      const response = await axios.post('http://localhost:5000/api/favoritos', {
        productoId: productoId,
        userId: correo, // Usar el correo obtenido del localStorage como ID de usuario
        nombrefavor: nombreInput,
        descripcionfavor: descripcionInput,
        categoriafavor: categoriaInput      
      });
      //console.log(response.data); // Maneja la respuesta del servidor si es necesario
      alert('Producto Marcado como favorito');
    } catch (error) {
      console.error('Error al marcar como favorito:', error);
    }
  };

  // Verificar si el producto tiene una imagen, si no, usar la imagen por defecto
  const defaultImageUrl = '/uploads/imagenInput-1708116575802.jpg';
  const imagen = producto.imagenInput ? producto.imagenInput : defaultImageUrl;

  console.log(imagen);
  return (
    <div className="producto-card">
      {/* <img src={imagen} alt={producto.nombreInput} className="producto-imagen" /> */}
      <div className="producto-contenido">
        <h3 className="producto-nombre">{producto.nombreInput}</h3>
        <p className="producto-descripcion">{producto.descripcionInput}</p>
        <p className="producto-categoria">Categoría: {producto.categoriaInput}</p>
        {/* <button className="btn-favorito" onClick={() => handleClickFavorito(producto._id)}>
          <i className="fas fa-star"></i> Favorito
        </button>    */}

        <button className="btn-favorito" onClick={() => handleClickFavorito(producto._id, producto.nombreInput, producto.descripcionInput, producto.categoriaInput)}>
                  <i className="fas fa-star"></i> Favorito
         </button> 
      </div>
    </div>
  );
};

export default Producto;
