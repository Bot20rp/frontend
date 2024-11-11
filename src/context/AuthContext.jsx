import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, logoutRequest, verityTokenResquest,obtenerVolumen, obtenerRequest, obtenerRequestProveedor, permisos, obtenerProductos,obtenerRoles,obtenerMarca,obtenerEstante,obtenerCategorias,obtenerLotes,obtenerApertura} from "../api/auth";

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
    const [roles,setRoles] = useState([]);
    const [productosBackend, setProductosBackend] = useState(null);
    const [esAutenticado, setEsAutenticado] = useState(false);
    const [loading, setLoading] = useState(true);
    const [rol, setRol] = useState(null);
    const [tableUser, setTableUser] = useState([]);
    const [tableProveedor, setTableProveedor] = useState([]);
    const [tableMarca,setTableMarca] = useState([]);
    const [tableEstante,settableEstante] = useState([]);
    const [tableVolumen,setTableVolumen] = useState([]);
    const[tableCategoria,setCategoria] = useState([]);
    const [tableLotes,setTableLotes] = useState([]);
    const [montoPago,setMonto] = useState(null);
    const [existeApertura,setExisteApertura] = useState(false);
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

    const cargarProductos = async () => {
        try {
            const respuesta = await obtenerProductos();
            const respuestaMarca = await obtenerMarca();
            const respuestaEstante = await obtenerEstante();
            const respuestaCategoria = await obtenerCategorias();
            const respuestaLotes = await obtenerLotes();
            const respuestaVolumen = await obtenerVolumen();
            setTableVolumen(respuestaVolumen)
            setTableMarca(respuestaMarca);
            settableEstante(respuestaEstante)
            setProductosBackend(respuesta);
            setCategoria(respuestaCategoria);
            setTableLotes(respuestaLotes);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    
    const cargarRoles = async () =>{
        try {
            const respuesta = await obtenerRoles();
            console.log(respuesta.data);
            setRoles(respuesta.data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    const cargarDatosPermisos = async () => {
        try {
            const respuesta = await permisos(); // Llamada a la API

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

    const cargarApertura = async () => {
        try {
            const { error, res } = await obtenerApertura();
            if (!error) {
                console.log("si existe")
                console.log(res)
                console.log(res.data.data.Estado)
                setExisteApertura(true);
            } else {
                setExisteApertura(false);
                console.log("no existe")
            }
        } catch (error) {
            console.error('Error al obtener la apertura', error);
        }
    };
    

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
                if (res.data.user.rol === 'Administrador' || res.data.user.rol === 'Cliente' || res.data.user.rol === 'Empleado') {
                    cargarDatos();
                    cargarDatosProveedores();
                    cargarDatosPermisos();
                    cargarProductos();
                    cargarRoles();
                    cargarApertura();
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
            productosBackend,
            roles,
            tableEstante,
            tableMarca,
            tableCategoria,
            tableLotes,
            tableVolumen,
            montoPago,
            existeApertura,
            cargarDatos,
            cargarDatosProveedores,
            cargarDatosPermisos,
            cargarProductos,
            logout,
            cargarApertura,
            setMonto
        }}>
            {children}
        </AuthContext.Provider>
    );
};
