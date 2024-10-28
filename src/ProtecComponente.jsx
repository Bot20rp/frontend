
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtecComponente({ component: Component }) {
  const { loading, esAutenticado } = useAuth();

 
  if (loading) return <div>Loading...</div>;


  if (!esAutenticado) return <Navigate to="/login" replace />;


  return <Component />;

}

export default ProtecComponente;
