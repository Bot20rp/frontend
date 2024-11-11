import React, { useEffect, useState } from 'react';
import '../../css/AdmiUsuarioCss/LoginPage.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const { register, handleSubmit } = useForm();
    const { signin, esAutenticado, cargarDatos, cargarDatosProveedores,user,cargarApertura } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await signin(data); 
            if (esAutenticado) {
                if (user?.user?.rol === "Administrador" || user?.user?.rol === "Empleado") {
                    await cargarDatosProveedores();
                    await cargarApertura();
                }
                await cargarDatos();  // Cargar datos generales
            }

        } catch (error) {
            console.error("Error al iniciar sesión o cargar datos:", error);
        }
    });

    useEffect(() => {
        if (esAutenticado && user?.user) {
            console.log(user.user);
            if (user.user.rol === "Cliente") {
                navigate("/perfil");
            } else {
                navigate("/dashboard/homeda");
            }
        }
    }, [esAutenticado, user, navigate]); 

    
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
                <button type="submit">Iniciar Sesión</button>
                <p className='register-link'>
                    ¿No tienes cuenta? <Link to="/registerPage">Regístrate</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
