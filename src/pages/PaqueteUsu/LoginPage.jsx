import React, { useEffect, useState } from 'react';
import '../../css/AdmiUsuarioCss/LoginPage.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const { register, handleSubmit } = useForm();
    const { signin, esAutenticado, cargarDatos, cargarDatosProveedores, user, cargarApertura } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await signin(data);
            await cargarDatos();
            await cargarDatosProveedores();
        } catch (error) {
            console.error("Error al iniciar sesión o cargar datos:", error);
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            if (esAutenticado) {
                console.log(user?.user);

                if (user?.user?.rol === "Cliente") {
                    navigate("/perfil");
                } else {
                    await cargarApertura(); // Llamada asíncrona esperada
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

                <button type="submit" style={styles.button(loading)} disabled={loading}>
                    {loading ? "Procesando..." : "Iniciar Sesión<"}
                </button>
                {/* <button type="submit">Iniciar Sesión</button> */}
                <p className='register-link'>
                    ¿No tienes cuenta? <Link to="/registerPage">Regístrate</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;

const styles = {
    button: (loading) => ({
        backgroundColor: loading ? "#cccccc" : "#6772e5",
        color: "#fff",
        padding: "10px 0",
        border: "none",
        borderRadius: "4px",
        cursor: loading ? "not-allowed" : "pointer",
        fontWeight: "bold",
        transition: "background-color 0.2s ease",
    })
};
