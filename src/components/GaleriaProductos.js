import React, { useState, useEffect } from 'react';
import Producto from './Producto';
import Filtros from './Filtros';
import axios from 'axios';


const GaleriaProductos = () => {
  // Estado para almacenar la lista de productos y los filtros
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({ nombreInput: '', descripcionInput: '', categoriaInput: '' });
  
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/productos/buscar`, { params: filtros });
        setProductos(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProductos();
  }, [filtros]);
  

  const handleFiltroChange = (filtro) => {
    setFiltros({ ...filtros, ...filtro });
  };

  return (
    <div className="galeria-productos-container">
      <Filtros onFiltroChange={handleFiltroChange} />
      <div className="galeria">
      {productos.map(producto => (
        <Producto key={producto._id} producto={producto} />
      ))}
      </div>
    </div>
  );

 

};

export default GaleriaProductos;
