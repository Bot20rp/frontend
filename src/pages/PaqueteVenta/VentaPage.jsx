import React, { useState } from 'react'
import '../../css/AdmiVentaCss/VentaPage.css'

function VentaPage() {

  const [sugerencias, setSugerencias] = useState([]);
  const [busquedaId, setBusquedaId] = useState('');
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [productosEnVenta, setProductosEnVenta] = useState([]);

  const producto = [
    {
      id: 1,
      nombre: "Coca-Cola",
      precio: 1.5
    },
    {
      id: 2,
      nombre: "Pepsi",
      precio: 1.4
    },
    {
      id: 3,
      nombre: "Agua Mineral",
      precio: 1.0
    },
    {
      id: 4,
      nombre: "Jugo de Naranja",
      precio: 2.0
    },
    {
      id: 5,
      nombre: "Té Helado",
      precio: 1.8
    },
    {
      id: 6,
      nombre: "Café Frío",
      precio: 2.5
    },
    {
      id: 7,
      nombre: "Energizante Red Bull",
      precio: 3.0
    },
    {
      id: 8,
      nombre: "Leche de Almendras",
      precio: 2.2
    },
    {
      id: 9,
      nombre: "Limonada",
      precio: 1.7
    },
    {
      id: 10,
      nombre: "Smoothie de Fresa",
      precio: 3.5
    }
  ];


  const seleccionarProducto = (producto) => {
    const productoExistente = productosEnVenta.find(p => p.id === producto.id);

    if (productoExistente) {
      const productosActualizados = productosEnVenta.map(p =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setProductosEnVenta(productosActualizados);
    } else {
      setProductosEnVenta([...productosEnVenta, { ...producto, cantidad: 1 }]);
    }
    setSugerencias([]);
    setBusquedaId('');
    setBusquedaNombre('');
  };


  const buscarProductoPorNombre = (event) => {
    const value = event.target.value;
    setBusquedaNombre(value);
    if (value.length >= 3) {
      const resultados = producto.filter(product => product.nombre.toLowerCase().startsWith(value.toLowerCase()));
      setSugerencias(resultados);
    } else {
      setSugerencias([]);
    }
  }

  const buscarProductoPorId = (event) => {
    const value = event.target.value;
    setBusquedaId(value);

    if (value.length > 0) {
      const resultados = producto.filter(prod => prod.id.toString().startsWith(value));
      setSugerencias(resultados);
    } else {
      setSugerencias([]);
    }
  };


  return (
    <div className='contPrincipalVenta'>
      <div className='facturaPrincipal'>
        <div>
          <h1>Facturación</h1>
        </div>
        <div id='fact1'>
          <input type="date" />
          <select className='seleccion'>
            <option value="TipoVenta">Venta En Tienda</option>
            <option value="TipoVenta">Venta Delivery</option>
          </select>
        </div>
        <h3>Cliente</h3>
        <div id='fact2'>
          <div id='opt'>
            <button>+</button>
            <input type="number" placeholder='NIT/CI' />
          </div>
          <input type="text" placeholder='NOMBRE' />

        </div>

        <h3>Busqueda De Producto</h3>
        <div id='fact3'>
          <input
            type="text"
            placeholder='ID del producto'
            value={busquedaId}
            onChange={buscarProductoPorId}
          />
          <input
            type="text"
            placeholder='Buscar producto'
            value={busquedaNombre}
            onChange={buscarProductoPorNombre}
          />

          {sugerencias.length > 0 && (
            <ul className='sugerenciasVenta'>
              {sugerencias.map((producto, index) => (
                <li key={index} onClick={() => seleccionarProducto(producto)}>
                  {producto.id} - {producto.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <h3>Detalle Venta</h3>

        <div id='fact4'>
          <table id='table4'>
            <thead>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Importe</th>
            </thead>
          </table>
          <tbody>
            {productosEnVenta.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.nombre}</td>
                <td>{product.precio}</td>
                <td>
                  <input
                    type='number'
                    name='cantidad'
                    value={product.cantidad}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type='number'
                    name='importe'
                    value={product.cantidad}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <button onClick={() => handleRemonveProduct(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>

        <h3>Detalle De Pago</h3>

        <div id='fact5'>
          <button>EFECTIVO</button>
          <button>QR</button>
        </div>

        <h3 id='pago'>TOTAL PAGO BS</h3>

      </div>
      <div className='detalleFactura'>
        <h1>Resumen</h1>
        <div id='resumen'>
          <h3 id='textVenta'>Detalles De Venta</h3>
        </div>
        <div id='pedidos'>
          <h3 id='textVenta'>Pedidos Carrito</h3>
        </div>
      </div>
    </div>
  )
}

export default VentaPage
