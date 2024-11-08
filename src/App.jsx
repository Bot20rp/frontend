import { BrowserRouter, Routes, Route, useLocation ,Navigate } from "react-router-dom";

/* context */
import { AuthProvider,useAuth } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
/* componentes reutilizados */
import { Footer } from "./components/Footer/Footer.jsx";
import { Navbar } from "./components/Navbar/Navbar.jsx";
/* componentes publicos  publicas que podran ver todos las personas */
import { Home } from "./pages/Home.jsx";
import ProtecComponente from "./ProtecComponente.jsx";
import { Shop } from "./pages/Shop.jsx";
import { Product } from "./pages/Product.jsx";
import { Cart } from "./pages/Cart.jsx";
import { Contact } from "./pages/Contact.jsx";
import LoginPage from "./pages/PaqueteUsu/LoginPage.jsx";
import RegisterPage from "./pages/PaqueteUsu/RegisterPage.jsx";
/* componente protegido */
import { Homed } from "./components/HomeD/Homed.jsx";
import CombosPage from "./pages/PaqueteVenta/CombosPage.jsx";
/*Componenete para proteger las rutas */
import ProtectedRoute from "./ProtectedRoute.jsx";
import OrganizacionProductPage from "./pages/PaqueteInventario/OrganizacionProductPage.jsx";
import Compras from "./pages/PaqueteCompra/Compras.jsx";

/* paguinas no encontradas */
import {NotFound} from './components/notfound/NotFound.jsx'

import {Perfil} from './components/Perfi/Perfil.jsx'
import ProveedoresPage from "./pages/PaqueteUsu/ProveedoresPage.jsx";
import ProductsPage from "./pages/PaqueteInventario/ProductsPage.jsx";
import { Lote } from "./pages/PaqueteCompra/Lote.jsx";
import UsuarioPages from "./pages/PaqueteUsu/UsuarioPage.jsx";
import { Bitacora } from "./pages/PaqueteUsu/Bitacora.jsx";
import VentaPage from "./pages/PaqueteVenta/VentaPage.jsx";
import AperturaPage from "./pages/PaqueteVenta/AperturaPage.jsx";
import StripePage from "./pages/PaqueteVenta/StripePage.jsx";
/* ------------------------------------------------------------ */

function Main() {
  const location = useLocation(); 
  const { user } = useAuth(); // Acceso al contexto de autenticación
  

  
  const isDashboardRoute = location.pathname.startsWith("/dasboard");

  return (
    <>
      
    {/*   {!isDashboardRoute && <Navbar && Rutas Publicas/>} */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/perfil" element={<Perfil />} /> 
        <Route path="/perfil" element={user ? <Perfil /> : <Navigate to="/login" />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/organiz" element={<OrganizacionProductPage />} />
        <Route path="/combo" element={<CombosPage />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/factura" element={<VentaPage/>} />
        <Route path="/apertura" element={<AperturaPage/>} />
        <Route path="/pago" element={<StripePage/>} />
        <Route path="*" element={<NotFound />} />
        {/* auqi elimine el rol de cliente ___ */}
        <Route path="/dasboard/*" element ={<ProtectedRoute roles={['Administrador','Empleado']} element={<ProtecComponente component={Homed} />} />
      
      }/>
      </Routes>
      {!isDashboardRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;