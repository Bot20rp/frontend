import React, { useState, useRef } from 'react';
import '../../css/AdmiInventarioCss/OrganizacionProductosPage.css';
import { insertarMarca, insertarEstante } from '../../api/auth';

function OrganizacionProductPage() {
    const [estantes, setEstantes] = useState([]);  // Lista para estantes
    const [marcas, setMarcas] = useState([]);  // Lista para marcas
    const [formValues, setFormValues] = useState({
        Nombre: "",       // Inicializado como cadena vacía
        Region: "",       // Inicializado como cadena vacía
        Ubicacion: "",    // Inicializado como cadena vacía
        Volumen: ""       // Nuevo atributo Volumen
    });
    const modalEstante = useRef(null);
    const modalMarca = useRef(null);
    const modalVolumen = useRef(null); // Referencia para el modal de Volumen
    const container = useRef(null);

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSaveEstante = async (e) => {
        e.preventDefault();
        const nuevoEstante = { ...formValues };
        console.log('Estante guardado:', nuevoEstante); // Mostrar en consola
        try {
            await insertarEstante(nuevoEstante);
            resetForm();
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveMarca = async (e) => {
        e.preventDefault();
        const nuevaMarca = { ...formValues };
        console.log('Marca guardada:', nuevaMarca); // Mostrar en consola
        try {
            await insertarMarca(nuevaMarca);
            resetForm();
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveVolumen = async (e) => {
        e.preventDefault();
        const nuevoVolumen = { ...formValues };
        console.log('Volumen guardado:', nuevoVolumen); // Mostrar en consola
        // Aquí podrías añadir la lógica para insertar el volumen en tu API
        resetForm();
        closeModal();
    };

    const openEstante = () => {
        setFormValues({ Nombre: "", Ubicacion: "" }); // Reiniciar campos
        modalEstante.current.classList.add('show');
        container.current.classList.add('show2');
    };

    const openMarcaModal = () => {
        setFormValues({ Nombre: "", Region: "" }); // Reiniciar campos
        modalMarca.current.classList.add('show');
        container.current.classList.add('show2');
    };

    const openVolumenModal = () => {
        setFormValues({ Volumen: "" }); // Reiniciar campo de Volumen
        modalVolumen.current.classList.add('show');
        container.current.classList.add('show2');
    };

    const closeModal = () => {
        modalEstante.current.classList.remove('show');
        modalMarca.current.classList.remove('show');
        modalVolumen.current.classList.remove('show'); // Cerrar el modal de Volumen
        container.current.classList.remove('show2');
        resetForm(); // Reiniciar formulario
    };

    const resetForm = () => {
        setFormValues({
            Nombre: "",
            Region: "",
            Ubicacion: "",
            Volumen: "" // Reiniciar Volumen también
        });
    };

    return (
        <div className="containerOrganizacion">
            <div ref={container}>
                <h1 className="titleOrganizacionPage">ORGANIZACION DE PRODUCTOS</h1>
                <button className="openNuevoEstante" onClick={openEstante}>Nuevo Estante</button>
                <button className="openNuevaMarca" onClick={openMarcaModal}>Nueva Marca</button>
                <button className="openNuevaMarca" onClick={openVolumenModal}>Nuevo Volumen</button> {/* Botón para abrir el modal de Volumen */}

                {/* Puedes mantener aquí las tablas si lo deseas, pero por ahora no se actualizan */}
            </div>

            {/* Modal para estantes */}
            <div className="modalEstante" ref={modalEstante}>
                <form className="modalEestante" onSubmit={handleSaveEstante}>
                    <h1 className="TitleEstante">Registrar Estante</h1>
                    <input className="formEstante" placeholder="Nombre" name="Nombre" value={formValues.Nombre || ""} onChange={handleInputChange} required />
                    <input className="formEstante" placeholder="Ubicación" name="Ubicacion" value={formValues.Ubicacion || ""} onChange={handleInputChange} required />
                    <div className="buttons">
                        <button type="submit" className='saveEstante'>Guardar</button>
                        <button type="button" className='closeRegisterEstante' onClick={closeModal}>Cerrar</button>
                    </div>
                </form>
            </div>

            {/* Modal para marcas */}
            <div className="modalMarca" ref={modalMarca}>
                <form className="modalEMarca" onSubmit={handleSaveMarca}>
                    <h1 className="TitleMarca">Registrar Marca</h1>
                    <input className="formMarca" placeholder="Nombre" name="Nombre" value={formValues.Nombre || ""} onChange={handleInputChange} required />
                    <input className="formMarca" placeholder="Región" name="Region" value={formValues.Region || ""} onChange={handleInputChange} required />
                    <div className="buttons">
                        <button type="submit" className='saveMarca'>Guardar</button>
                        <button type="button" className='closeRegisterMarca' onClick={closeModal}>Cerrar</button>
                    </div>
                </form>
            </div>

            {/* Modal para volumen */}
            <div className="modalMarca" ref={modalVolumen}>
                <form className="modalEMarca" onSubmit={handleSaveVolumen}>
                    <h1 className="TitleMarca">Registrar Volumen</h1>
                    <input className="formMarca" placeholder="Volumen" name="Volumen" value={formValues.Volumen || ""} onChange={handleInputChange} required />
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
