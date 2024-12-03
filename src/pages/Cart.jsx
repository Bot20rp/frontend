import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext"; 
import { useAuth } from '../context/AuthContext'; 
import "./cart.css"; 
import 'font-awesome/css/font-awesome.min.css';
import { IoIosAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { GrFormClose } from "react-icons/gr";
import StripePage from "./PaqueteVenta/StripePage";

export const Cart = () => {
  const { cartList, addToCart, decreaseQty, deleteProduct, setCartList } = useContext(CartContext);
  const { anadirCompra } = useContext(CartContext); 
  const { setMonto } = useAuth();

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const [isPaymentVisible, setPaymentVisible] = useState(false); // Estado para mostrar el pago
  const [paymentCompleted, setPaymentCompleted] = useState(false); // Estado para verificar si el pago fue completado

  const handlePayment = () => {
    // Agregar los productos a la compra
    cartList.forEach(item => {
      const compra = {
        productName: item.productName,
        price: item.price,
        date: new Date().toLocaleDateString(),
      };
      anadirCompra(compra);
    });

    setMonto(totalPrice);
    setPaymentVisible(true);  // Mostrar formulario de pago
  };

  // Callback que será ejecutado una vez se complete el pago
  const onPaymentComplete = () => {
    setCartList([]); // Vaciar el carrito solo cuando el pago haya sido completado
    setPaymentCompleted(true); // Marcar el pago como completado
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="cart-items">
      <div className="cart-container">
        <div className="cart-content">
          {cartList.length === 0 && !paymentCompleted && (
            <h1 className="no-items">No se añadieron productos al carrito</h1>
          )}
          {cartList.map((item) => {
            const productQty = item.price * item.qty;
            return (
              <div className="cart-list" key={item.id}>
                <div className="image-holder">
                  <img src={item.imgUrl} alt={item.productName} />
                </div>
                <div className="cart-details">
                  <h3>{item.productName}</h3>
                  <h5> Precio | cantidad | total</h5>
                  <h4>
                    Bs {item.price}.00 * {item.qty} 
                    <span> = Bs {productQty}.00</span>
                  </h4>
                </div>
                <div className="cart-control">
                  <button
                    className="incCart"
                    onClick={() => addToCart(item, 1)}
                  >
                    <IoIosAdd />
                  </button>
                  <button
                    className="desCart"
                    onClick={() => decreaseQty(item)}
                  >
                    <GrFormSubtract />
                  </button>
                </div>
                <button
                  className="delete"
                  onClick={() => deleteProduct(item)}
                >
                  <GrFormClose />
                </button>
              </div>
            );
          })}
        </div>
        <div className="cart-summary">
          <h2>Carrito</h2>
          <div className="total-price">
            <h4>Total precio :</h4>
            <h3>Bs {totalPrice}.00</h3>
          </div>
          <button onClick={handlePayment}>Seguir con el Pago</button>
        </div>
      </div>

      {/* Condicionalmente renderiza el formulario de pago si el estado isPaymentVisible es true */}
      {isPaymentVisible && <StripePage onPaymentComplete={onPaymentComplete} />}
    </section>
  );
};
