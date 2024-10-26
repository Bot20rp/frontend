import React, { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import { HomeDas } from "../../views/HomeDas";
import { Outlet } from "react-router-dom";

import RegisterClientPage from '../../pages/RegisterClientPage'
import ProductsPage from '../../pages/ProductsPage'
import ProveedoresPage from '../../pages/ProveedoresPage'
import UsuarioPage from '../../pages/UsuarioPage'
import CategoriaProductPage from '../../pages/CategoriaProductPage' 
import RegisterEmplead from "../../pages/RegisterEmplead";
import CombosPage from "../../pages/CombosPage";
import "./homed.css";
import LoginPage from "../../pages/LoginPage";
import {Bitacora} from '../../pages/Bitacora'
import {Lote} from '../../pages/Lote'


/*VAMOS A PROTEGER LAS RUTAS */
import ProtectedRoute from "../../ProtectedRoute";

export const Homed = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
 
  return (
    <div className={`containe12 ${sidebarOpen ? "active12" : ""}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Rutas protegidas */}
      <Routes>
        <Route path="/homeda" element={<HomeDas />} /> {/* va ah hacer todas la informacion del usuario admi .. nombre correro ..c ontraseña .... editar  */}
        <Route path="/usuarioGestion" element ={ <ProtectedRoute roles={['Administrador']} element={<UsuarioPage />}/>}/>
        <Route path="/clientRegister" element ={ <ProtectedRoute roles={['Administrador,Empleado']} element={<RegisterClientPage />}/>}/> 
        <Route path="/proveedorRegister" element ={ <ProtectedRoute roles={['Administrador']} element={<ProveedoresPage />}/>}/> 
        <Route path="/products" element ={ <ProtectedRoute roles={['Administrador,Empleado']} element={<ProductsPage />}/>}/>  
        <Route path="/categoriaproducto" element ={ <ProtectedRoute roles={['Administrador']} element={<CategoriaProductPage/>}/>}/>   
        <Route path="/empleadRegister" element ={ <ProtectedRoute roles={['Administrador']} element={<RegisterEmplead/>}/>}/>    
        <Route path="/login" element ={ <ProtectedRoute roles={['Administrador,Cliente,Empleado']} element={<LoginPage/>}/>}/>    
        <Route path="/bitacora" element ={ <ProtectedRoute roles={['Administrador']} element={<Bitacora/>} />}/>  
        <Route path="/lote" element ={ <ProtectedRoute roles={['Administrador']} element={<Lote/>} />}/>  
        <Route path="/combos" element ={ <ProtectedRoute roles={['Administrador']} element={<CombosPage/>}/>}/>  
        
      </Routes>




      {/* Esto es para renderizar rutas anidadas si las tienes */}
      <Outlet />
    </div>
  );
};
