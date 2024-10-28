import React, { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import { HomeDas } from "../../views/HomeDas";
import { Outlet } from "react-router-dom";
import "./homed.css";

import RegisterClientPage from "../../pages/PaqueteUsu/RegisterClientPage";
import ProductsPage from "../../pages/PaqueteInventario/ProductsPage";
import ProveedoresPage from "../../pages/PaqueteUsu/ProveedoresPage";
import UsuarioPage from "../../pages/PaqueteUsu/UsuarioPage";
import CategoriaProductPage from "../../pages/PaqueteInventario/CategoriaProductPage";
import RegisterEmplead from "../../pages/PaqueteUsu/RegisterEmplead";
import CombosPage from "../../pages/PaqueteVenta/CombosPage";
import LoginPage from "../../pages/PaqueteUsu/LoginPage";
import { Bitacora } from "../../pages/PaqueteUsu/Bitacora";
import { Lote } from "../../pages/PaqueteCompra/Lote";
import PrivilegioPages from "../../pages/PaqueteUsu/PrivilegioPages";
import OrganizacionProductPage from "../../pages/PaqueteInventario/OrganizacionProductPage";
import Compras from "../../pages/PaqueteCompra/Compras";

/* VAMOS A PROTEGER LAS RUTAS */
import ProtectedRoute from "../../ProtectedRoute";
import ProtectedRoutePrivilegios from "../../ProtectPrivilegios";

export const Homed = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`containe12 ${sidebarOpen ? "active12" : ""}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Ruta pública o sin protección */}
      <Routes>
        <Route path="/homeda" element={<HomeDas />} />

        {/* Rutas protegidas solo para "Administrador" */}
        <Route element={<ProtectedRoute roles={['Administrador']} />}>
          <Route
            path="/organizacion-productos"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina organizacionProducto">
                <OrganizacionProductPage />
              </ProtectedRoutePrivilegios>
            }
          />
          <Route
            path="/empleadRegister"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina empleados">
                <RegisterEmplead />
              </ProtectedRoutePrivilegios>
            }
          />
          <Route
            path="/privilegios"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina privilegios">
                <PrivilegioPages />
              </ProtectedRoutePrivilegios>
            }
          />
        </Route>


        {/* Rutas protegidas para "Administrador" o "Empleado" */}
        <Route element={<ProtectedRoute roles={['Administrador', 'Empleado']} />}>

          <Route
            path="/bitacora"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina bitacora">
                <Bitacora />
              </ProtectedRoutePrivilegios>
            }
          />
          <Route
            path="/usuarioGestion"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina usuarios">
                <UsuarioPage />
              </ProtectedRoutePrivilegios>
            }
          />
          <Route
            path="/clientRegister"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina clientes">
                <RegisterClientPage />
              </ProtectedRoutePrivilegios>
            }
          />
          <Route
            path="/proveedorRegister"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina proveedores">
                <ProveedoresPage />
              </ProtectedRoutePrivilegios>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina productos">
                <ProductsPage />
              </ProtectedRoutePrivilegios>
            }
          />
          <Route
            path="/categoriaproducto"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina categorias">
                <CategoriaProductPage />
              </ProtectedRoutePrivilegios>
            }
          />
          <Route
            path="/combos"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina combos">
                <CombosPage />
              </ProtectedRoutePrivilegios>
            }
          />
          <Route
            path="/compras"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina compras">
                <Compras />
              </ProtectedRoutePrivilegios>
            }
          />
          <Route
            path="/lote"
            element={
              <ProtectedRoutePrivilegios privilegeDescription="ver pagina lotes">
                <Lote />
              </ProtectedRoutePrivilegios>
            }
          />

        </Route>

        {/* Rutas protegidas para cualquier usuario autenticado */}
        <Route element={<ProtectedRoute roles={['Administrador', 'Cliente', 'Empleado']} />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>

      {/* Esto es para renderizar rutas anidadas si las tienes */}
      <Outlet />
    </div>
  );
};
