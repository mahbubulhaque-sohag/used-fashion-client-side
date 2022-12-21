import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payments = () => {
    const booking = useLoaderData();
    const navigation = useNavigation();

    if(navigation.state === "loading") return <progress className="progress w-56"></progress>

    return (
        <div>
            <h3 className='text-3xl'>Pay for: <strong>{booking.bookingName}</strong></h3>
            <p className="text-xl">Please pay <strong>${booking.price}</strong></p>
            <div className='w96 my-12 mr-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                    booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payments;