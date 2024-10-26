import React, { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import { HomeDas } from "../../views/HomeDas";
import { Outlet } from "react-router-dom";

import RegisterClientPage from '../../pages/RegisterClientPage';
import ProductsPage from '../../pages/ProductsPage';
import ProveedoresPage from '../../pages/ProveedoresPage';
import UsuarioPage from '../../pages/UsuarioPage';
import CategoriaProductPage from '../../pages/CategoriaProductPage';
import RegisterEmplead from "../../pages/RegisterEmplead";
import CombosPage from "../../pages/CombosPage";
import "./homed.css";
import LoginPage from "../../pages/LoginPage";
import { Bitacora } from '../../pages/Bitacora';
import { Lote } from '../../pages/Lote';

/* VAMOS A PROTEGER LAS RUTAS */
import ProtectedRoute from "../../ProtectedRoute";

export const Homed = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`containe12 ${sidebarOpen ? "active12" : ""}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Rutas protegidas */}
      <Routes>
        <Route path="/homeda" element={<HomeDas />} /> {/* Ruta pública o sin protección */}

        {/* Rutas protegidas solo para "Administrador" */}
        <Route element={<ProtectedRoute roles={['Administrador']} />}>
          <Route path="/usuarioGestion" element={<UsuarioPage />} />
          <Route path="/proveedorRegister" element={<ProveedoresPage />} />
          <Route path="/categoriaproducto" element={<CategoriaProductPage />} />
          <Route path="/empleadRegister" element={<RegisterEmplead />} />
          <Route path="/bitacora" element={<Bitacora />} />
          <Route path="/lote" element={<Lote />} />
          <Route path="/combos" element={<CombosPage />} />
        </Route>

        {/* Rutas protegidas para "Administrador" o "Empleado" */}
        <Route element={<ProtectedRoute roles={['Administrador', 'Empleado']} />}>
          <Route path="/clientRegister" element={<RegisterClientPage />} />
          <Route path="/products" element={<ProductsPage />} />
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
