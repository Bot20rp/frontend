import { useState } from "react";
import "../../css/AdmiUsuarioCss/LoginPage.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { registerRequest } from "../../api/auth";
import { useNavigate, Link } from 'react-router-dom';
function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  // En la función onSubmit
  const onSubmit = async (data) => {
    setLoading(true); // Iniciar carga
    try {
      const res = await registerRequest(data);
      if (res.data) {
        console.log('Datos recibidos:', res.data); 
        
        reset(); // Limpiar el formulario después del éxito
        console.log('Respuesta del servidor:', res.data);

      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false); // Finalizar carga
  };
  return (
    <div className="contenedor" id="body3">
      <form onSubmit={handleSubmit(onSubmit)} className="formulario">
        <h1>Registrate</h1>
        <div disabled={loading}>
          {loading ? (
            <p className="successMessage">Registrando...</p>
          ) : (
            "..........."
          )}
        </div>
        {/* nit  */}
        <div className="input-box">
          <input
            type="number"
            placeholder="NIT"
            {...register("NIT", { required: true })}
          />
        </div>
        {/* ci */}
        <div className="input-box">
          <input
            type="number"
            placeholder="CI"
            {...register("CI", { required: true })}
          />
        </div>
        {/* nombreee */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Nombre completo"
            {...register("Nombre", { required: true })}
          />
        </div>
        {/* direccion  */}
        <div className="input-box">
          <input
            type="text"
            placeholder="direccion "
            {...register("Direccion", { required: true })}
          />
        </div>
        {/* correo  */}
        <div className="input-box">
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("Correo", { required: true })}
          />
        </div>
        {/* contraseñaa */}
        <div className="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            {...register("Contrasena", { required: true })}
          />
          {errors.Contrasena?.type === "required" && (
            <small>El campo no puede estar vacío</small>
          )}
          {errors.Contrasena?.type === "minLength" && (
            <small>La contraseña debe tener al menos 8 caracteres</small>
          )}
        </div>
        {/*  telefono */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Teléfono"
            {...register("telefono", { required: true })}
          />
        </div>
        {/* fecha de nacimiento  */}
        <div className="input-box">
          <input
            type="date"
            {...register("FechaNacimiento", { required: true })}
          />
        </div>
        <div className="input-box">
          <select {...register("Sexo", { required: true })}>
            <option value="">Seleccione su género</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
        </div>
        <button type="submit">Registrarse</button>
        <p className="register-link">
           <Link to="/login">Inicia Sesion</Link>
        </p>
        <p className="register-link">
          <Link to="/recuperarPage">¿Ha olvidado su contraseña?</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
