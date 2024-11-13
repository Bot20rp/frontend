import React, { useState, useEffect } from 'react';
import '../../css/AdmiInventarioCss/SalidaPage.css';
import { useAuth } from '../../context/AuthContext';
// asdf
const  SalidaPage =() => {
    const { productosBackend } = useAuth();
    const [productos, setProductos] = useState([]);
    const [formValues, setFormValues] = useState({
        Fecha: "",
        Proveedor: "",
    });
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [sugerencias, setSugerencias] = useState([]);
    const [busquedaId, setBusquedaId] = useState('');
    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const proveedores = [
        { id: "1", Nombre: "Expirado" },
        { id: "2", Nombre: "Consumo Personal" }
    ];

    const productosEjemplo = [
        { id: 1, nombre: "coca"},
        { id: 2, nombre: "sprite"},
        { id: 3, nombre: "lukake"},
        { id: 4, nombre: "agua"},
        { id: 5, nombre: "bolo"}
    ];

    const buscarProductoPorId = (event) => {
        const value = event.target.value;
        setBusquedaId(value);
        if (value.length > 0) {
            const resultados = productos.filter(product => product.id.toString().startsWith(value));
            setSugerencias(resultados);
        } else {
            setSugerencias([]);
        }
    };

    const buscarProductoPorNombre = (event) => {
        const value = event.target.value;
        setBusquedaNombre(value);
        if (value.length >= 2) { // Mostrar sugerencias cuando hay al menos 2 caracteres
            const resultados = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(value.toLowerCase())
            );
            setSugerencias(resultados);
        } else {
            setSugerencias([]);
        }
    };

    const seleccionarProducto = (producto) => {
        const productoExistente = productosSeleccionados.find(p => p.id === producto.id);
        if (productoExistente) {
            setProductosSeleccionados(
                productosSeleccionados.map(p =>
                    p.id === producto.id ? { ...p, cantidad: Number(p.cantidad) + 1 } : p
                )
            );
        } else {
            setProductosSeleccionados([...productosSeleccionados, { ...producto, cantidad: 1 }]);
        }
        setSugerencias([]);
        setBusquedaId('');
        setBusquedaNombre('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleEditarProducto = (index, value) => {
        const productosActualizados = [...productosSeleccionados];
        productosActualizados[index].cantidad = value;
        setProductosSeleccionados(productosActualizados);
    };

    const handleEliminarProducto = (index) => {
        setProductosSeleccionados(productosSeleccionados.filter((_, i) => i !== index));
    };

    const handleConfirmSalida = () => {
        setShowConfirmModal(false);
        setFormValues({ Fecha: "", Proveedor: "" });
        setProductosSeleccionados([]);
        setBusquedaId('');
        setBusquedaNombre('');
        setSugerencias([]);
    };

    const handleOpenConfirmModal = () => setShowConfirmModal(true);
    const handleCloseConfirmModal = () => setShowConfirmModal(false);

    useEffect(() => {
        if (productosBackend && productosBackend.data) {
            const productosObtenidos = productosBackend.data.map((producto) => ({
                id: producto.ProductoID,
                nombre: producto.Nombre,
                precio: producto.Precio
            }));
            setProductos(productosObtenidos);
        } else {
            setProductos(productosEjemplo);
        }
    }, [productosBackend]);

    return (
        <div className="containerSalida">
            <div className='contenedorSalida'>
                <h1 className="SalidaTitlePage">SALIDA DE PRODUCTOS</h1>
                <h2 className='titleSalida'> Registrar Salida</h2>
                <div className="Salida">
                    <input
                        className='inputSalida'
                        type="date"
                        name="Fecha"
                        placeholder="Fecha"
                        value={formValues.Fecha}
                        onChange={handleInputChange}
                    />
                    <select
                        className='inputSalida'
                        name="Proveedor"
                        value={formValues.Proveedor}
                        onChange={handleInputChange}
                    >
                        <option value="">Seleccione Tipo de Salida</option>
                        {proveedores.map((proveedor, index) => (
                            <option key={index} value={proveedor.id}>{proveedor.Nombre}</option>
                        ))}
                    </select>
                </div>
                <h2 className='titleSalida'>Productos de Salida</h2>
                <div className='paraProducto'>
                    <input
                        type="number"
                        className='insertProducto'
                        placeholder='ID del producto'
                        value={busquedaId}
                        onChange={buscarProductoPorId}
                    />
                    <input
                        type="text"
                        className='insertProducto'
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
                <h2 className='titleSalida'>Detalle de Salida</h2>
                <table className="tableProducto">
                    <thead>
                        <tr>
                            <th className='idProducto0'>ID</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosSeleccionados.map((producto, index) => (
                            <tr key={index}>
                                <td className='idProducto0'>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>
                                    <input
                                        className='inputProducto'
                                        type="number"
                                        value={producto.cantidad || 1}
                                        onChange={(e) => handleEditarProducto(index, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button className='eliminarProducto' onClick={() => handleEliminarProducto(index)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='confirmarSalida' onClick={handleOpenConfirmModal}>Confirmar Salida</button>

                {showConfirmModal && (
                    <div className="modalConfirm">
                        <div className="modalContent">
                            <h3>¿Estás seguro?</h3>
                            <p>¿Deseas confirmar la salida de los productos seleccionados?</p>
                            <button className='confirmarSalida2'onClick={handleConfirmSalida}>Confirmar Salida</button>
                            <button className='cancelarSalida'onClick={handleCloseConfirmModal}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SalidaPage;
