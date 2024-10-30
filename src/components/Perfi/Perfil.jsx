import React, { useContext } from "react";
import { useAuth } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from "react-router-dom";
import './perfil.css';

export const Perfil = () => {
    const { logout, user } = useAuth();
    const { purchaseHistory } = useContext(CartContext);
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
            {user ? (
                <>
                    <p>
                        <strong>Rol: {user.user.rol}</strong>
                    </p>
                    <p>
                        <strong>Correo: {user.user.email}</strong>
                    </p>

                    <h3>Historial de Compras</h3>
                    <ul>
                        {purchaseHistory.length > 0 ? (
                            purchaseHistory.map((compra, index) => (
                                <li key={index}>
                                    <p>Producto: {compra.productName}</p>
                                    <p>Precio: Bs {compra.price}</p>
                                    <p>Fecha: {compra.date}</p>
                                    <hr />
                                </li>
                            ))
                        ) : (
                            <p>No has realizado ninguna compra aún.</p>
                        )}
                    </ul>
                </>
            ) : (
                <p>Cargando información del usuario...</p>
            )}

            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};
