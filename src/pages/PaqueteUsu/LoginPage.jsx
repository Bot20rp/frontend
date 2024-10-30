import React, { useEffect } from 'react';
import '../../css/AdmiUsuarioCss/LoginPage.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
    const { register, handleSubmit } = useForm();
    const {user} =useAuth();
    const { signin, esAutenticado, cargarDatos, cargarDatosProveedores } = useAuth();
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
        if (esAutenticado) {
            console.log(user.user)
            if(user?.user.rol === "Cliente"){
                navigate("/perfil")
            }else {
                navigate("/dasboard/homeda");
            }
        }
    }, [esAutenticado, navigate]);

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
