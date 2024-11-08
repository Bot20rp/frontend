import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import { useStripe } from '@stripe/react-stripe-js';
import { useElements } from '@stripe/react-stripe-js';
import { insertarPago } from '../../api/auth';
import 'bootswatch/dist/lux/bootstrap.min.css'

const stripePromes = loadStripe("pk_test_51QIewwDhm58X9ebvL2b9ZGx2AxItSBgRuWMyPxDu88d4rV5fI8XDJUe43PVGcLvOwNIWtTYBcEZM8J4nl9JDiESg005uydqNOc");

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSumi = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if(!error){
            const {id} = paymentMethod;
            console.log(paymentMethod)
            const{data} = await insertarPago(id);
            console.log(data);
        }
    }

    return (
        <form onSubmit={handleSumi} className="card card-body" >
            <CardElement />
            <button>Submit</button>
        </form>
    );
};

function StripePage() {
    return (
        <Elements stripe={stripePromes}>
            <div className='container p-4'>
                <div >
                    <div className='col-md-4 offset-md-4'>
                        <CheckoutForm />
                    </div>
                </div>
            </div>
        </Elements>
    )
}

export default StripePage
