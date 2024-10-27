import React, { useState,useEffect } from 'react'
import '../../css/AdmiUsuarioCss/PrivilegioPages.css'
import { useAuth } from '../../context/AuthContext';

function PrivilegioPages() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [privilegios, setPrivilegios] = useState({});
    const [rolSeleccionado, setRolSeleccionado] = useState("Administrador");
    const {permisoTable} = useAuth();

    // Usuario estático con privilegios
    const privilegiosPorRol = {
        Administrador: {
            "privilegioADM 1": "activado",
            "privilegioADM 2": "desactivado",
            "privilegioADM 3": "activado"
        },
        Empleado: {
            "privilegioEMP 1": "desactivado",
            "privilegioEMP 2": "activado"
        },
        Cliente: {
            "privilegioCLI 1": "desactivado",
            "privilegioCLI 2": "desactivado"
        }
    };
    
    // Cargar los privilegios iniciales cuando el componente se monta
    useEffect(() => {
        console.log("desdePrivilegios",permisoTable)
        setPrivilegios(privilegiosPorRol[rolSeleccionado])
    }, [rolSeleccionado]);

    // Manejar el toggle del submenú
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Manejar el cambio de cada privilegio
    const manejarCambio = (privilegio) => {
        setPrivilegios((prevState) => {
            const nuevoEstado = {
                ...prevState,
                [privilegio]: prevState[privilegio] === 'activado' ? 'desactivado' : 'activado',
            };
            return nuevoEstado;
        });
    };

    // Enviar los cambios al backend (simulado aquí)
    const enviarCambios = async () => {
        console.log("Enviando cambios al backend:");

    };

    const manejarCambioRol = (event) =>{
        setRolSeleccionado(event.target.value);
    }
    return (
        <div className='principalPrivilegio'>
            <h1>SOY PRIVILEGIO</h1>
            <div className='contenedorPrivilegio'>
                <div className='cotenedorRol'>
                    <h2>SELECCIONAR ROL</h2>
                    <select name="rol" id='soyRol' value={rolSeleccionado} onChange={manejarCambioRol}>
                        <option value="Administrador">Administrador</option>
                        <option value="Empleado">Empleado</option>
                        <option value="Cliente">Cliente</option>
                    </select>

                </div>
                <div className='cotenedorPrivilegio'>
                    <button onClick={toggleMenu} className="toggle-menu">
                        Privilegios {isMenuOpen ? "▲" : "▼"}
                    </button>
                    {isMenuOpen && (
                        <div className="submenu">
                            <ul className="privileges-list">
                                {Object.keys(privilegios).map((privilegio) => (
                                    <li key={privilegio} className="privilege-item">
                                        <span className="privilege-name">{privilegio}</span>
                                        <button
                                            onClick={() => manejarCambio(privilegio)}
                                            className={`privilege-button ${privilegios[privilegio] === 'activado' ? 'active' : 'inactive'}`}
                                        ></button>
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
    )
}

export default PrivilegioPages
