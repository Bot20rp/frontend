import React, { useState, useEffect } from 'react';
import '../../css/AdmiCompraCss/lote.css'; // Tu archivo CSS adaptado
import { useAuth } from '../../context/AuthContext';

export const Lote = () => {
  const { productosBackend } = useAuth();
  const [productos, setProductos] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);
  const [busquedaId, setBusquedaId] = useState('');
  const [busquedaNombre, setBusquedaNombre] = useState('');

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

        {sugerencias.length > 0 && (
          <ul className="sugerenciasLote">
            {sugerencias.map((producto, index) => (
              <li key={index}>
                {producto.id} - {producto.nombre}
              </li>
            ))}
          </ul>
        )}

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
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.fechaIni}</td>
                  <td>{producto.fechaVenc}</td>
                  <td>{producto.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="guardarLoteBtn">Guardar</button>
      </div>

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
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.fechaVenc}</td>
                <td>{/* Calcular diferencia de tiempo aquí */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
