import { useState } from "react";
import "../../css/AdmiUsuarioCss/LoginPage.css";
import { useForm } from "react-hook-form";
import { modificarContraseña } from "../../api/auth"; 
import { useNavigate, Link } from 'react-router-dom';

export const RecuperarPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    setLoading(true); // Iniciar carga
    setMessage(""); // Resetear mensaje previo

    // Aseguramos que las contraseñas coinciden antes de enviarlas
    if (data.contrasena !== data.newcontrasena) {
      setMessage("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      // Llamar a la función de modificar contraseña
      console.log("Datos a enviar:", data); 
      const res = await modificarContraseña(data);
      console.log(res); 

      if (res.data) {
        reset(); // Limpiar el formulario tras éxito
        setMessage("Contraseña cambiada con éxito. Redirigiendo..."); 
        setTimeout(() => {
          navigate("/login"); 
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setMessage("Hubo un error al cambiar la contraseña. Intenta nuevamente."); 
    }
    setLoading(false); // Finalizar carga
  };

  return (
    <div className="contenedor" id="body3">
      <form onSubmit={handleSubmit(onSubmit)} className="formulario">
        <h1>Recuperar Contraseña</h1>

        <div>
          {loading ? (
            <p className="successMessage">Procesando...</p>
          ) : (
            message && <p className="successMessage">{message}</p> // Muestra mensaje de éxito o error
          )}
        </div>

        {/* Correo */}
        <div className="input-box">
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("correo", { required: "El correo es obligatorio" })}
          />
          {errors.correo && <small>{errors.correo.message}</small>}
        </div>

        {/* Teléfono */}
        <div className="input-box">
          <input
            type="number"
            placeholder="Teléfono"
            {...register("telefono", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[0-9]{8,10}$/, // Acepta 8 o 10 dígitos
                message: "El teléfono debe contener 8 o 10 dígitos",
              },
            })}
          /> 
          {errors.telefono && <small>{errors.telefono.message}</small>}
        </div>

        {/* Nueva Contraseña */}
        <div className="input-box">
          <input
            type="password"
            placeholder="Nueva contraseña"
            {...register("contrasena", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 9,
                message: "Debe tener al menos 9 caracteres",
              },
            })}
          />
          {errors.contrasena && <small>{errors.contrasena.message}</small>}
        </div>

        {/* Confirmar Contraseña */}
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirmar contraseña"
            {...register("newcontrasena", {
              required: "Confirma tu contraseña",
            })}
          />
          {errors.newcontrasena && (
            <small>{errors.newcontrasena.message}</small>
          )}
        </div>

        <button type="submit">
          {loading ? "Procesando..." : "Enviar"}
        </button>

        <p className="register-link">
          ¿No tienes cuenta? <Link to="/registerPage">Regístrate</Link>
        </p>
        <p className="register-link">
          <Link to="/login">Inicia Sesión</Link>
        </p>
      </form>
    </div>
  );
};
