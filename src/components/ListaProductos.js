import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarProducto from './EditarProducto'; // Importa el componente EditarProducto

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsPerPage] = useState(5);
  const [pruductoEditando, setProductoEditando] = useState(null);

  useEffect(() => {
    obtenerProductos();
  }, [currentPage]);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/productos', {
        params: {
          page: currentPage,
          limit: productsPerPage
        }
      });
      setProductos(response.data.productos);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
    }
  };

  /*const handleEditarProducto = (id) => {
    // Establece el ID del producto que se está editando    
    console.log("Entro");
    localStorage.setItem('idproducto', id);
    setEditingProductId(id);
  };*/

  const editarProducto = (id) => {
    const produSeleccionado = productos.find((Producto) => Producto._id === id);
    setProductoEditando(produSeleccionado);
  };

  const handleGuardarPro = async (produSeleccionado) => {
    try {
      // Realizar la solicitud HTTP para actualizar los datos del usuario
      await axios.put('http://localhost:5000/api/productos/editar', produSeleccionado);

      // Limpiar el estado de usuarioEditando y recargar la lista de usuarios
      
      setProductoEditando(null);
      obtenerProductos(); // Llama a cargarProductos aquí
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleEliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        try {
        await axios.delete(`http://localhost:5000/api/productos/${id}`);
        obtenerProductos(); // Volver a cargar la lista de productos después de eliminar
        } catch (error) {
        console.error('Error al eliminar el producto:', error);
        }
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="lista-usuarios">
      <h2>Lista de Productos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td>{producto.nombreInput}</td>
              <td>{producto.cantidadInput}</td>
              <td>{producto.precio}</td>
              <td>
                <button className="btn btn-primary" onClick={() => editarProducto(producto._id)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleEliminarProducto(producto._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button className="btn btn-secondary" onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button className="btn btn-secondary" onClick={nextPage} disabled={currentPage === totalPages}>Siguiente</button>
      </div>

      {/* Renderizar el componente EditarProducto solo cuando hay un ID de producto en edición */}
     
      {pruductoEditando && (<EditarProducto producto={pruductoEditando} onSave={handleGuardarPro} />
      )}
    </div>
  );
};

export default ListaProductos;
