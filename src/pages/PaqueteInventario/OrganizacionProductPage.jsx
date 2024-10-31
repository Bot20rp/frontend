import React, { useState, useRef } from 'react';
import '../../css/AdmiInventarioCss/OrganizacionProductosPage.css';
import { insertarMarca } from '../../api/auth';

function OrganizacionProductPage() {
    const [estantes, setEstantes] = useState([]);  // Lista para estantes
    const [marcas, setMarcas] = useState([]);  // Lista para marcas
    const [formValues, setFormValues] = useState({
        Nombre: "",       // Inicializado como cadena vacía
        Region: "",       // Inicializado como cadena vacía
        Ubicacion: ""     // Inicializado como cadena vacía
    });
    const modalEstante = useRef(null);
    const modalMarca = useRef(null);
    const container = useRef(null);

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSaveEstante = (e) => {
        e.preventDefault();
        const nuevoEstante = { ...formValues };
        console.log('Estante guardado:', nuevoEstante); // Mostrar en consola
        resetForm();
        closeModal();
    };

    const handleSaveMarca = async(e) => {
        e.preventDefault();
        const nuevaMarca = { ...formValues };
        console.log('Marca guardada:', nuevaMarca); // Mostrar en consola
        try {
            
            await insertarMarca(nuevaMarca)
            resetForm();
            closeModal();
        } catch (error) {
            console.log(error)
        }

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

    const closeModal = () => {
        modalEstante.current.classList.remove('show');
        modalMarca.current.classList.remove('show');
        container.current.classList.remove('show2');
        resetForm(); // Reiniciar formulario
    };

    const resetForm = () => {
        setFormValues({
            Nombre: "",
            Region: "",
            Ubicacion: ""
        });
    };

    return (
        <div className="containerOrganizacion">
            <div ref={container}>
                <h1 className="titleOrganizacionPage">ORGANIZACION DE PRODUCTOS</h1>
                <button className="openNuevoEstante" onClick={openEstante}>Nuevo Estante</button>
                <button className="openNuevaMarca" onClick={openMarcaModal}>Nueva Marca</button>

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
        </div>
    );
}

export default OrganizacionProductPage;
