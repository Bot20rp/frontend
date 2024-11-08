import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { insertarPago } from '../../api/auth';

const stripePromes = loadStripe("pk_test_51QIewwDhm58X9ebvL2b9ZGx2AxItSBgRuWMyPxDu88d4rV5fI8XDJUe43PVGcLvOwNIWtTYBcEZM8J4nl9JDiESg005uydqNOc");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const { data } = await insertarPago(id);
                setSuccess(true);
                elements.getElement(CardElement).clear(); // Limpia el formulario

            } catch (error) {
                setError("Error al procesar el pago.");
            }
        } else {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <CardElement options={styles.cardElement} />
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>Pago exitoso</p>}
            <button type="submit" style={styles.button(loading)} disabled={loading}>
                {loading ? "Procesando..." : "Pagar"}
            </button>
        </form>
    );
};

function StripePage() {
    return (
        <Elements stripe={stripePromes}>
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <h2>Formulario de Pago</h2>
                    <CheckoutForm />
                </div>
            </div>
        </Elements>
    );
}

export default StripePage;

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
    },
    innerContainer: {
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        padding: "40px",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    cardElement: {
        style: {
            base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
            },
            invalid: {
                color: "#c23d4b",
            },
        },
    },
    button: (loading) => ({
        backgroundColor: loading ? "#cccccc" : "#6772e5",
        color: "#fff",
        padding: "10px 0",
        border: "none",
        borderRadius: "4px",
        cursor: loading ? "not-allowed" : "pointer",
        fontWeight: "bold",
        transition: "background-color 0.2s ease",
    }),
    error: {
        color: "#c23d4b",
        fontSize: "14px",
    },
    success: {
        color: "#4BB543",
        fontSize: "14px",
    }
};
