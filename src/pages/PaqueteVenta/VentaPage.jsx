import React, { useState,useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../css/AdmiVentaCss/VentaPage.css';

function VentaPage() {

  const { productosBackend } = useAuth();
  const [producto, setProductos] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);
  const [busquedaId, setBusquedaId] = useState('');
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [productosEnVenta, setProductosEnVenta] = useState([]);
  const [pagoQR, setPagoQR] = useState([]);
  const [pagoEfectivo, setPagoEfectivo] = useState([]);
  const [pagoTarjeta, setPagoTarjeta] = useState([]);
  const [mostrarQR, setMostrarQR] = useState(false);
  const [mostrarEfectivo, setMostrarEfectivo] = useState(false);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [fechaVenta,setFechaVenta] = useState(new Date().toISOString().split('T')[0]);

  const seleccionarProducto = (producto) => {
    const productoExistente = productosEnVenta.find((p) => p.id === producto.id);

    if (productoExistente) {
      const productosActualizados = productosEnVenta.map((p) =>
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
      const resultados = producto.filter((product) =>
        product.nombre.toLowerCase().startsWith(value.toLowerCase())
      );
      setSugerencias(resultados);
    } else {
      setSugerencias([]);
    }
  };

  const buscarProductoPorId = (event) => {
    const value = event.target.value;
    setBusquedaId(value);

    if (value.length > 0) {
      const resultados = producto.filter((prod) => prod.id.toString().startsWith(value));
      setSugerencias(resultados);
    } else {
      setSugerencias([]);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const nuevoValor = value === '' ? '' : Math.max(0, value);

    const nuevoProducto = [...productosEnVenta];
    nuevoProducto[index][name] = nuevoValor;
    nuevoProducto[index].importe = nuevoValor ? nuevoValor * nuevoProducto[index].precio : 0;

    setProductosEnVenta(nuevoProducto);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = productosEnVenta.filter((_, i) => i !== index);
    setProductosEnVenta(newProducts);
  };

  const handleAddQR = () => {
    const totalRestante = totalVenta - totalPago;
    setPagoQR([...pagoQR, totalRestante > 0 ? totalRestante : 0]);
  };

  const handleAddEfectivo = () => {
    const totalRestante = totalVenta - totalPago;
    setPagoEfectivo([...pagoEfectivo, totalRestante > 0 ? totalRestante : 0]);
  };

  const handleAddTarjeta = () => {
    const totalRestante = totalVenta - totalPago;
    setPagoTarjeta([...pagoTarjeta, totalRestante > 0 ? totalRestante : 0]);
  }



  const handleQRChange = (index, value) => {
    const updatedQR = [...pagoQR];
    updatedQR[index] = Number(value);
    setPagoQR(updatedQR);
  };

  const handleTarjetaChange = (index, value) => {
    const updatedTarjeta = [...pagoTarjeta];
    updatedTarjeta[index] = Number(value);
    setPagoTarjeta(updatedTarjeta);
  };

  const handleEfectivoChange = (index, value) => {
    const updatedEfectivo = [...pagoEfectivo];
    updatedEfectivo[index] = Number(value);
    setPagoEfectivo(updatedEfectivo);
  };

  const handleRemoveQR = (index) => {
    setPagoQR(pagoQR.filter((_, i) => i !== index));
  };

  const handleRemoveEfectivo = (index) => {
    setPagoEfectivo(pagoEfectivo.filter((_, i) => i !== index));
  };

  const handleRemoveTarjeta = (index) => {
    setPagoTarjeta(pagoTarjeta.filter((_, i) => i !== index));
  }

  const handleChangeVenta = (e) =>{
    setFechaVenta(e.target.value)
  }

  const totalVenta = productosEnVenta.reduce(
    (total, producto) => total + producto.cantidad * producto.precio,
    0
  );

  const totalPago = pagoQR.reduce((sum, amount) => sum + amount, 0) +
    pagoEfectivo.reduce((sum, amount) => sum + amount, 0)+
    pagoTarjeta.reduce((sum,amount) => sum +amount, 0);

    useEffect(() => {
      if (productosBackend && productosBackend.data) {
          const productosObtenidos = productosBackend.data.map((producto) => ({
              id: producto.ProductoID,
              nombre: producto.Nombre,
              precio: producto.Precio
          }));

          setProductos(productosObtenidos);
      }
  }, [productosBackend]);

  const handleVentaChange = () => {
    try {
      const datos = {
        fechaVenta,
        pagoQR,
        pagoEfectivo,
        pagoTarjeta,
        productosEnVenta,
        totalVenta
      }

      console.log(datos)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='contPrincipalVenta'>
      <div className='facturaPrincipal'>
        <div>
          <h1>Facturación</h1>
        </div>
        <div id='fact1'>
          <input 
          type="date"
          value = {fechaVenta}
          onChange={handleChangeVenta}
          />
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
        <div className="facturaPrincipal45">
          <div id="fact4">
            <table id="table4">
              <thead>
                <tr>
                  <th className="codigo">Codigo</th>
                  <th className="descripcion">Descripcion</th>
                  <th className="precio">Precio</th>
                  <th className="cantidad">Cantidad</th>
                  <th className="importe">Importe</th>
                </tr>
              </thead>
              <tbody>
                {productosEnVenta.map((product, index) => (
                  <tr key={index}>
                    <td className="codigo">{product.id}</td>
                    <td className="descripcion">{product.nombre}</td>
                    <td className="precio">{product.precio}</td>
                    <td className="cantidad">
                      <input
                        type="number"
                        name="cantidad"
                        value={product.cantidad}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </td>
                    <td className="importe">
                      {product.cantidad * product.precio}
                    </td>
                    <td className="accion">
                      <button onClick={() => handleRemoveProduct(index)}>x</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h3>Detalle De Pago</h3>
        <div id='fact5'>
          <button onClick={() => { setMostrarTarjeta(true); handleAddTarjeta(); }}>TARJETA</button>
          <button onClick={() => { setMostrarEfectivo(true); handleAddEfectivo(); }}>EFECTIVO</button>
          <button onClick={() => { setMostrarQR(true); handleAddQR(); }}>QR</button>
        </div>

        {mostrarTarjeta && (
          <div>
            {pagoTarjeta.length > 0 && <h2>Pagos por Tarjeta</h2>}
            {pagoTarjeta.map((amount, index) => (
              <div key={`qr-${index}`} className='MetodoPago'>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleTarjetaChange(index, e.target.value)}
                  placeholder="Pago con Tarjeta"
                />
                <button onClick={() => handleRemoveTarjeta(index)}>x</button>
              </div>
            ))}
          </div>
        )}


        {mostrarEfectivo && (
          <div>
            {pagoEfectivo.length > 0 && <h2>Pagos por Efectivo</h2>}
            {pagoEfectivo.map((amount, index) => (
              <div key={`efectivo-${index}`} className='MetodoPago' >
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleEfectivoChange(index, e.target.value)}
                  placeholder="Pago en Efectivo"
                />
                <button onClick={() => handleRemoveEfectivo(index)}>x</button>
              </div>
            ))}
          </div>
        )}

        {mostrarQR && (
          <div>
            {pagoQR.length > 0 && <h2>Pagos por QR</h2>}
            {pagoQR.map((amount, index) => (
              <div key={`qr-${index}`} className='MetodoPago'>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleQRChange(index, e.target.value)}
                  placeholder="Pago con QR"
                />
                <button onClick={() => handleRemoveQR(index)}>x</button>
              </div>
            ))}
          </div>
        )}

        <h3 id='pago'>TOTAL PAGO BS: {totalPago.toFixed(2)}</h3>
      </div>

      <div className='detalleFactura'>
        <h1>Resumen</h1>
        <div id='resumen'>
          <h3 id='textVenta'>Detalles De Venta</h3>
          <h3 >Total Bs: {totalVenta.toFixed(2)}</h3>
        </div>
        <div id='pedidos'>
          <h3 id='textVenta'>Pedidos Carrito</h3>
        </div>
        <button id='siguiente' onClick={handleVentaChange}> siguiente</button>
      </div>
    </div>
  );
}

export default VentaPage;
