import React, { useState } from 'react';

const Filtros = ({ onFiltroChange }) => {
  // Estado local para los filtros
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroDescripcion, setFiltroDescripcion] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');

  // Función para manejar cambios en los filtros
  const handleFiltroNombreChange = (e) => {
    const valor = e.target.value;
    setFiltroNombre(valor);
    onFiltroChange({ nombrepro: valor });
  };

  const handleFiltroDescripcionChange = (e) => {
    const valor = e.target.value;
    setFiltroDescripcion(valor);
    onFiltroChange({ descripcionpro: valor });
  };

  const handleFiltroCategoriaChange = (e) => {
    const valor = e.target.value;
    setFiltroCategoria(valor);
    onFiltroChange({ categoria: valor });
  };

  return (
    <div className="contenedor-principal">
      <div className="filtros-container">
        <h2 className="filtros-title">Buscar Productos</h2>
        <div className="filtros-flex-container">
          <input
            className="filtro-input"
            type="text"
            placeholder="Filtrar por nombre..."
            value={filtroNombre}
            onChange={handleFiltroNombreChange}
          />
          <input
            className="filtro-input"
            type="text"
            placeholder="Filtrar por descripción..."
            value={filtroDescripcion}
            onChange={handleFiltroDescripcionChange}
          />
          <select
            className="filtro-select"
            value={filtroCategoria}
            onChange={handleFiltroCategoriaChange}
          >
            <option value="">Categorías</option>
            <option value="SmartTV">Smart TV</option>
            <option value="Laptops">Laptops</option>
            <option value="Telefonos">Teléfonos</option>
          </select>
        </div>
      </div>     
    </div>
  );
  
  
};

export default Filtros;