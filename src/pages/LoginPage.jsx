import React, { useEffect }  from 'react';
import '../css/LoginPage.css';
import { FaUser,FaLock } from "react-icons/fa";
import {useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 


function LoginPage() {
    
     const { register, handleSubmit } = useForm();
     const { signin, esAutenticado ,cargarDatos} = useAuth();
     const navigate = useNavigate();
    
     const onSubmit = handleSubmit(async (data) => {
      await signin(data);  // Primero, inicia sesión
    });

    useEffect( () =>{
      const fetchData = async () => {
        if (esAutenticado) {
          try {
            await Promise.all([
              cargarDatos()
            ]);
            navigate("/dasboard/homeda");
          } catch (error) {
            console.error("Error al cargar datos:", error);
            // Aquí puedes manejar el error, como mostrar un mensaje al usuario
          }
        }
      };   
      
      fetchData();
    }, [esAutenticado, navigate]);
  

    return (
      <div className='contenedor' id='body3' >
        
        <form onSubmit={onSubmit} className='formulario'>
          <h1>Login</h1>
          <div className='input-box'>
              <input type="email" placeholder='email' {...register('email',{required:true})}/> 
              <FaUser  className='iconLogin'/>
          </div>
          <div className='input-box'>
              <input type="password" placeholder='Password' {...register('password',{required:true})}/>
              <FaLock className='iconLogin'/>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
}

export default LoginPage;

