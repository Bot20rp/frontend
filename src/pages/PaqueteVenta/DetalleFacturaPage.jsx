import React from 'react'

function DetalleFacturaPage() {
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
          <input type="date" />
        </div>
        <div id='xxiv'>
          <h4>Hasta</h4>
          <input type="date" />
        </div>
      </div>

      <button>Listar</button>

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
            </tr>
          </thead>
        </table>
      </div>

    </div>
  )
}

export default DetalleFacturaPage
