import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({roles, element}) =>{

  console.log("1")
  console.log(rol)
    const {loading, esAutenticado,rol } = useAuth();
    if(!loading && !esAutenticado) return <Navigate to ='/login' replace/>

    if (!rol || !roles.includes(rol)) {
      return <h1>No tienes permiso para acceder a esta página.</h1>; // Puedes ajustar este mensaje o redirigir a otra página
    }

    return element ? element : <Outlet />;
}

export default ProtectedRoute
