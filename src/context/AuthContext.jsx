import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, logoutRequest, verityTokenResquest, obtenerRequest, obtenerRequestProveedor } from "../api/auth";

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

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setEsAutenticado(true);
            setUser(res.data);
            setRol(res.data.user.rol);
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

    useEffect(() => {
        async function checkLogin() {
            const token = localStorage.getItem('token');
            if (!token) {
                setEsAutenticado(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verityTokenResquest(token); // Aquí debes enviar el token en la cabecera de autorización
                if (!res.data) {
                    setEsAutenticado(false);
                    setLoading(false);
                    return;
                }
                setEsAutenticado(true);
                setUser(res.data);
                setLoading(false);
                setRol(res.data.user.rol);
                // Cargar datos si el rol es "Administrador" o "Cliente"
                if (res.data.user.rol === 'Administrador' || res.data.user.rol === 'Cliente') {
                    cargarDatos();
                }
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
            cargarDatos,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
