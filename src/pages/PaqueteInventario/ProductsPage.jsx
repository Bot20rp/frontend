import React, { useRef, useState } from 'react';
import '../../css/AdmiInventarioCss/ProductsPage.css';
import { insertarProducto, actualizarProducto, eliminarProducto } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

function ProductsPage() {
    const tbodyProductos = useRef(null);
    const { productosBackend, user, tableEstante, tableMarca, tableCategoria, tableVolumen } = useAuth();
    const [producto, setProducto] = useState({
        id: '',
        Nombre: '',
        Precio: '',
        Categoria: '',
        Volumen: '',
        Marca: '',  // Almacenará el ID de la marca seleccionada
        Estante: '' // Almacenará el ID del estante seleccionado
    });

    const [productos, setProductos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [mostrarActualizar, setMostrarActualizar] = useState(false);

    // Manejar los cambios en el formulario
    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };

    // Manejar la búsqueda de productos
    const handleSearch = (e) => {
        const textoBuscar = e.target.value.toLowerCase();
        const filas = tbodyProductos.current.querySelectorAll('tr');
        filas.forEach(fila => {
            const nombre = fila.cells[1].textContent.toLowerCase();
            fila.style.display = nombre.includes(textoBuscar) ? '' : 'none';
        });
    };

    // Abrir el modal
    const openModal = () => {
        console.log(tableVolumen);
        setModalVisible(true);
    };

    // Cerrar el modal
    const closeModal = () => {
        setModalVisible(false);
        resetForm();
    };

    // Agregar producto a la tabla
    const agregarProducto = async (producto) => {
        try {
            console.log(producto)
            await insertarProducto(producto);
            setProductos([...productos, producto]);
            resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    // Resetear formulario
    const resetForm = () => {
        setProducto({
            id: '',
            Nombre: '',
            Precio: '',
            Categoria: '',
            Volumen: '',
            Marca: '', // Asegúrate de que se reinicie
            Estante: '' // Asegúrate de que se reinicie
        });
        setIsEditing(false);
    };

    // Guardar o modificar producto
    // Guardar o modificar producto
    const handleSave = async (e) => {
        e.preventDefault();
        console.log(producto);
        if (isEditing) {
            // Envía solo los ID de los campos al modificar
            await actualizarProducto({
                ...producto,
                Categoria: producto.Categoria,
                Volumen: producto.Volumen,
                Marca: producto.Marca,
                Estante: producto.Estante,
            });
            const nuevosProductos = productos.map(p => p.id === producto.id ? producto : p);
            setProductos(nuevosProductos);
        } else {
            agregarProducto(producto);
        }
        closeModal();
    };


    // Eliminar producto
    const eliminarProductos = async (id) => {
        try {
            await eliminarProducto(id);
            const nuevosProductos = productos.filter(p => p.id !== id);
            setProductos(nuevosProductos);
        } catch (error) {
            console.log(error);
        }
    };

    // Modificar producto
    const modificarProducto = (id) => {
        const productoAModificar = productos.find(p => p.id === id);
        if (productoAModificar) {
            setProducto({
                ...productoAModificar,
                Categoria: productoAModificar.Categoria, // Asegura que usa solo el ID
                Volumen: productoAModificar.Volumen,
                Marca: productoAModificar.Marca,
                Estante: productoAModificar.Estante,
            });
            setIsEditing(true);
            openModal();
        }
    };


    // Listar productos
    const listar = () => {
        try {
            if (Array.isArray(productosBackend.data)) {
                const productosFormateados = productosBackend.data.map((producto) => ({
                    id: producto.ProductoID,
                    Nombre: producto.Nombre,
                    Precio: producto.Precio,
                    Categoria: producto.Catego,
                    Volumen: producto.Vol,
                    Marca: producto.Marc,
                    Estante: producto.Estant,
                    Saldo: producto.Cantidad
                }));
                setProductos(productosFormateados);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="containerProduct">
            <h1 className="titleProduct">Productos</h1>
            <input
                className="buscarProduct"
                placeholder="Buscar por nombre"
                onInput={handleSearch}
            />
            <button className="openProduct" onClick={openModal}>
                Nuevo Producto
            </button>
            <button className="openProduct" onClick={listar}>
                Listar Productos
            </button>
            <div className="tableContainer">
                <table className="tableProduct">
                    <thead>
                        <tr className="filasProduct">
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Saldo</th>
                            <th>Categoria</th>
                            <th>Volumen</th>
                            <th>Marca</th>
                            <th>Estante</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody ref={tbodyProductos} className="datosProduct">
                        {productos.map((prod) => (
                            <tr key={prod.id} data-id={prod.id}>
                                <td>{prod.id}</td>
                                <td>{prod.Nombre}</td>
                                <td>{prod.Precio}</td>
                                <td>{prod.Saldo}</td>
                                <td>{prod.Categoria}</td>
                                <td>{prod.Volumen}</td>
                                <td>{prod.Marca}</td>
                                <td>{prod.Estante}</td>
                                <td className="editProduct">
                                    {
                                        user?.user.permisos.some((permiso) => permiso.Descripcion === "porder eliminar productos") &&
                                        <button className="eliminarProduct" onClick={() => eliminarProductos(prod.id)}>Eliminar</button>
                                    }
                                    {
                                        user?.user.permisos.some((permiso) => permiso.Descripcion === "poder modificar productos") &&
                                        <button className="modificarProduct" onClick={() => modificarProducto(prod.id)}>Modificar</button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mostrar el modal cuando modalVisible sea true */}
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{isEditing ? "Modificar Producto" : "Nuevo Producto"}</h3>
                        <input
                            name="id"
                            value={producto.id}
                            onChange={handleChange}
                            placeholder="ID de producto"
                        />
                        <input
                            name="Nombre"
                            value={producto.Nombre}
                            onChange={handleChange}
                            placeholder="Nombre de producto"
                        />
                        <input
                            name="Precio"
                            value={producto.Precio}
                            onChange={handleChange}
                            placeholder="Precio"
                        />

                        {/* Select para Categoria */}
                        <label htmlFor="Categoria">Categoria</label>
                        <select
                            name="Categoria"
                            value={producto.Categoria}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione una Categoria</option>
                            {tableCategoria.data.map((cat) => (
                                <option key={cat.CategoriaID} value={cat.CategoriaID}>
                                    {cat.Nombre}
                                </option>
                            ))}
                        </select>

                        {/* Select para Volumen */}
                        <label htmlFor="Categoria">Volumen</label>
                        <select
                            name="Volumen"
                            value={producto.Volumen}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione el Volumen</option>
                            {tableVolumen.data.data.map((vol) => (
                                <option key={vol.VolumenID} value={vol.VolumenID}>
                                    {vol.Descripcion}
                                </option>
                            ))}
                        </select>
                        {/* Select para marcas */}
                        <label htmlFor="Marca">Marca</label>
                        <select
                            name="Marca"
                            value={producto.Marca}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione una marca</option>
                            {tableMarca.data.map((marca) => (
                                <option key={marca.MarcaID} value={marca.MarcaID}>
                                    {marca.Nombre}
                                </option>
                            ))}
                        </select>

                        {/* Select para estantes */}
                        <label htmlFor="Estante">Estante</label>
                        <select
                            name="Estante"
                            value={producto.Estante}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione un estante</option>
                            {tableEstante.data.map((estante) => (
                                <option key={estante.EstanteID} value={estante.EstanteID}>
                                    {estante.Nombre}
                                </option>
                            ))}
                        </select>

                        <button className="btn" onClick={handleSave}>
                            {isEditing ? "Modificar" : "Guardar"}
                        </button>
                        <button className="btn" onClick={closeModal}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductsPage;
