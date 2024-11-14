import React, { useState, useEffect } from 'react';
import '../../css/AdmiInventarioCss/SalidaPage.css';
import { useAuth } from '../../context/AuthContext';
import { insertarNotaSalida } from '../../api/auth';
// asdf
const SalidaPage = () => {
    const { productosBackend, tipoSalida } = useAuth();
    const [fechaNoPasar, setFechaNoPasar] = useState(new Date().toISOString().split('T')[0]);
    const [productos, setProductos] = useState([]);
    const [tipoSalidaSeleccionado, setTipoSalidaSeleccionado] = useState('');
    const [formValues, setFormValues] = useState({
        Fecha: "",
        Proveedor: "",
    });
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [sugerencias, setSugerencias] = useState([]);
    const [busquedaId, setBusquedaId] = useState('');
    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productosEjemplo, setProductosEjemplo] = useState([]);

    const proveedores = [
        { id: "1", Nombre: "Expirado" },
        { id: "2", Nombre: "Consumo Personal" }
    ];

    // const productosEjemplo = [
    //     { id: 1, nombre: "coca"},
    //     { id: 2, nombre: "sprite"},
    //     { id: 3, nombre: "lukake"},
    //     { id: 4, nombre: "agua"},
    //     { id: 5, nombre: "bolo"}
    // ];

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
        setTipoSalidaSeleccionado(Number(e.target.value))
    };

    const handleEditarProducto = (index, value) => {
        const productosActualizados = [...productosSeleccionados];
        productosActualizados[index].cantidad = value;
        setProductosSeleccionados(productosActualizados);
    };

    const handleEliminarProducto = (index) => {
        setProductosSeleccionados(productosSeleccionados.filter((_, i) => i !== index));
    };

    const handleConfirmSalida = async () => {

        try {
            const datos = {
                TipoSalidaID: tipoSalidaSeleccionado,
                Fecha: fechaNoPasar,
                productos: productosSeleccionados
            }
            console.log(datos)
            await insertarNotaSalida(datos);
            setShowConfirmModal(false);
            setFormValues({ Fecha: "", Proveedor: "" });
            setProductosSeleccionados([]);
            setBusquedaId('');
            setBusquedaNombre('');
            setSugerencias([]);
        } catch (error) {
            console.log(error)
        }

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
            setTipoSalidaSeleccionado(tipoSalida[0]?.TipoSalidaID)
        } else {
            setProductos([]);
        }
    }, [productosBackend, tipoSalida]);

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
                        value={fechaNoPasar}
                        disabled={true}
                    />
                    <select
                        className='inputSalida'
                        name="Proveedor"
                        value={tipoSalidaSeleccionado}
                        onChange={handleInputChange}
                    >
                        <option value={tipoSalida[0]?.TipoSalidaID}>{tipoSalida[0]?.Descripcion}</option>
                        <option value={tipoSalida[1]?.TipoSalidaID}>{tipoSalida[1]?.Descripcion}</option>
                        <option value={tipoSalida[2]?.TipoSalidaID}>{tipoSalida[2]?.Descripcion}</option>
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
                            <button className='confirmarSalida2' onClick={handleConfirmSalida}>Confirmar Salida</button>
                            <button className='cancelarSalida' onClick={handleCloseConfirmModal}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SalidaPage;
