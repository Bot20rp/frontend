import React, { useState, useEffect } from 'react';
import '../../css/AdmiCompraCss/lote.css'; // Tu archivo CSS adaptado
import { useAuth } from '../../context/AuthContext';
import { insertarLotes } from '../../api/auth';

export const Lote = () => {
  const { productosBackend } = useAuth();
  const [productos, setProductos] = useState([]); // Todos los productos disponibles
  const [sugerencias, setSugerencias] = useState([]); // Sugerencias al buscar
  const [busquedaId, setBusquedaId] = useState(''); // Para búsqueda por ID
  const [busquedaNombre, setBusquedaNombre] = useState(''); // Para búsqueda por nombre
  const [productosTabla, setProductosTabla] = useState([]); // Productos agregados a la tabla

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

  // Manejar selección de producto y agregarlo a la tabla
  const seleccionarProducto = (producto) => {
    const productoExistente = productosTabla.find(p => p.id === producto.id);
    if (productoExistente) {
      // Si el producto ya está en la tabla, incrementamos la cantidad
      const nuevosProductos = productosTabla.map(p => 
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setProductosTabla(nuevosProductos);
    } else {
      // Si es un nuevo producto, lo agregamos con sus campos iniciales
      setProductosTabla([
        ...productosTabla,
        {
          id: producto.id,
          nombre: producto.nombre,
          fechaInicio: '',
          fechaVencimiento: '',
          cantidad: 1, // Cantidad inicial
        },
      ]);
    }
    setBusquedaId('');
    setBusquedaNombre('');
    setSugerencias([]);
  };

  // Manejar cambios en la cantidad, fecha inicio o vencimiento
  const manejarCambioProducto = (index, campo, valor) => {
    const nuevosProductos = [...productosTabla];
    nuevosProductos[index] = {
      ...nuevosProductos[index],
      [campo]: valor
    };
    setProductosTabla(nuevosProductos);
  };

  // Guardar los productos en una variable para mandar al backend
  const guardarLotes = async () => {
    const productosParaGuardar = productosTabla.map(producto => ({
      id: producto.id,
      FechaInicio: producto.fechaInicio,
      FechaVencimiento: producto.fechaVencimiento,
      Cantidad: producto.cantidad
    }));
    console.log("Productos a enviar al backend: ", productosParaGuardar);
    try {
      await insertarLotes(productosParaGuardar);
      setProductosTabla([]);
    } catch (error) {
      console.log(error)
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

        {/* Mostrar productos seleccionados en la tabla */}
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
              {productosTabla.map((producto, index) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>
                    <input 
                      type="date" 
                      value={producto.fechaInicio} 
                      onChange={(e) => manejarCambioProducto(index, 'fechaInicio', e.target.value)} 
                    />
                  </td>
                  <td>
                    <input 
                      type="date" 
                      value={producto.fechaVencimiento} 
                      onChange={(e) => manejarCambioProducto(index, 'fechaVencimiento', e.target.value)} 
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={producto.cantidad} 
                      onChange={(e) => manejarCambioProducto(index, 'cantidad', e.target.value)} 
                      placeholder="Cantidad"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="guardarLoteBtn" onClick={guardarLotes}>Guardar</button>
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
