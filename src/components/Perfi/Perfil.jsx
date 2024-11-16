import React, { useContext } from "react";
import { useAuth } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from "react-router-dom";
import fotoCliente from './foto.png';
import './perfil.css';

export const Perfil = () => {
    const { logout, user } = useAuth();
    const { purchaseHistory } = useContext(CartContext);
    const pedidos = ["Pedido 1", "Pedido 2", "Pedido 3"]; // Lista de pedidos

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="profile">
            <h2>Perfil del Usuario</h2>

            <div className="nombre">
                <h1>JOAN DANIEL</h1>
            </div>
            <div className="imagen">
                <img src={fotoCliente} alt="FotoCliente" className="profile-image" />
            </div>
            <div id="datosPersonales">

                <h2 className="titleDatosPersonales">Datos Personales</h2>
                <div className="personaje">

                    <div id="datos">
                        <div id="minis1">
                            <h4>CI</h4>
                            <h4>98745128</h4>
                        </div>
                        <div id="minis1">
                            <h4>DIRECCION</h4>
                            <h4>98745128</h4>
                        </div>
                        <div id="minis1">
                            <h4>FECHA NACIMIENTO</h4>
                            <h4>98745128</h4>
                        </div>
                        <div id="minis1">
                            <h4>CORREO</h4>
                            <h4>98745128</h4>
                        </div>
                    </div>

                    <div id="datos">
                        <div id="minis1">
                            <h4>NIT</h4>
                            <h4>98745128</h4>
                        </div>
                        <div id="minis1">
                            <h4>TELEFONO</h4>
                            <h4>98745128</h4>
                        </div>
                        <div id="minis1">
                            <h4>GENERO</h4>
                            <h4>98745128</h4>
                        </div>
                        <div id="minis1">
                            <h4>CONTRASEÑA</h4>
                            <h4>98745128</h4>
                        </div>
                    </div>
                </div>

                <button>EditarPerfil</button>

            </div>

            <div id="pedidos">
                <h2>Mis Pedidos</h2>
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
                <a href="https://wa.me/59176672191?text=Hola,%20quiero%20consultar%20sobre%20la%20empresa" target="_blank">Consultar Empresa</a>

            </div>

            <div className="historial">
                <h2>Historial de mis Pedidos</h2>
                <button>Listar Mis Comprobantes</button>
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


            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};
