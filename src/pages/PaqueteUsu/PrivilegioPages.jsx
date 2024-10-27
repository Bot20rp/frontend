import React, { useState, useEffect } from 'react'
import '../../css/AdmiUsuarioCss/PrivilegioPages.css'
import { useAuth } from '../../context/AuthContext';
import { actualizarPermisos } from '../../api/auth';

function PrivilegioPages() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [privilegios, setPrivilegios] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState("administrador");  // Asegúrate de que coincida en minúsculas
    const { permisoTable } = useAuth();

    // Cargar los privilegios iniciales cuando se cambia el rol seleccionado
    useEffect(() => {
        setPrivilegios(permisoTable[rolSeleccionado] || []);
    }, [rolSeleccionado]);

    // Manejar el toggle del submenú
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Manejar el cambio de cada privilegio
    const manejarCambio = (id) => {
        setPrivilegios((prevState) =>
            prevState.map((privilegio) =>
                privilegio.id === id ? { ...privilegio, Estado: !privilegio.Estado } : privilegio
            )
        );
    };

    // Enviar los cambios al backend (simulado aquí)
    const enviarCambios = async () => {
        console.log("Enviando cambios al backend:", privilegios,rolSeleccionado);
        try {
            await actualizarPermisos(privilegios,rolSeleccionado)
        } catch (error) {
            console.log(error);
        }
    };

    const manejarCambioRol = (event) => {
        setRolSeleccionado(event.target.value);
    };

    return (
        <div className='principalPrivilegio'>
            <h1>Gestión de Privilegios</h1>
            <div className='contenedorPrivilegio'>
                <div className='contenedorRol'>
                    <h2>Seleccionar Rol</h2>
                    <select name="rol" id='soyRol' value={rolSeleccionado} onChange={manejarCambioRol}>
                        <option value="administrador">Administrador</option>
                        <option value="empleado">Empleado</option>
                        <option value="cliente">Cliente</option>
                    </select>
                </div>
                <div className='contenedorPrivilegios'>
                    <button onClick={toggleMenu} className="toggle-menu">
                        Privilegios {isMenuOpen ? "▲" : "▼"}
                    </button>
                    {isMenuOpen && (
                        <div className="submenu">
                            <ul className="privileges-list">
                                {privilegios.map((privilegio) => (
                                    <li key={privilegio.id} className="privilege-item">
                                        <span className="privilege-name">{privilegio.Descripcion}</span>
                                        <button
                                            onClick={() => manejarCambio(privilegio.id)}
                                            className={`privilege-button ${privilegio.Estado ? 'active' : 'inactive'}`}
                                        >
                                            {privilegio.Estado ? 'OK' : 'NO'}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={enviarCambios} className="save-changes">
                                Guardar Cambios
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PrivilegioPages;
