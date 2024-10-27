import React, { useState,useEffect } from 'react'
import '../../css/AdmiUsuarioCss/PrivilegioPages.css'
import { permisos } from '../../api/auth';

function PrivilegioPages() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [privilegios, setPrivilegios] = useState({});
    const [rolSeleccionado, setRolSeleccionado] = useState("Administrador");

    // Usuario estático con privilegios
    const privilegiosPorRol = {
        Administrador: {
            "privilegioADM 1": "activado",
            "privilegioADM 2": "desactivado",
            "privilegioADM 3": "activado",
            "privilegioADM 4": "activado",
            "privilegioADM 5": "activado",
            "privilegioADM 6": "activado",
            "privilegioADM 6": "activado",
            "privilegioADM 6": "activado",
            "privilegioADM 6": "activado",
            "privilegioADM 6": "activado",
            "privilegioADM 6": "activado",
            "privilegioADM 6": "activado",
        },
        Empleado: {
            "privilegioEMP 1": "desactivado",
            "privilegioEMP 2": "activado",
            "privilegioEMP 3": "desactivado",
            "privilegioEMP 4": "activado",
            "privilegioEMP 5": "desactivado",
            "privilegioEMP 6": "desactivado",
            "privilegioEMP 6": "desactivado",
            "privilegioEMP 6": "desactivado",
            "privilegioEMP 6": "desactivado",
            "privilegioEMP 6": "desactivado",
            "privilegioEMP 6": "desactivado",
            "privilegioEMP 6": "desactivado",
        },
        Cliente: {
            "privilegioCLI 1": "desactivado",
            "privilegioCLI 2": "desactivado",
            "privilegioCLI 3": "desactivado",
            "privilegioCLI 4": "activado",
            "privilegioCLI 5": "activado",
            "privilegioCLI 6": "activado",
            "privilegioCLI 7": "activado",
            "privilegioCLI 8": "activado",
            "privilegioCLI 9": "activado",
            "privilegioCLI 10": "activado",
            "privilegioCLI 11": "activado",
            "privilegioCLI 12": "desactivado",
        }
    };
    
    // Cargar los privilegios iniciales cuando el componente se monta
    useEffect(() => {
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

        const usuarioRoles = await permisos();
        console.log("Enviando cambios al backend:", usuarioRoles);
        
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
