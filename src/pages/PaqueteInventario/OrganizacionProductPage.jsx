import React, { useState, useRef } from 'react';
import '../../css/AdmiInventarioCss/OrganizacionProductosPage.css';

function OrganizacionProductPage() {
    const [Estantes, setEstantes] = useState([]);  // Lista para estantes
    const [Marcas, setMarcas] = useState([]);  // Lista para marcas (subestantes)
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingEstante, setIsEditingEstante] = useState(false);
    const [formValues, setFormValues] = useState({
        id: "",
        nombre: "",
        estante: "", // Indica si es subestante
        region: "",  // Campo para la región en el formulario de marca
        ubicacion: ""  // Nuevo campo para la ubicación en estante
    });
    const [oldName, setOldName] = useState("");
    const [newName, setNewName] = useState("");
    const modalEstante = useRef(null);
    const modalMarca = useRef(null);
    const container = useRef(null);

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
    
        if (isEditing) {
            // Si estamos editando un estante o marca
            if (!formValues.estante) {
                const updatedEstantes = Estantes.map((cat) =>
                    cat.id === formValues.id
                        ? { ...cat, nombre: formValues.nombre, ubicacion: formValues.ubicacion }
                        : cat
                );
                setEstantes(updatedEstantes);
            } else if (isEditingEstante) {
                const updatedMarcas = Marcas.map((cat) =>
                    cat.id === formValues.id
                        ? { ...cat, nombre: formValues.nombre, region: formValues.region }
                        : cat
                );
                setMarcas(updatedMarcas);
            }
    
            setOldName(formValues.nombreAnterior);
            setNewName(formValues.nombre);
            setIsEditing(false);
            setIsEditingEstante(false);
        } else {
            // Si estamos creando un nuevo estante
            if (!formValues.estante) {
                setEstantes([...Estantes, { ...formValues, estante: null }]);
    
                try {
                    await insertarestantePadre(formValues); // Insertar estante principal
                } catch (error) {
                    console.log(error);
                }
            }
            // Si estamos creando una nueva marca (subestante)
            else {
                setMarcas([...Marcas, { ...formValues, region: formValues.region }]);
    
                try {
                    await insertarestanteHija(formValues); // Insertar subestante
                } catch (error) {
                    console.log(error);
                }
            }
        }
    
        resetForm(); // Reinicia el formulario
        closeModal(); 
    };

    const openEstante = () => {
        setFormValues({
            id: "",
            nombre: "",
            estante: "",
            ubicacion: ""  // Reiniciar el campo de ubicación
        });
        modalEstante.current.classList.add('show');
        container.current.classList.add('show2');
    };

    const openMarcaModal = () => {
        setFormValues({
            id: "",
            nombre: "",
            estante: "marca",  // Indicar que es una marca
            region: "",  // Reiniciar el campo de región
            ubicacion: ""  // Reiniciar el campo de ubicación
        });
        modalMarca.current.classList.add('show');
        container.current.classList.add('show2');
    };

    const closeModal = () => {
        modalEstante.current.classList.remove('show');
        modalMarca.current.classList.remove('show');
        container.current.classList.remove('show2');
        resetForm(); // Reinicia el formulario también
    };
    const eliminarEstante = async (estante) => {
        const response = await fetch(`/api/eliminarEstante/${estante.id}`, {
            method: 'DELETE',
        });
    
        if (!response.ok) {
            throw new Error('Error deleting estante');
        }
    };

    const handleDelete = async (id, esSubestante) => {
        console.log('ID a eliminar:', id); // Agrega esto para verificar el ID
        if (esSubestante) {
            // Delete marca
            setMarcas(Marcas.filter((cat) => cat.id !== id));
        } else {
            setEstantes(Estantes.filter((cat) => cat.id !== id));
            try {
                const eliminar = Estantes.find((cat) => cat.id === id);
                console.log('Estante a eliminar:', eliminar); // Verifica el estante a eliminar
                await eliminarEstante(eliminar);
                setEstantes(Estantes.filter((cat) => cat.id !== id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleEdit = (id, esSubestante) => {
        const estante = esSubestante ? Marcas.find((cat) => cat.id === id) : Estantes.find((cat) => cat.id === id);
        if (estante) {
            setFormValues({
                ...estante,
                nombreAnterior: estante.nombre
            });
            if (esSubestante) {
                modalMarca.current.classList.add('show');
                setIsEditingEstante(true);
            } else {
                modalEstante.current.classList.add('show');
            }
            container.current.classList.add('show2');
            setIsEditing(true);
        }
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll("tbody tr").forEach((row) => {
            const name = row.cells[1].textContent.toLowerCase();
            row.style.display = name.includes(searchTerm) ? "" : "none";
        });
    };

    const listarMarca = async () => {
        try {
            const nuevosDatos = await obtenerEstante();
            console.log(nuevosDatos);
            if (Array.isArray(nuevosDatos.data)) {
                // Filtramos las marcas (estantes asociados a un estante principal)
                const MarcasNuevas = nuevosDatos.data.filter(cat => cat.estante).map((producto) => ({
                    id: producto.estanteID,
                    nombre: producto.Nombre,
                    region: producto.Region
                }));
                setMarcas(MarcasNuevas); // Actualizamos el estado de marcas
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const listarEstante = async () => {
        try {
            const nuevosDatos = await obtenerEstante(); // Suponiendo que esta función obtiene los datos de la API
            console.log(nuevosDatos);
            if (Array.isArray(nuevosDatos.data)) {
                // Filtramos los estantes principales (sin estante asociado)
                const EstantesNuevos = nuevosDatos.data.filter(cat => !cat.estante).map((producto) => ({
                    id: producto.estanteID,
                    nombre: producto.Nombre,
                    ubicacion: producto.Ubicacion
                }));
                setEstantes(EstantesNuevos); // Actualizamos el estado de estantes
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div className="containerOrganizacion">
            <div ref={container}>
                <h1 className="titleOrganizacionPage">ORGANIZACION DE PRODUCTOS</h1>
                <input className="buscarOrganizacion" placeholder="Buscar por nombre" onChange={handleSearch} />
                <button className="openNuevoEstante" onClick={openEstante}>Nuevo Estante</button>
                <button className="openNuevaMarca" onClick={openMarcaModal}>Nueva Marca</button>
                <button className="openNuevaMarca" onClick={listarEstante}>Listar Estante</button>
                <button className="openNuevaMarca" onClick={listarMarca}>Listar Marca</button>

                <table className="tableEstante">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className="NameEstante">Nombre</th>
                            <th>Ubicación</th>
                            <th className="editEstante">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="tbody-estante">
                        {Estantes.map((cat) => (  // Estantes principales
                            <tr key={cat.id} data-id={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.nombre}</td>
                                <td>{cat.ubicacion}</td>
                                <td>
                                    <button className="btn-eliminar" onClick={() => handleDelete(cat.id, false)}>Eliminar</button>
                                    <button className="btn-modificar" onClick={() => handleEdit(cat.id, false)}>Modificar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table className="tableMarca">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className="NameMarca">Nombre</th>
                            <th>Región</th>
                            <th className="editMarca">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="tbody-Marca">
                        {Marcas.map((cat) => (  // Marcas (subestantes)
                            <tr key={cat.id} data-id={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.nombre}</td>
                                <td>{cat.region}</td>
                                <td>
                                    <button className="btn-eliminarMarca" onClick={() => handleDelete(cat.id, true)}>Eliminar</button>
                                    <button className="btn-modificarMarca" onClick={() => handleEdit(cat.id, true)}>Modificar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para estantes */}
            <div className="modalEstante" ref={modalEstante}>
                <form className="modalEestante" onSubmit={handleSave}>
                    <h1 className="TitleEstante">Registrar Estante</h1>
                    <input className="formEstante" placeholder="ID" name="id" value={formValues.id} onChange={handleInputChange} required />
                    <input className="formEstante" placeholder="Nombre" name="nombre" value={formValues.nombre} onChange={handleInputChange} required />
                    <input className="formEstante" placeholder="Ubicación" name="ubicacion" value={formValues.ubicacion} onChange={handleInputChange} required />
                    <div className="buttons">
                        <button type="submit" className='saveEstante'>Guardar</button>
                        <button type="button" className='closeRegisterEstante' onClick={closeModal}>Cerrar</button>
                    </div>
                </form>
            </div>

            <div className="modalMarca" ref={modalMarca}>
                <form className="modalEMarca" onSubmit={handleSave}>
                    <h1 className="TitleMarca">Registrar Marca</h1>
                    <input className="formMarca" placeholder="ID" name="id" value={formValues.id} onChange={handleInputChange} required />
                    <input className="formMarca" placeholder="Nombre" name="nombre" value={formValues.nombre} onChange={handleInputChange} required />
                    <input className="formMarca" placeholder="Región" name="region" value={formValues.region} onChange={handleInputChange} required />
                    <div className="buttons">
                        <button type="submit" className='saveMarca'>Guardar</button>
                        <button type="button" className='closeRegisterMarca' onClick={closeModal}>Cerrar</button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default OrganizacionProductPage;
