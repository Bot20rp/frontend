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
        Producto: "",
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
          Producto: "",
          TInteres: "",
          TPagar: ""
        });
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
        setMarcas(facturasActualizadas);
        setIsEditing(false);
        setFormValues({
          NroFactura: "",
          Fecha: "",
          CodAutoriz: "",
          CodControl: "",
          Proveedor: "",
          Producto: "",
          TInteres: "",
          TPagar: ""
        });
      };
    
      const handleImagenChange = (event, index) => {
        const file = event.target.files[0];
        const updatedImagenes = { ...imagenes, [index]: URL.createObjectURL(file) };
        setImagenes(updatedImagenes);
      };
    
      return (
        <div className="containerCompraProductos">
          <div className='contenedorCompras'>
            <h1 className="compraTitlePage">COMPRA DE PRODUCTOS</h1>
            <div className="botonera">
              <button className="listarFacturas">Listar Facturas</button>
              <button className="NuevaCompra" onClick={handleNuevaCompra}>Registrar Compra</button>
              {isEditing && (
                <button className="ActualizarCompra" onClick={handleActualizarFactura}>Actualizar Factura</button>
              )}
            </div>
    
            {/* Formulario para registrar la compra */}
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
              <input
                className='inputCompra'
                type="text"
                name="Proveedor"
                placeholder="Proveedor"
                value={formValues.Proveedor}
                onChange={handleInputChange}
              />
              <input
                className='inputCompra'
                type="text"
                name="Producto"
                placeholder="Producto"
                value={formValues.Producto}
                onChange={handleInputChange}
              />
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
            </div>
    
            {/* Sección para buscar productos */}
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
    
            {/* Tabla de productos seleccionados */}
            <table className="tableProducto">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>PrecioVenta</th>
                  <th>PrecioCompra</th>
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
                        type="number"
                        value={producto.precioCompra || ""}
                        onChange={(e) => handleEditarProducto(index, "precioCompra", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={producto.cantidad}
                        onChange={(e) => handleEditarProducto(index, "cantidad", e.target.value)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEliminarProducto(index)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
    
            {/* Tabla de facturas registradas */}
            <table className="tableFacturas">
              <thead>
                <tr>
                  <th>NroFactura</th>
                  <th>Detalles</th>
                  <th>Fecha</th>
                  <th>Proveedor</th>
                  <th>Cod.Autoriz.</th>
                  <th>Cod.Control</th>
                  <th>T/Interes</th>
                  <th>T/Pagar</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Marcas.map((marca, index) => (
                  <tr key={index}>
                    <td>{marca.NroFactura}</td>
                    <td>{marca.Producto}</td>
                    <td>{marca.Fecha}</td>
                    <td>{marca.Proveedor}</td>
                    <td>{marca.CodAutoriz}</td>
                    <td>{marca.CodControl}</td>
                    <td>{marca.TInteres}</td>
                    <td>{marca.TPagar}</td>
                    <td>
                      <button onClick={() => handleEditarFactura(index)}>Editar</button>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id={`fileInput-${index}`}
                        onChange={(event) => handleImagenChange(event, index)}
                      />
                      <button onClick={() => document.getElementById(`fileInput-${index}`).click()}>Imagen</button>
                      {imagenes[index] && <img src={imagenes[index]} alt="Factura" className="imgFacturaPreview" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    export default Compras;
    