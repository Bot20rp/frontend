import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { insertarPago } from '../../api/auth';

const stripePromesa = loadStripe("pk_test_51QIewwDhm58X9ebvL2b9ZGx2AxItSBgRuWMyPxDu88d4rV5fI8XDJUe43PVGcLvOwNIWtTYBcEZM8J4nl9JDiESg005uydqNOc");

const FormularioPago = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError('');
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (error) {
            setError("Hubo un error al procesar el pago. Por favor, verifica tu información.");
            setCargando(false);
            return;
        }

        const { id } = paymentMethod;
        try {
            const { data } = await insertarPago(id);
            console.log(data);
            setError('');
        } catch (error) {
            setError("El pago falló. Intenta nuevamente.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <form onSubmit={manejarEnvio} style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "450px",
            padding: "25px",
            backgroundColor: "#f7f7f9",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            gap: "15px"
        }}>
            <CardElement options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }} />
            {error && <div style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</div>}
            <button 
                type="submit"
                disabled={!stripe || cargando}
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    backgroundColor: cargando ? "#ccc" : "#6772e5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: cargando ? "not-allowed" : "pointer",
                    transition: "background-color 0.3s"
                }}
            >
                {cargando ? "Procesando..." : "Pagar"}
            </button>
        </form>
    );
};

function PaginaStripe() {
    return (
        <Elements stripe={stripePromesa}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                backgroundColor: "#e5e5e5",
                padding: "20px"
            }}>
                <FormularioPago />
            </div>
        </Elements>
    );
}

export default PaginaStripe;
