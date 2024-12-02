import React, { useEffect, useState } from 'react';
import '../../css/AdmiUsuarioCss/LoginPage.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const { register, handleSubmit } = useForm();
    const { signin, esAutenticado, cargarDatos, cargarDatosProveedores, user, cargarApertura } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
         console.log("Datos del usuario loginnnnn:", data); // Ver los datos del formulario
            setLoading(true);
            await signin(data);
            
            await cargarDatos();
            await cargarDatosProveedores();
        } catch (error) {
            setLoading(false);
            console.error("Error al iniciar sesión o cargar datos:", error);
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            if (esAutenticado) {
                console.log("datos del cliente : ",user?.user);

                if (user?.user?.rol === "Cliente") {
                    setLoading(false);
                    navigate("/perfil");
                } else {
                    await cargarApertura(); // Llamada asíncrona esperada
                    setLoading(false);
                    navigate("/dasboard/homeda");
                }
            }
        };

        fetchData(); // Llamar la función asíncrona dentro del useEffect
    }, [esAutenticado, navigate, user]); // Asegúrate de agregar `user` a las dependencias

    return (
        <div className='contenedor' id='body3'>
            <form onSubmit={onSubmit} className='formulario'>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type="email" placeholder='Correo electrónico' {...register('email', { required: true })} />
                    <FaUser className='iconLogin' />
                </div>
                <div className='input-box'>
                    <input type="password" placeholder='Contraseña' {...register('password', { required: true })} />
                    <FaLock className='iconLogin' />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Procesando..." : "Iniciar Sesión"}
                </button>
                {/* <button type="submit">Iniciar Sesión</button> */}
                <p className='register-link'>
                    ¿No tienes cuenta? <Link to="/registerPage">Regístrate</Link>
                </p>
                <p className='register-link'>
                     <Link to="/recuperarPage">¿Ha olvidado su contraseña?</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
