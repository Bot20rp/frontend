import React from 'react'
import { obtenerDetalleFactura } from '../../api/auth'

function DetalleFacturaPage() {

  const [fechaHasta, setFechaHasta] = useState(new Date().toISOString().split('T')[0]);
  const [fechaNoPasar, setFechaNoPasar] = useState(new Date().toISOString().split('T')[0]);
  const [fechaDesde, setFechaDesde] = useState('');
  const [tableFacturas, setTableFacturas] = useState([]);
  const [tableFacturasOriginal, setTableFacturasOriginal] = useState([]); // Guardar la lista original para el filtrado

  const handleFechaHasta = (event) => {
    setFechaHasta(event.target.value);
  };

  const handleFechaDesde = (event) => {
    setFechaDesde(event.target.value);
  };

  const handleFacturas = async() =>{
    if (fechaHasta > fechaNoPasar || fechaDesde > fechaNoPasar || fechaDesde === '') {
      return alert('Las Fechas no son válidas');
    } else {
      try {
        const datos = { fechaDesde, fechaHasta };
        const respuesta = await obtenerDetalleFactura(datos);
        const facturasObtenidas = respuesta.data.map((factura) => ({
          tipoVenta: factura.tipoVenta,
          comprobante: factura.comprobante,
          fechaComprobante: factura.fecha,
          monto: factura.montoTotal,
          cliente: factura.cliente,
          estado: factura.estado
        }));
        setTableFacturas(facturasObtenidas);
        setTableFacturasOriginal(facturasObtenidas); // Guardar la lista original para el filtro
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <div className='comprobantes'>
      <h1>Detalle de Facturas</h1>
      <h4>Nro Factura</h4>

      <div>
        <input type="text" placeholder='nro factura' />
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

      <button onClick={handleFacturas}>Listar</button>

      <h1>Facturas</h1>
      
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
              <th>Estado</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {tableFacturas.map((fact, index) => (
              <tr key={index}>
                <td>{fact.tipoVenta}</td>
                <td>{fact.fechaComprobante}</td>
                <td>{fact.comprobante}</td>
                <td>{fact.cliente}</td>
                <td>{fact.monto}</td>
                <td>{fact.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DetalleFacturaPage
