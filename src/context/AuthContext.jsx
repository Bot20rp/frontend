import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, logoutRequest, verityTokenResquest, obtenerRequest, obtenerRequestProveedor, permisos } from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [esAutenticado, setEsAutenticado] = useState(false);
    const [loading, setLoading] = useState(true);
    const [rol, setRol] = useState(null);
    const [tableUser, setTableUser] = useState([]);
    const [tableProveedor, setTableProveedor] = useState([]);
    const [permisoTable, setPermisos] = useState({
        administrador: [],
        cliente: [],
        empleado: []
    });


    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setEsAutenticado(true);
            setUser(res.data);
            setRol(res.data.user.rol);
            console.log(rol)
            // Almacena el token en localStorage
            localStorage.setItem('token', res.data.token);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        await logoutRequest();
        setEsAutenticado(false);
        setUser(null);
        setRol(null);
        setTableUser([]);
        // Elimina el token de localStorage
        localStorage.removeItem('token');
    };

    const cargarDatos = async () => {
        // Utiliza el token almacenado en localStorage para las solicitudes
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const respuesta = await obtenerRequest();
            // Procesa la respuesta
            const datosNuevos = respuesta.data.usuarios.map(usuario => ({
                id: usuario.id,
                usuario: usuario.usuario,
                correo: usuario.correo,
                telefono: usuario.telefono,
                genero: usuario.genero,
                rol: usuario.rol,
                salario: usuario.salario,
                horarioInicio: usuario.horarioInicio,
                horarioFin: usuario.horarioFin,
            }));
            setTableUser(datosNuevos);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarDatosProveedores = async () => {
        try {
            const respuesta = await obtenerRequestProveedor();
            console.log("estoy aquie en aut")
            console.log(respuesta.data)
            if (respuesta.status !== 200) {
                throw new Error('Error Obtener datos')
            }
            const datosNuevos = respuesta.data.map(data => ({
                id: data.ProveedorID,
                Nombre: data.Nombre,
                Contacto: data.Contacto,
                Direccion: data.Direccion
            }));


            setTableProveedor(datosNuevos);

        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    const cargarDatosPermisos = async () => {
        try {
            const respuesta = await permisos(); // Llamada a la API
            console.log("Obteniendo permisos:");
            console.log(respuesta.data); // Verificar la respuesta

            if (respuesta.status !== 200) {
                throw new Error('Error al obtener los datos');
            }

            // Mapear y transformar los permisos del Administrador
            const permisosAdministrador = respuesta.data.permisosAdministrador.map(permiso => {
                return {
                    id: permiso.PrivilegioID,
                    Descripcion: permiso.Descripcion,
                    Estado: permiso.Estado
                };
            });

            // Mapear los permisos del Cliente
            const permisosCliente = respuesta.data.permisosCliente.map(permiso => {
                return {
                    id: permiso.PrivilegioID,
                    Descripcion: permiso.Descripcion,
                    Estado: permiso.Estado
                };
            });

            // Mapear los permisos del Empleado
            const permisosEmpleado = respuesta.data.permisosEmpleado.map(permiso => {
                return {
                    id: permiso.PrivilegioID,
                    Descripcion: permiso.Descripcion,
                    Estado: permiso.Estado
                };
            });

            setPermisos({
                administrador: permisosAdministrador,
                cliente: permisosCliente,
                empleado: permisosEmpleado
            });


        } catch (error) {
            console.error('Error al obtener los permisos:', error);
        }
    };
    // Monitorear los cambios en 'permisoTable'
    useEffect(() => {
        console.log("PermisoTable actualizado:");
        console.log(permisoTable);
    }, [permisoTable]);

    useEffect(() => {
        async function checkLogin() {
            const token = localStorage.getItem('token');
            console.log(token)
            if (!token) {
                setEsAutenticado(false);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);  // Asegúrate de que loading esté activo durante todo el proceso.
                const res = await verityTokenResquest(token); // Aquí debes enviar el token en la cabecera de autorización
                if (!res.data) {
                    setEsAutenticado(false);
                    setLoading(false);
                    return;
                }
                setEsAutenticado(true);
                setUser(res.data);

                setRol(res.data.user.rol);
                // Cargar datos si el rol es "Administrador" o "Cliente"
                if (res.data.user.rol === 'Administrador' || res.data.user.rol === 'Cliente') {
                    cargarDatos();
                    cargarDatosProveedores();
                    cargarDatosPermisos();
                    console.log(permisoTable)

                }
                setLoading(false);
            } catch (error) {
                console.error("Error al verificar el token:", error);
                setEsAutenticado(false);
                setLoading(false);
            }
        }

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signin,
            user,
            esAutenticado,
            loading,
            rol,
            tableUser,
            tableProveedor,
            permisoTable,
            cargarDatos,
            cargarDatosProveedores,
            cargarDatosPermisos,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
