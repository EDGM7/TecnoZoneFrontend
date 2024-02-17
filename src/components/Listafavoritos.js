import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Importa el archivo CSS para aplicar estilos personalizados


const Listafavoritos = () => {
  const [productosFavoritos, setProductosFavoritos] = useState([]);
  const correo = localStorage.getItem('usucorreo');

  useEffect(() => {
    // Realizar la solicitud GET al servidor para obtener los productos favoritos del usuario actual
    const fetchProductosFavoritos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/favoritos/${correo}`);
        setProductosFavoritos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos favoritos:', error);
      }
    };

    fetchProductosFavoritos();
  }, [correo]);

  const handleClickFavorito = async (productoId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto de tu zona de favoritos?')) {
     
    try {
      // Realizar la solicitud DELETE al servidor para eliminar el producto de favoritos
      await axios.delete(`http://localhost:5000/api/favoritos/${correo}/${productoId}`);
      // Actualizar la lista de productos favoritos después de eliminar uno
      const updatedProductos = productosFavoritos.filter(producto => producto._id !== productoId);
      setProductosFavoritos(updatedProductos);
      alert('Producto eliminado de Favoritos');
    } catch (error) {
      console.error('Error al eliminar el producto de favoritos:', error);
    }
  }
  };

  return (
    <div className="productos-container">
      <h2>Tus Productos Favoritos</h2>
      {productosFavoritos.length > 0 ? (
        <div>
         {productosFavoritos.map(producto => (
          <div key={producto._id} className="producto-card">
            <div className="producto-contenido">
              <h3 className="producto-nombre">{producto.nombrefavor}</h3>
              <p className="producto-descripcion">{producto.descripcionfavor}</p>
              <p className="producto-categoria">Categoría: {producto.categoriafavor}</p>
              <button className="btn-favorito" onClick={() => handleClickFavorito(producto._id)}>
                <i className="fas fa-star"></i> Eliminar de Favoritos
              </button>
            </div>
          </div>
        ))}

        </div>
      ) : (
        <p>No tienes productos agregados como favoritos.</p>
      )}
    </div>
  );
};

export default Listafavoritos;
