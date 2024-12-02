import React, { useRef, useState } from 'react';
import '../../css/AdmiInventarioCss/ProductsPage.css';
import { insertarProducto, actualizarProducto, eliminarProducto } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ProductsPage() {
    const tbodyProductos = useRef(null);
    const { productosBackend, user, tableEstante, tableMarca, tableCategoria, tableVolumen } = useAuth();
    const [producto, setProducto] = useState({
        id:'',
        Nombre: '',
        Precio: '',
        Categoria: '',
        Volumen: '',
        Marca: '',
        Estante: '',
        imagen:null
    });

    const [productos, setProductos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [mostrarActualizar, setMostrarActualizar] = useState(false);

    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = (e) => {
        const textoBuscar = e.target.value.toLowerCase();
        const filas = tbodyProductos.current.querySelectorAll('tr');
        filas.forEach(fila => {
            const nombre = fila.cells[1].textContent.toLowerCase();
            fila.style.display = nombre.includes(textoBuscar) ? '' : 'none';
        });
    };

    const openModal = () => {
        console.log(tableVolumen);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        resetForm();
    };

    const agregarProducto = async (producto) => {
        try {
            console.log(producto)
            const formData = new FormData();
            formData.append('id', producto.id);
            formData.append('Nombre', producto.Nombre);
            formData.append('Precio', producto.Precio);
            formData.append('Categoria', producto.Categoria);
            formData.append('Volumen', producto.Volumen);
            formData.append('Marca', producto.Marca);
            formData.append('Estante', producto.Estante);
            formData.append('imagen', producto.imagen);
            console.log(formData)
                await insertarProducto(formData);
                setProductos([...productos, producto]);
                resetForm();
            // await insertarProducto(producto);
            // setProductos([...productos, producto]);
            // resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    const resetForm = () => {
        setProducto({
            id: '',
            Nombre: '',
            Precio: '',
            Categoria: '',
            Volumen: '',
            Marca: '',
            Estante: ''
        });
        setIsEditing(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(producto);
        if (isEditing) {
            console.log(producto)
            const formData = new FormData();
            formData.append('id', producto.id);
            formData.append('Nombre', producto.Nombre);
            formData.append('Precio', producto.Precio);
            formData.append('Categoria', producto.Categoria);
            formData.append('Volumen', producto.Volumen);
            formData.append('Marca', producto.Marca);
            formData.append('Estante', producto.Estante);
            formData.append('imagen', producto.imagen);
            console.log(formData)
            await actualizarProducto(formData)
            // await actualizarProducto(producto);
            const nuevosProductos = productos.map(p => p.id === producto.id ? producto : p);
            setProductos(nuevosProductos);
        } else {
            agregarProducto(producto);
        }
        closeModal();
    };

    const eliminarProductos = async (id) => {
        try {
            await eliminarProducto(id);
            const nuevosProductos = productos.filter(p => p.id !== id);
            setProductos(nuevosProductos);
        } catch (error) {
            console.log(error);
        }
    };

    const modificarProducto = (id) => {
        const productoAModificar = productos.find(p => p.id === id);
        if (productoAModificar) {
            setProducto({
                ...productoAModificar,
                Categoria: productoAModificar.Categoria,
                Volumen: productoAModificar.Volumen,
                Marca: productoAModificar.Marca,
                Estante: productoAModificar.Estante,
            });
            setIsEditing(true);
            openModal();
        }
    };
    
    const listar = () => {
        try {
            if (Array.isArray(productosBackend.data)) {
                const productosFormateados = productosBackend.data.map((producto) => ({
                    id: producto.ProductoID,
                    DirImagen:producto.DirImagen,
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

    // Generar PDF con la lista de productos
    const generarReportePDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Productos', 20, 20);

        const productosData = productos.map(prod => [
            prod.id,
            prod.Nombre,
            prod.Precio,
            prod.Saldo,
            prod.Categoria,
            prod.Volumen,
            prod.Marca,
            prod.Estante
        ]);

        doc.autoTable({
            head: [['Id', 'Nombre', 'Precio', 'Saldo', 'Categoria', 'Volumen', 'Marca', 'Estante']],
            body: productosData
        });

        doc.save('Reporte_Productos.pdf');
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
            <button className="openProduct" onClick={generarReportePDF}>
                Generar Reporte PDF
            </button>
            <div className="tableContainer">
                <table className="tableProduct">
                    <thead>
                        <tr className="filasProduct">
                            <th>Id</th>
                            <th>Imagen</th>
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
                        {console.log(productos)}
                        {productos.map((prod) => (
                            <tr key={prod.id} data-id={prod.id}>
                                <td>{prod.id}</td>
                                <td>
                                    {prod.DirImagen ? (
                                        <img
                                            src={prod.DirImagen}
                                            alt={`Imagen de ${prod.Nombre}`}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Ajusta el tamaño según sea necesario
                                        />
                                    ) : (
                                        'Sin Imagen'
                                    )}
                                </td> 
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

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{isEditing ? "Modificar Producto" : "Nuevo Producto"}</h3>
                        {/* {isEditing ? (
                            // Mostrar input para ID del producto si se está editando
                            <input
                                name="id"
                                value={producto.id}
                                onChange={handleChange}
                                placeholder="ID de producto"
                            />
                        ) : (
                            // Mostrar input para imagen si es un nuevo producto
                            <input
                                name="imagen"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setProducto({ ...producto, imagen: e.target.files[0] }) // Agregar la imagen al estado
                                }
                            />
                        )} */}
                        <input
                            name="imagen"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setProducto({ ...producto, imagen: e.target.files[0] }) // Agregar la imagen al estado
                            }
                        />

                        <input
                            type="hidden"
                            name="id"
                            value={producto.id}
                            onChange={handleChange} // Si el ID puede cambiar, maneja el evento
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

                        <label htmlFor="Volumen">Volumen</label>
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
