import React, { useState, useEffect } from 'react';
import '../../css/AdmiVentaCss/Combos.css';
import { insertarCombo,actualizarEstadoCombo } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import { obtenerCombos } from '../../api/auth';


function CombosPage() {

    const { productosBackend } = useAuth();
    const [productos, setProductos] = useState([]);



    const [busquedaId, setBusquedaId] = useState('');
    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [sugerencias, setSugerencias] = useState([]);
    const [productosEnCombo, setProductosEnCombo] = useState([]);
    const [totalSinDescuento, setTotalSinDescuento] = useState(0);
    const [nombreCombo, setNombreCombo] = useState(''); // Estado para el nombre del combo
    const [nuevoPrecio, setNuevoPrecio] = useState(''); // Estado para el nuevo precio
    const [fechaInicio, setFechaInicio] = useState(''); // Estado para la fecha de inicio
    const [fechaFin, setFechaFin] = useState(''); // Estado para la fecha de fin
    const [showFacturas, setShowFacturas] = useState(false); // para mostarLista
    const [combosEnLista, setcombosEnLista] = useState([]);

    // Estados para la ventana modal de confirmación
    const [showModal, setShowModal] = useState(false);
    const [comboSeleccionado, setComboSeleccionado] = useState(null);

    const [showModalModificar, setShowModalModificar] = useState(false);
    const [comboModificar, setComboModificar] = useState(null); // Combo a modificar


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


    useEffect(() => {
        const total = productosEnCombo.reduce((sum, product) => {
            return sum + (product.precio * product.cantidad);
        }, 0);
        setTotalSinDescuento(total);
    }, [productosEnCombo]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const nuevoValor =value === '' ? '' : Math.max(0, value);
        const nuevoProducto = [...productosEnCombo];
        nuevoProducto[index][name] = nuevoValor;
        setProductosEnCombo(nuevoProducto);
    };

    const handleRemonveProduct = (index) => {
        const newProducts = productosEnCombo.filter((_, i) => i !== index);
        setProductosEnCombo(newProducts);
    };

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

        if (value.length >= 3) {
            const resultados = productos.filter(product => product.nombre.toLowerCase().startsWith(value.toLowerCase()));
            setSugerencias(resultados);
        } else {
            setSugerencias([]);
        }
    };

    const seleccionarProducto = (producto) => {
        const productoExistente = productosEnCombo.find(p => p.id === producto.id);

        if (productoExistente) {
            const productosActualizados = productosEnCombo.map(p =>
                p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
            );
            setProductosEnCombo(productosActualizados);
        } else {
            setProductosEnCombo([...productosEnCombo, { ...producto, cantidad: 1 }]);
        }
        setSugerencias([]);
        setBusquedaId('');
        setBusquedaNombre('');
    };

    const guardar = async () => {
        try {
            const comboData = {
                Descripcion: nombreCombo,
                FechaInicio: fechaInicio,
                FechaFin: fechaFin,
                productos: productosEnCombo,
                Precio: nuevoPrecio,
                Estado: 1
            };
            console.log(comboData);

            await insertarCombo(comboData);
            setNombreCombo('');
            setNuevoPrecio('');
            setFechaInicio('');
            setFechaFin('');
            setProductosEnCombo([]);
            setTotalSinDescuento(0);
            setBusquedaId('');
            setBusquedaNombre('');

        } catch (error) {
            console.log(error);
        }
    }

    const listar = async () => {
        try {
            setShowFacturas(!showFacturas)
            const respuesta = await obtenerCombos();
            const combosFormateados = respuesta.data.map((combo) => ({
                Codigo: combo.ComboID,
                Descripcion: combo.Descripcion,
                FechaFin: combo.FechaFin,
                Precio: combo.Precio,
                Estado: combo.Estado
            }))
            console.log(combosFormateados)
            setcombosEnLista(combosFormateados)
        } catch (error) {
            console.log(error);
        }
    }

    const abrirModal = (combo) => {
        setComboSeleccionado(combo);
        setShowModal(true);
    };

    const abrirModalModificar = (combo) => {
        setComboModificar(combo);
        setShowModalModificar(true);
    };

    const confirmarModificarCombo = async () => {
        try {
            const cambioDatosCombo = {
                id: comboModificar.Codigo,
                Precio: comboModificar.Precio,
                FechaFin:comboModificar.FechaFin
            };
            await actualizarEstadoCombo(cambioDatosCombo)
            // Actualizamos el estado en el frontend después de guardar los cambios
            setcombosEnLista(combosEnLista.map(c =>
                c.Codigo === comboModificar.Codigo
                    ? { ...c, Precio: comboModificar.Precio, FechaFin: comboModificar.FechaFin }
                    : c
            ));
            setShowModalModificar(false);
        } catch (error) {
            console.log(error);
        }
    };



    const confirmarCambioEstado = async () => {
        try {
            const nuevoEstado = comboSeleccionado.Estado === 1 ? 0 : 1;
            const cambioEstado = {
                id: comboSeleccionado.Codigo,
                Estado: nuevoEstado
            };
            await actualizarEstadoCombo(cambioEstado); // Función para actualizar el estado
            setcombosEnLista(combosEnLista.map(c => c.Codigo === comboSeleccionado.Codigo ? { ...c, Estado: nuevoEstado } : c));
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='contenedorCombo'>
            <div className='comboContenedor'>
                <h2>AGREGAR NUEVO COMBO</h2>
                <input
                    className='nombreCombro'
                    type="text"
                    placeholder='Ingresar el nombre del combo'
                    value={nombreCombo}
                    onChange={(e) => setNombreCombo(e.target.value)}
                />

                <div className='ParaCombo'>
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
                        <ul className='sugerencias'>
                            {sugerencias.map((producto, index) => (
                                <li key={index} onClick={() => seleccionarProducto(producto)}>
                                    {producto.id} - {producto.nombre}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <h2>Descripción del Combo</h2>
                <div className='tablaCombo'>
                    <div className='tablaScroll'>
                        <table>
                            <thead>
                                <tr>
                                    <th>CodigoP</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosEnCombo.map((product, index) => (
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
                                            <button onClick={() => handleRemonveProduct(index)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='costos'>
                    <h3>Total sin Descuento</h3>
                    <input type="number" value={totalSinDescuento} readOnly />
                    <h3>Nuevo Precio</h3>
                    <input
                        type="number"
                        value={nuevoPrecio}
                        onChange={(e) => setNuevoPrecio(e.target.value)}
                    />
                </div>
                <div className='duracionCombo'>
                    <h3>Fecha Inicio</h3>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                    <h3>Fecha Fin</h3>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />
                </div>

                <button onClick={guardar}>Agregar</button>
                <h2>CONSULTAR COMBOS EXISTENTES</h2>
                <button onClick={listar}>Listar</button>
                {showFacturas && (
                    <div className='tablaCombo'>
                        <table className="tablaScroll">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Descripcion</th>
                                    <th>Precio</th>
                                    <th>FechaFin</th>
                                    <th>Estado</th>
                                    {/* <th className='imagenFactura'>Imagen</th> */}
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {combosEnLista.map((comb, index) => (
                                    <tr key={index}>
                                        <td>{comb.Codigo}</td>
                                        <td>{comb.Descripcion}</td>
                                        <td>{comb.Precio}</td>
                                        <td>{comb.FechaFin}</td>
                                        <td>{comb.Estado}</td>
                                        {/* <th className='imagenFactura'>Imagen</th> */}
                                        <td>
                                            <button
                                                style={{
                                                    backgroundColor: comb.Estado === 1 ? 'green' : 'red',
                                                    color: 'white'
                                                }}
                                                onClick={() => abrirModal(comb)}
                                            >
                                                {comb.Estado === 1 ? 'Deshabilitar' : 'Activar'}
                                            </button>
                                            <button onClick={() => abrirModalModificar(comb)}>Modificar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal de confirmación */}
                {showModal && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <p>¿Estás seguro que deseas {comboSeleccionado.Estado === 1 ? 'deshabilitar' : 'activar'} este combo?</p>
                            <button onClick={confirmarCambioEstado}>Sí</button>
                            <button onClick={() => setShowModal(false)}>Cancelar</button>
                        </div>
                    </div>
                )}

                {showModalModificar && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <h3>Modificar Combo</h3>
                            <p>Precio actual: {comboModificar.Precio}</p>
                            <input
                                type="number"
                                value={comboModificar.Precio}
                                onChange={(e) => setComboModificar({ ...comboModificar, Precio: e.target.value })}
                            />
                            <p>Fecha de finalización actual: {comboModificar.FechaFin}</p>
                            <input
                                type="date"
                                value={comboModificar.FechaFin}
                                onChange={(e) => setComboModificar({ ...comboModificar, FechaFin: e.target.value })}
                            />
                            <button onClick={confirmarModificarCombo}>Guardar Cambios</button>
                            <button onClick={() => setShowModalModificar(false)}>Cancelar</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default CombosPage;
