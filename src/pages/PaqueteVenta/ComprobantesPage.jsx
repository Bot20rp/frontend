import React, { useState } from 'react'
import '../../css/AdmiVentaCss/ComprobantesPage.css'
import { FaPrint } from "react-icons/fa";
import { obtenerComprobantes, imprimirFactura} from '../../api/auth';

function ComprobantesPage() {
  const [fechaHasta, setFechaHasta] = useState(new Date().toISOString().split('T')[0]);
  const [fechaNoPasar, setFechaNoPasar] = useState(new Date().toISOString().split('T')[0]);
  const [fechaDesde, setFechaDesde] = useState('');
  const [tableComprobantes, setTableComprobantes] = useState([]);
  const [tableComprobantesOriginal, setTableComprobantesOriginal] = useState([]); // Guardar la lista original para el filtrado

  const handleFechaHasta = (event) => {
    setFechaHasta(event.target.value);
  };

  const handleFechaDesde = (event) => {
    setFechaDesde(event.target.value);
  };

  const handleComprobantes = async () => {
    if (fechaHasta > fechaNoPasar || fechaDesde > fechaNoPasar || fechaDesde === '') {
      return alert('Las Fechas no son válidas');
    } else {
      try {
        const datos = { fechaDesde, fechaHasta };
        const respuesta = await obtenerComprobantes(datos);
        const comprobantesObtenidos = respuesta.data.map((comprobantes) => ({
          tipoVenta: comprobantes.tipoVenta,
          comprobante: comprobantes.comprobante,
          fechaComprobante: comprobantes.fecha,
          monto: comprobantes.montoTotal,
          cliente: comprobantes.cliente,
        }));
        setTableComprobantes(comprobantesObtenidos);
        setTableComprobantesOriginal(comprobantesObtenidos); // Guardar la lista original para el filtro
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filtrarTablaComprobantes = (event) => {
    const textoBusqueda = event.target.value.toLowerCase();
    if (textoBusqueda === '') {
      setTableComprobantes(tableComprobantesOriginal); // Restaurar la lista original si el campo está vacío
    } else {
      const comprobantesFiltrados = tableComprobantesOriginal.filter((comprob) =>
        comprob.cliente.toLowerCase().includes(textoBusqueda)
      );
      setTableComprobantes(comprobantesFiltrados); // Actualizar la lista con los comprobantes filtrados
    }
  };

  const handleImprimirFactura = async(index) => {
    const comprobanteSeleccionado = tableComprobantes[index].comprobante;
    try {

      await imprimirFactura(Number(comprobanteSeleccionado));
      
    } catch (error) {
      console.log(error)
      alert('Se produjo un error al imprimir: Consulte a su mannagger')
    }
    console.log(`Número de comprobante a imprimir: ${comprobanteSeleccionado}`);
  };
  

  return (
    <div className='comprobantes'>
      <h1>Listado de Comprobantes</h1>
      <h4>Cliente</h4>

      <div>
        <input
          type="text"
          placeholder='Ingresar nombre del cliente'
          onChange={filtrarTablaComprobantes}
        />
      </div>

      <div className='gestion'>
        <div id='xxiv'>
          <h4>Desde</h4>
          <input
            type="date"
            value={fechaDesde}
            onChange={handleFechaDesde}
          />
        </div>
        <div id='xxiv'>
          <h4>Hasta</h4>
          <input
            type="date"
            value={fechaHasta}
            onChange={handleFechaHasta}
          />
        </div>
      </div>

      <button onClick={handleComprobantes}>Listar</button>

      <h1>Comprobantes</h1>

      <div className='tablaComprobantes'>
        <table>
          <thead>
            <tr>
              <th>Tipo Venta</th>
              <th>Fecha</th>
              <th>Comprobante</th>
              <th>Cliente</th>
              <th>Monto Total</th>
              <th>Ver/Imprimir</th>
            </tr>
          </thead>
          <tbody>
            {tableComprobantes.map((comprob, index) => (
              <tr key={index}>
                <td>{comprob.tipoVenta}</td>
                <td>{comprob.fechaComprobante}</td>
                <td>{comprob.comprobante}</td>
                <td>{comprob.cliente}</td>
                <td>{comprob.monto}</td>
                <td>
                  <button onClick={() => handleImprimirFactura(index)} > <FaPrint /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComprobantesPage;
