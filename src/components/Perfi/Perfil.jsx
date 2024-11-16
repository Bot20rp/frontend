import React, { useContext, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from "react-router-dom";
import fotoCliente from './foto.png';
import './perfil.css';

export const Perfil = () => {
    const { logout, user } = useAuth();
    const { purchaseHistory } = useContext(CartContext);
    const [mostrarMisDatos, setMostrarMisDatos] = useState(true);
    const [mostrarPedidos, setMostrarPedidos] = useState(false);
    const [mostrarMiHistorial, setMostrarMiHistorial] = useState(false);
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

    const cambioPerfil = () => {
        setMostrarMisDatos(true);
        setMostrarMiHistorial(false)
        setMostrarPedidos(false)
    }

    const cambioPedidos = () => {
        setMostrarPedidos(true)
        setMostrarMiHistorial(false)
        setMostrarMisDatos(false)
    }

    const cambioHistorial = () => {
        setMostrarMiHistorial(true);
        setMostrarMisDatos(false)
        setMostrarPedidos(false)
    }

    return (
        <div className="profile">
            <h2>Perfil del Usuario</h2>

            <div className="nombre">
                <h1>JOAN DANIEL</h1>
            </div>
            <div className="imagen">
                <img src={fotoCliente} alt="FotoCliente" className="profile-image" />
            </div>

            <button onClick={cambioPerfil}>Datos Personales</button>

            {
                mostrarMisDatos && (


                    <div id="datosPersonales">

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
                                    <h4>********</h4>
                                </div>
                            </div>
                        </div>

                        <button>EditarPerfil</button>

                    </div>
                )
            }
            <button onClick={cambioPedidos}>Mis Pedidos</button>

            {
                mostrarPedidos && (
                    <div id="pedidos" >
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
                )
            }


            <button onClick={cambioHistorial}>Historial de Mis Pedidos</button>
            {
                mostrarMiHistorial && (
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
                )
            }

            <div id="logaut">
                <button onClick={handleLogout} >Cerrar sesión</button>
            </div>
        </div>
    );
};
