import React from 'react';
import { useAuth } from './context/AuthContext';

const ProtectedRoutePrivilegios = ({ privilegeDescription, children }) => {
  const { user } = useAuth(); // Mover la llamada dentro del componente
  console.log(user)
  const hasPrivilege = user?.permisos.some(
    (permiso) => permiso.Descripcion === privilegeDescription && permiso.Estado === 1
  );

  if (!hasPrivilege) {
    return <h1>No tienes permiso para acceder a esta página.</h1>; // Redirigir a una página de "Acceso Denegado" o a otra ruta
  }

  return children;
};

export default ProtectedRoutePrivilegios ;
