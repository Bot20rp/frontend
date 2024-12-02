import React, { useContext, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import fotoCliente from "./foto.png";
import "./perfil.css";
import {cambiarContrasena} from "../../api/auth";
export const Perfil = () => {
  const { logout, user } = useAuth();
  const { purchaseHistory } = useContext(CartContext);
  const [mostrarMisDatos, setMostrarMisDatos] = useState(true);
  const [mostrarPedidos, setMostrarPedidos] = useState(false);
  const [mostrarMiHistorial, setMostrarMiHistorial] = useState(false);
  const pedidos = ["Pedido 1", "Pedido 2", "Pedido 3"]; // Lista de pedidos
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalContraseña, setMostrarModalContraeña] = useState(false);
  
    /* modificar contraseña miguel */
    const [contraseñaActual, setContraseñaActual] = useState("");
    const [nuevaContraseña, setNuevaContraseña] = useState("");
    const [confirmarNuevaContraseña, setConfirmarNuevaContraseña] = useState("");
    const [errorMensaje, setErrorMensaje] = useState("");
    const [exitoMensaje, setExitoMensaje] = useState("");
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const cambioPerfil = () => {
    setMostrarMisDatos(true);
    setMostrarMiHistorial(false);
    setMostrarPedidos(false);
  };

  const cambioPedidos = () => {
    setMostrarPedidos(true);
    setMostrarMiHistorial(false);
    setMostrarMisDatos(false);
  };

  const cambioHistorial = () => {
    setMostrarMiHistorial(true);
    setMostrarMisDatos(false);
    setMostrarPedidos(false);
  };
  /* abir modal apra editar perfil */
  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal();
  /* abrir modal apra editar contraseña */
  const abrirModalContra = () => setMostrarModalContraeña(true);
  const cerrarModalContraseña = () => setMostrarModalContraeña();

  
  /* funcion u llamada */
  const handleGuardarCambios = async () => {
    console.log({
        oldPassword: contraseñaActual,
        newPassword: nuevaContraseña,
    });
    setErrorMensaje('');
    setExitoMensaje('');

    if (nuevaContraseña !== confirmarNuevaContraseña) {
        setErrorMensaje('Las contraseñas no coinciden.');
        return;
    }

    try {
        const response = await cambiarContrasena({
            oldPassword: contraseñaActual,
        newPassword: nuevaContraseña,
        });

        if (response.status === 200) {
            setExitoMensaje('Contraseña actualizada exitosamente.');
           // setErrorMensaje(error.response?.data?.mensaje || 'Error al actualizar la contraseña. Verifique sus datos.');
            cerrarModalContraseña(); // Cierra el modal si todo va bien
        }
    } catch (error) {
        //setErrorMensaje('Error al actualizar la contraseña. Verifique sus datos.');
        setErrorMensaje(error.response?.data?.mensaje || 'Error al actualizar la contraseña.');
        console.error(error);
    }
};


  return (
    <div className="profile">
      <h2>Perfil del Usuario</h2>

      <div className="nombre">
        <h1>{user?.user.nombre}</h1>
      </div>
      <div className="imagen">
        <img src={fotoCliente} alt="FotoCliente" className="profile-image" />
      </div>

      <button onClick={cambioPerfil}>Datos Personales</button>

      {mostrarMisDatos && (
        <div id="datosPersonales">
          <div className="personaje">
            <div id="datos">
              <div id="minis1">
                <h4>CI</h4>
                <h4>{user?.user.ci}</h4>
              </div>
              <div id="minis1">
                <h4>DIRECCION</h4>
                <h4>{user?.user.direccion}</h4>
              </div>
              <div id="minis1">
                <h4>FECHA NACIMIENTO</h4>
                <h4>{user?.user.fechaNacimiento}</h4>
              </div>
              <div id="minis1">
                <h4>CORREO</h4>
                <h4>{user?.user.email}</h4>
              </div>
            </div>

            <div id="datos">
              <div id="minis1">
                <h4>NIT</h4>
                <h4>{user?.user.nit}</h4>
              </div>
              <div id="minis1">
                <h4>TELEFONO</h4>
                <h4>{user?.user.telefono}</h4>
              </div>
              <div id="minis1">
                <h4>GENERO</h4>
                <h4>{user?.user.genero}</h4>
              </div>
              {/*  <div id="minis1">
                                    <h4>CONTRASEÑA</h4>
                                    <h4>{user?.user.password}</h4>
                                </div> */}
            </div>
          </div>

          <button onClick={abrirModalContra}>Modificar Contraseña</button>

          <button onClick={abrirModal}>Editar Perfil</button>
        </div>
      )}
      <button onClick={cambioPedidos}>Mis Pedidos</button>

      {mostrarPedidos && (
        <div id="pedidos">
          <div className="soyPedidos">
            {pedidos.map((pedido, index) => (
              <div key={index} id="numeroP">
                {pedido}
                <h4>Fecha : 12/12/2024</h4>
                <h4>Total : 12/12/2024</h4>
                <h4>Estado : 12/12/2024</h4>
              </div>
            ))}
          </div>
          <a
            href="https://wa.me/59176672191?text=Hola,%20quiero%20consultar%20sobre%20la%20empresa"
            target="_blank"
          >
            Consultar Empresa
          </a>
        </div>
      )}

      <button onClick={cambioHistorial}>Historial de Mis Pedidos</button>
      {mostrarMiHistorial && (
        <div className="historial">
          <button className="buttonHistorial">Listar Mis Comprobantes</button>
          <div>
            <table className="tableHistorial">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Monto Total</th>
                  <th>Ver/Imprimir</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      )}

      <div id="logaut">
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      {/* ventana odal */}
      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Modificar Perfil</h3>
            <form>
              <div>
                <label>Correo</label>
                <input type="email" placeholder={user.user.email} />
              </div>
              <div>
                <label>Dirección</label>
                <input type="text" placeholder="ingresa una nueva direccion" />
              </div>
              <div>
                <label>Nueva Contraseña</label>
                <input type="password" placeholder="Ingrese nueva contraseña" />
              </div>
            </form>
            <div className="modal-actions">
              <button onClick={cerrarModal}>Cancelar</button>
              <button>Modificar</button>
            </div>
          </div>
        </div>
      )}
      {/* mostrar modal para contradseñaaa */}
      {mostrarModalContraseña && (
        <div className="modal">
          <div className="modal-content">
            <h3>Modificar Contraseña</h3>
            <form>
              <div>
                <label>Contraseña Actual</label>
                <input
                  type="password"
                  placeholder="Ingrese su contraseña actual"
                  value={contraseñaActual}
                  onChange={(e) => setContraseñaActual(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Nueva Contraseña</label>
                <input
                  type="password"
                  placeholder="Ingrese una nueva contraseña"
                  value={nuevaContraseña}
                  onChange={(e) => setNuevaContraseña(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  placeholder="Confirme su nueva contraseña"
                  value={confirmarNuevaContraseña}
                  onChange={(e) => setConfirmarNuevaContraseña(e.target.value)}
                  required
                />
              </div>
            </form>
            <div className="modal-actions">
              <button onClick={cerrarModalContraseña}>Cancelar</button>
              <button onClick={handleGuardarCambios}>Guardar Cambios</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
