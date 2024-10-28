import React, { useState } from 'react';
import '../../css/AdmiCompraCss/compras.css';

function Compras() {
  const [Marcas, setMarcas] = useState([]);
  const [formValues, setFormValues] = useState({
    NroFactura: "",
    Fecha: "",
    CodAutoriz: "",
    CodControl: "",
    Proveedor: "",
    TInteres: "",
    TPagar: ""
  });
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sugerencias, setSugerencias] = useState([]);
  const [busquedaId, setBusquedaId] = useState('');
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [imagenes, setImagenes] = useState({});
  const [showFacturas, setShowFacturas] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [nuevaImagen, setNuevaImagen] = useState(null); // Nuevo estado para la nueva imagen

  const [productos, setProductos] = useState([
    { id: "1", nombre: "Sprite 500ml", precio: "12" },
    { id: "2", nombre: "Sprite 1L", precio: "15" },
    { id: "3", nombre: "Coca-Cola 500ml", precio: "13" },
    { id: "4", nombre: "Coca-Cola 1L", precio: "18" },
    { id: "5", nombre: "Del Valle Durazno 500ml", precio: "16" },
    { id: "6", nombre: "Del Valle Manzana 1L", precio: "20" },
    { id: "7", nombre: "Paceña 330ml", precio: "14" },
    { id: "8", nombre: "Paceña 620ml", precio: "22" },
  ]);

  const productosSeleccionadosAtributos = {
    id: "ID del producto",
    nombre: "Nombre del producto",
    precioVenta: "Precio de Venta",
    precioCosto: "Precio de Costo",
    cantidad: "Cantidad",
    tableProducto: "tableProducto",
  };

  const facturasAtributos = {
    NroFactura: "Número de Factura",
    Fecha: "Fecha",
    CodAutoriz: "Código de Autorización",
    CodControl: "Código de Control",
    Proveedor: "Proveedor",
    TInteres: "Tasa de Interés",
    TPagar: "Total a Pagar",
    imagen: "Imagen de la Factura",
    tableFactura: "Tabla de las facturas" 
  };

  const proveedores = [
    "Proveedor 1",
    "Proveedor 2",
    "Proveedor 3",
    "Proveedor 4"
  ];

  const buscarProductoPorId = (event) => {
    const value = event.target.value;
    setBusquedaId(value);
    if (value.length > 0) {
      const resultados = productos.filter(product => product.id.startsWith(value));
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
    const productoExistente = productosSeleccionados.find(p => p.id === producto.id);

    if (productoExistente) {
      const productosActualizados = productosSeleccionados.map(p =>
        p.id === producto.id
          ? { ...p, cantidad: Number(p.cantidad) + 1 }
          : p
      );
      setProductosSeleccionados(productosActualizados);
    } else {
      setProductosSeleccionados([...productosSeleccionados, { ...producto, cantidad: 1 }]);
    }
    setSugerencias([]);
    setBusquedaId('');
    setBusquedaNombre('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleNuevaCompra = () => {
    setMarcas((prevMarcas) => [
      ...prevMarcas,
      { ...formValues }
    ]);
    setFormValues({
      NroFactura: "",
      Fecha: "",
      CodAutoriz: "",
      CodControl: "",
      Proveedor: "",
      TInteres: "",
      TPagar: ""
    });
    setShowFacturas(true); // Mostrar facturas automáticamente después de registrar una nueva compra
  };

  const handleEditarProducto = (index, field, value) => {
    const productosActualizados = [...productosSeleccionados];
    productosActualizados[index] = {
      ...productosActualizados[index],
      [field]: value
    };
    setProductosSeleccionados(productosActualizados);
  };

  const handleEliminarProducto = (index) => {
    const productosActualizados = productosSeleccionados.filter((_, i) => i !== index);
    setProductosSeleccionados(productosActualizados);
  };

  const handleEditarFactura = (index) => {
    const factura = Marcas[index];
    setFormValues(factura);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleActualizarFactura = () => {
    const facturasActualizadas = [...Marcas];
    facturasActualizadas[editIndex] = { ...formValues };

    // Cambiar la imagen de la factura si hay una nueva imagen
    if (nuevaImagen) {
      const updatedImagenes = { ...imagenes, [editIndex]: nuevaImagen };
      setImagenes(updatedImagenes);
      setNuevaImagen(null); // Reiniciar el estado de nuevaImagen
    }

    setMarcas(facturasActualizadas);
    setIsEditing(false);
    setFormValues({
      NroFactura: "",
      Fecha: "",
      CodAutoriz: "",
      CodControl: "",
      Proveedor: "",
      TInteres: "",
      TPagar: ""
    });
  };
  const handleImagenChange = (event, index) => {
    const file = event.target.files[0];
    const updatedImagenes = { ...imagenes, [index]: URL.createObjectURL(file) };
    setImagenes(updatedImagenes);
  };


  const totalPrecioCompra = productosSeleccionados.reduce((total, producto) =>
    total + (producto.precioCosto * producto.cantidad), 0
  );

  return (
    <div className="containerCompraProductos">
      <div className='contenedorCompras'>
        <h1 className="compraTitlePage">COMPRA DE PRODUCTOS</h1>
        <h2 className="titleCompras">Registrar Factura</h2>

        <div className="Compra">
          <input
            className='inputCompra'
            type="number"
            name="NroFactura"
            placeholder="Nro Factura"
            value={formValues.NroFactura}
            onChange={handleInputChange}
          />
          <input
            className='inputCompra'
            type="date"
            name="Fecha"
            placeholder="Fecha"
            value={formValues.Fecha}
            onChange={handleInputChange}
          />
          <input
            className='inputCompra'
            type="text"
            name="CodAutoriz"
            placeholder="Cod. Autoriz."
            value={formValues.CodAutoriz}
            onChange={handleInputChange}
          />
          <input
            className='inputCompra'
            type="text"
            name="CodControl"
            placeholder="Cod. Control"
            value={formValues.CodControl}
            onChange={handleInputChange}
          />
          <select
            className='inputCompra'
            name="Proveedor"
            value={formValues.Proveedor}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((proveedor, index) => (
              <option key={index} value={proveedor}>{proveedor}</option>
            ))}
          </select>
          <input
            className='inputCompra'
            type="number"
            name="TInteres"
            placeholder="T/Interes"
            value={formValues.TInteres}
            onChange={handleInputChange}
          />
          <input
            className='inputCompra'
            type="number"
            name="TPagar"
            placeholder="T/Pagar"
            value={formValues.TPagar}
            onChange={handleInputChange}
          />
          <button className="NuevaCompra" onClick={handleNuevaCompra}>Registrar Compra</button>
          <button className="ListarFacturas" onClick={() => setShowFacturas(!showFacturas)}>Listar Facturas</button>
          {isEditing && (
            <>
              <button className="ActualizarCompra" onClick={handleActualizarFactura}>Actualizar Factura</button>
              <label className="ActualizarImagen">
                Cambiar Imagen
                <input
                  type="file"
                  className="input-file"
                  onChange={(e) => setNuevaImagen(URL.createObjectURL(e.target.files[0]))} // Cambiar la imagen
                />
              </label>
            </>
          )}
        </div>
        <h2 className='titleCompras'>Detalles Productos Comprados</h2>
        <div className='paraProducto'>
          <input
            type="number"
            className='InsertProducto'
            placeholder='ID del producto'
            value={busquedaId}
            onChange={buscarProductoPorId}
          />
          <input
            type="text"
            className='buscarProducto'
            placeholder='Buscar producto'
            value={busquedaNombre}
            onChange={buscarProductoPorNombre}
          />

          {sugerencias.length > 0 && (
            <ul className='sugerencias'>
              {sugerencias.map((producto, index) => (
                <li key={index} onClick={() => seleccionarProducto(producto)}>
                  {producto.id} - {producto.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>
        <h3 className='titleCompras'>Lista Productos Comprados</h3>
        <table className="tableProducto">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>PrecioVenta</th>
              <th>PrecioCosto</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosSeleccionados.map((producto, index) => (
              <tr key={index}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>
                  <input
                    className='inputProducto'
                    type="number"
                    value={producto.precioCosto || ''}
                    onChange={(e) => handleEditarProducto(index, 'precioCosto', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className='inputProducto'
                    type="number"
                    value={producto.cantidad || 1}
                    onChange={(e) => handleEditarProducto(index, 'cantidad', e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleEliminarProducto(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <label htmlFor="totalProductos">
          Total Productos:
        </label>
        <input
          className='inputTotalVenta'
          type="number"
          placeholder="Total Venta"
          value={totalPrecioCompra}
          readOnly
        />
        {showFacturas && (
          <div className='facturas'>
            <h3 className='titleCompras'>Lista de Facturas</h3>
            <table className="tableFactura">
              <thead>
                <tr>
                  <th>Nro Factura</th>
                  <th>Fecha</th>
                  <th>Cod. Autoriz.</th>
                  <th>Cod. Control</th>
                  <th>Proveedor</th>
                  <th>T/Interes</th>
                  <th>T/Pagar</th>
                  <th className='imagenFactura'>Imagen</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {Marcas.map((factura, index) => (
                  <tr key={index}>
                    <td>{factura.NroFactura}</td>
                    <td>{factura.Fecha}</td>
                    <td>{factura.CodAutoriz}</td>
                    <td>{factura.CodControl}</td>
                    <td>{factura.Proveedor}</td>
                    <td>{factura.TInteres}</td>
                    <td>{factura.TPagar}</td>
                    <td>
                      {imagenes[index] ? (
                        <img
                          src={imagenes[index]}
                          alt="Producto"
                          onClick={() => setSelectedImage(imagenes[index])}
                          className="imagenCompleta"
                        />
                      ) : (
                        <input
                          type="file"
                          onChange={(e) => handleImagenChange(e, index)}
                        />
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleEditarFactura(index)}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedImage && (
          <div className="modalImagen" onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} alt="Imagen completa" className='imagenCompleta' />
          </div>
        )}
      </div>
    </div>
  );
}

export default Compras;
