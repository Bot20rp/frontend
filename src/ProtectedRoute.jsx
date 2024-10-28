import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ roles, element }) => {
  const { loading, esAutenticado, rol } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!esAutenticado) return <Navigate to='/login' replace />;


  if (!rol || !roles.includes(rol)) {
    return <h1>No tienes permiso para acceder a esta página.</h1>;
  }

  return element ? element : <Outlet />;
};

export default ProtectedRoute;
