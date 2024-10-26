const ProtectedRoute = ({ roles, element }) => {
  const { loading, esAutenticado, rol } = useAuth();

  // Asegurarse de que no se renderice nada mientras está cargando
  if (loading) return <div>Cargando...</div>;

  if (!esAutenticado) return <Navigate to='/login' replace />;

  console.log(rol)

  if (!rol || !roles.includes(rol)) {
      return <h1>No tienes permiso para acceder a esta página.</h1>; // Mensaje de error o redirección
  }

  return element ? element : <Outlet />;
};
