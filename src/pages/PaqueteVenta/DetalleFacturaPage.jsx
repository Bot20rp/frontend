import React, { useState } from 'react'
import { obtenerDetalleFactura, imprimirFactura } from '../../api/auth'
import { FaPrint } from "react-icons/fa";

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

  const handleFacturas = async () => {
    if (fechaHasta > fechaNoPasar || fechaDesde > fechaNoPasar || fechaDesde === '') {
      return alert('Las Fechas no son válidas');
    } else {
      try {
        const datos = { fechaDesde, fechaHasta };
        const respuesta = await obtenerDetalleFactura(datos);
        console.log(respuesta)
        const facturasObtenidas = respuesta.data.map((factura) => ({
          tipoVenta: factura.tipoVenta,
          comprobante: factura.comprobante,
          fechaComprobante: factura.fecha,
          monto: factura.montoTotal,
          cliente: factura.cliente,
          estado: factura.estado,
        }));
        setTableFacturas(facturasObtenidas);
        setTableFacturasOriginal(facturasObtenidas); // Guardar la lista original para el filtro
      } catch (error) {
        console.log(error);
      }
    }
  }

  const filtarTablaFactura = (event) => {
    const textoBusqueda = event.target.value.toLowerCase();
    if (textoBusqueda === '') {
      setTableFacturas(tableFacturasOriginal); // Restaurar la lista original si el campo está vacío
    } else {
      const facturasFiltradas = tableFacturasOriginal.filter((comprob) =>
        comprob.comprobante.toString().toLowerCase().includes(textoBusqueda)
      );
      setTableFacturas(facturasFiltradas); // Actualizar la lista con los comprobantes filtrados
    }
  };

  const handleImprimirFactura = async (index) => {
    const comprobanteSeleccionado = tableFacturas[index].comprobante;
    try {
      const response = await imprimirFactura({ id: Number(comprobanteSeleccionado) }); // Solicitar el PDF

      // Crear una URL temporal para el blob y abrirla
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `factura_${comprobanteSeleccionado}.pdf`; // Nombre del archivo PDF
      link.click();

      // Liberar la URL después de descargar
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      alert('Se produjo un error al imprimir: Consulte a su manager');
    }
    console.log(`Número de comprobante a imprimir: ${comprobanteSeleccionado}`);
  };




  return (
    <div className='comprobantes'>
      <h1>Detalle de Facturas</h1>
      <h4>Nro Factura</h4>

      <div>
        <input
          type="number"
          placeholder='Ingresar nro factura'
          onChange={filtarTablaFactura}
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
                <td>
                  <button onClick={() => handleImprimirFactura(index)} > <FaPrint /></button>
                </td>
                <td>{fact.estado ? "Activo" : "Inactivo"}</td>
                <td>
                  <button className={fact.estado ? "btn-anular" : "btn-anulada"} disabled={!fact.estado}>
                    {fact.estado ? "Anular" : "Anulada"}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DetalleFacturaPage
