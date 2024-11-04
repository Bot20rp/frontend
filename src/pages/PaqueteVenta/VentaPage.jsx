import React from 'react'
import '../../css/AdmiVentaCss/VentaPage.css'

function VentaPage() {
  return (
    <div className='contPrincipalVenta'>
      <div className='facturaPrincipal'>
        <div id='fact1'>
          <input type="date" />
          <select className='seleccion'>
            <option value="TipoVenta">TipoVenta</option>
            <option value="TipoVenta">VentaEnTienda</option>
            <option value="TipoVenta">VentaDelivery</option>
          </select>
        </div>
        <h3>Cliente</h3>
        <div id='fact2'>
          <input type="text" placeholder='NIT' />
          <input type="text" placeholder='NOMBRE' />
        </div>

        <h3>Busqueda De Producto</h3>
        <div id='fact3'>
          <input
            type="text"
            placeholder='ID del producto'
          />
          <input
            type="text"
            placeholder='Buscar producto'
          />
        </div>

        <h2>Detalle Venta</h2>

        <div id='fact4'>
          <table id='table4'>
            <thead>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Cantidad</th>
            </thead>
          </table>
        </div>

        <h2>Detalle De Pago</h2>
        
        <div id='fact5'>
          <button>efectivo</button>
          <button>qr</button>
        </div>

      </div>
      <div className='detalleFactura'>
        <h2>soy detalle</h2>
      </div>
    </div>
  )
}

export default VentaPage
