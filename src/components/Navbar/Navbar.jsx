import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import "./Navbar.css";
/* Icono de usuario */
import { FaUser } from "react-icons/fa";
/* Icono de carrito */
import { IoCart } from "react-icons/io5";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const { esAutenticado, user, logout } = useAuth(); // Obtén el estado de autenticación y el usuario
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <h3>"El Bunker"</h3>
        </Link>

        {/* Enlaces de navegación */}
        <ul
          className={mobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setMobile(false)}
        >
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/shop">
            <li>Shop</li>
          </Link>
          <Link to="/cart">
            <li>Cart</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
        </ul>

        {/* Iconos de usuario y carrito */}
        {/* link para el usuario  */}
        <div className="icons">
          {esAutenticado ? (
            user.user.rol === "Cliente" ? (
              <Link to={"/perfil"}>
                <FaUser className="icon" />
                <span>{user.nombre}</span>
              </Link>
            ) : (
              <Link to={"/dasboard/homeda"}>
                <FaUser className="icon" />
                {/* Aquí puedes agregar contenido si lo necesitas */}
              </Link>
            )
          ) : (
            <Link to={"/login"}>
              <FaUser className="icon" />
            </Link>
          )}

          {/* link para el carrito  */}



          <Link to={"/cart"}>
            <IoCart className="icon" />
          </Link>
        </div>

        {/* Botón del menú hamburguesa */}
        <button className="mobiles-menu" onClick={() => setMobile(!mobile)}>
          {mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};
