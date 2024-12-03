import React, { useState, useEffect } from 'react';
import '../../css/AdmiCompraCss/lote.css';
import { useAuth } from '../../context/AuthContext';
import { insertarLotes } from '../../api/auth';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const Lote = () => {
  const { productosBackend, tableLotes } = useAuth();
  const [productos, setProductos] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);
  const [busquedaId, setBusquedaId] = useState('');
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [productosTabla, setProductosTabla] = useState([]);
  const [lotesConsultados, setLotesConsultados] = useState([]); // Nuevo estado para los lotes

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

  useEffect(() => {
    if (tableLotes && tableLotes.data) {
      const lotes = tableLotes.data.map(lote => ({
        loteId: lote.LoteID,
        cantidad: lote.Cantidad,
        fechaExpiracion: new Date(lote.FechaExpiracion),
        nombre: lote.Nombre
      }));
      setLotesConsultados(lotes);
    }
  }, [tableLotes]);

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

  const seleccionarProducto = (producto) => {
    const productoExistente = productosTabla.find(p => p.id === producto.id);
    if (productoExistente) {
      const nuevosProductos = productosTabla.map(p =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setProductosTabla(nuevosProductos);
    } else {
      setProductosTabla([
        ...productosTabla,
        {
          id: producto.id,
          nombre: producto.nombre,
          fechaInicio: '',
          fechaVencimiento: '',
          cantidad: 1,
        },
      ]);
    }
    setBusquedaId('');
    setBusquedaNombre('');
    setSugerencias([]);
  };

  const manejarCambioProducto = (index, campo, valor) => {
    const nuevosProductos = [...productosTabla];
    nuevosProductos[index] = {
      ...nuevosProductos[index],
      [campo]: valor
    };
    setProductosTabla(nuevosProductos);
  };

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
      console.log(error);
    }
  };

  const acomodarPorTiempo = () => {

    
    const hoy = new Date();
    const lotesOrdenados = [...lotesConsultados].sort((a, b) => a.fechaExpiracion - b.fechaExpiracion);
    setLotesConsultados(lotesOrdenados.map(lote => ({
      ...lote,
      diferenciaTiempo: Math.ceil((lote.fechaExpiracion - hoy) / (1000 * 60 * 60 * 24)) // Días restantes
    })));
  };
 /* const generarReportePDF = () => {
    const doc = new jsPDF();
 
    doc.text('Reporte de Lotes', 14, 10);
    doc.autoTable({
    head :[ ['ID', 'Nombre', 'Cantidad', 'fechaExpiracion', 'diferenciaTiempo']],
    body : lotesConsultados.map((lote) => [
      lote.loteId,
      lote.nombre,
      lote.cantidad,
      lote.fechaExpiracion,
      lote.diferenciaTiempo
    ]),
});
    doc.save('ReporteLote.pdf');
};*/

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
              <li key={index} onClick={() => seleccionarProducto(producto)}>
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

      <div className="consultarLotes">
        <h2>CONSULTAR LOTES DE PRODUCTOS</h2>
        <button className="ordenarLoteBtn" onClick={acomodarPorTiempo}>ACOMODAR POR MENOR TIEMPO</button>
    {/*    <button onClick={generarReportePDF}>Reporte Lote </button>*/}
        <table className="tablaLote">
          <thead>
            <tr>
              <th>Id</th>
              <th className="highlighted">Nombre</th>
              <th>Cantidad</th>
              <th>Fecha Vencimiento</th>
              <th>Diferencia de Tiempo (días)</th>
            </tr>
          </thead>
          <tbody>
            {lotesConsultados.map((lote, index) => (
              <tr key={index}>
                <td>{lote.loteId}</td>
                <td>{lote.nombre}</td>
                <td>{lote.cantidad}</td>
                <td>{lote.fechaExpiracion.toLocaleDateString()}</td>
                <td>{lote.diferenciaTiempo >= 0 ? lote.diferenciaTiempo : `Expirado ${lote.diferenciaTiempo}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
