import React, { useState } from 'react'
import '../../css/AdmiVentaCss/ComprobantesPage.css'
import { obtenerComprobantes } from '../../api/auth';

function ComprobantesPage() {

  const [fechaHasta, setFechaHasta] = useState(new Date().toISOString().split('T')[0]);
  const [fechaNoPasar, setFechaNoPasar] = useState(new Date().toISOString().split('T')[0]);
  const [fechaDesde, setFechaDesde] = useState('');

  const handleChangeVenta = (e) => {
    setFechaVenta(e.target.value)
  }

  const handleFechaHasta = (event) => {
    setFechaHasta(event.target.value)
  }
  const handleFechaDesde = (event) => {
    setFechaDesde(event.target.value)
  }

  const handleComprobantes = async() => {
    if(fechaHasta >fechaNoPasar || fechaDesde > fechaNoPasar ){
      return alert('Las Fechas no son correspondidas')

    }else{

      try {
        const datos ={
          fechaDesde,
          fechaHasta
        }
        const respuesta = await obtenerComprobantes(datos)
        console.log(respuesta)
      } catch (error) {
        console.log(error)
      }
      
    }
  }

  return (
    <div className='comprobantes'>
      <h1>Listado de Comprobantes</h1>
      <h4>Cliente</h4>

      <div>
        <input type="text" placeholder='NIT' />
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
        </table>
      </div>

    </div>
  )
}

export default ComprobantesPage
