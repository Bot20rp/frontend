import React, { useState, useEffect } from 'react';
import '../../css/AdmiCompraCss/lote.css'; // Tu archivo CSS adaptado
import { useAuth } from '../../context/AuthContext';

export const Lote = () => {
  const { productosBackend } = useAuth();
  const [productos, setProductos] = useState([]); // Todos los productos disponibles
  const [sugerencias, setSugerencias] = useState([]); // Sugerencias al buscar
  const [busquedaId, setBusquedaId] = useState(''); // Para búsqueda por ID
  const [busquedaNombre, setBusquedaNombre] = useState(''); // Para búsqueda por nombre
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Producto seleccionado
  const [cantidad, setCantidad] = useState(0); // Cantidad ingresada
  const [fechaInicio, setFechaInicio] = useState(''); // Fecha de inicio
  const [fechaVencimiento, setFechaVencimiento] = useState(''); // Fecha de vencimiento

  // Obtener productos desde el backend
  useEffect(() => {
    if (productosBackend && productosBackend.data) {
      const productosObtenidos = productosBackend.data.map((producto) => ({
        id: producto.ProductoID, 
        nombre: producto.Nombre,  
        fechaIni: producto.FechaInicio,
        fechaVenc: producto.FechaVencimiento,
        cantidad: producto.Cantidad
      }));
      setProductos(productosObtenidos);
    }
  }, [productosBackend]);

  // Buscar producto por ID
  const buscarProductoPorId = (event) => {
    const value = event.target.value;
    setBusquedaId(value);
    if (value.length > 0) {
      const resultados = productos.filter(product => product.id.toString().startsWith(value));
      setSugerencias(resultados);
    } else {
      setSugerencias([]);
    }
  };

  // Buscar producto por nombre
  const buscarProductoPorNombre = (event) => {
    const value = event.target.value;
    setBusquedaNombre(value);
    if (value.length >= 3) {
      const resultados = productos.filter(product => product.nombre.toLowerCase().startsWith(value.toLowerCase()));
      setSugerencias(resultados);
    } else {
      setSugerencias([]);
    }
  };

  // Manejar selección de producto
  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setSugerencias([]);
  };

  return (
    <div className="containerLote">
      <div className="gestionLote">
        <h2>GESTIÓN DE LOTE</h2>
        <div className="buscarProductoLote">
          <input
            type="number"
            className="inputBusquedaLote"
            placeholder="Buscar por ID"
            value={busquedaId}
            onChange={buscarProductoPorId}
          />
          <input
            type="text"
            className="inputBusquedaLote"
            placeholder="Buscar por nombre"
            value={busquedaNombre}
            onChange={buscarProductoPorNombre}
          />
        </div>

        {/* Mostrar sugerencias */}
        {sugerencias.length > 0 && (
          <ul className="sugerenciasLote">
            {sugerencias.map((producto, index) => (
              <li key={index} onClick={() => seleccionarProducto(producto)}>
                {producto.id} - {producto.nombre}
              </li>
            ))}
          </ul>
        )}

        {/* Mostrar producto seleccionado en la tabla */}
        {productoSeleccionado && (
          <div className="descripcionLotes">
            <table className="tablaLote">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th className="highlighted">Fecha Ini</th>
                  <th className="highlighted">Fecha Venc</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{productoSeleccionado.id}</td>
                  <td>{productoSeleccionado.nombre}</td>
                  <td>
                    <input 
                      type="date" 
                      value={fechaInicio} 
                      onChange={(e) => setFechaInicio(e.target.value)} 
                    />
                  </td>
                  <td>
                    <input 
                      type="date" 
                      value={fechaVencimiento} 
                      onChange={(e) => setFechaVencimiento(e.target.value)} 
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={cantidad} 
                      onChange={(e) => setCantidad(e.target.value)} 
                      placeholder="Cantidad"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <button className="guardarLoteBtn">Guardar</button>
      </div>

      {/* Otra tabla, dejar vacía */}
      <div className="consultarLotes">
        <h2>CONSULTAR LOTES DE PRODUCTOS</h2>
        <button className="ordenarLoteBtn">ACOMODAR POR MENOR TIEMPO</button>
        <table className="tablaLote">
          <thead>
            <tr>
              <th>Id</th>
              <th className="highlighted">Nombre</th>
              <th>Cantidad</th>
              <th>Fecha Vencimiento</th>
              <th>Diferencia de Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {/* Dejar vacía como solicitaste */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
