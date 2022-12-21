import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";

const CheckOutForm = ({booking}) => {
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const {price, orderer, email, _id} = booking;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://mh-fashion-server-side.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);


  const handleSubmit = async(event) => {
    event.preventDefault();
    if(!stripe || !elements){
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message)
    } 
    else {
      setCardError('')
    }

    setSuccess('');
    setProcessing(true);
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: orderer,
            email: email
          },
        },
      },
    );

      if(confirmError){
        setCardError(confirmError.message)
        return;
      }
      if(paymentIntent.status === "succeeded"){
  
        // store payment info in database
        const payment = {
          price : price,
          transactionId : paymentIntent.id,
          email: email,
          bookingId: _id
        }
        fetch('https://mh-fashion-server-side.vercel.app/payments',{
          method: 'POST',
          headers: {
            'content-type' : 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(payment)
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.insertedId){
            setSuccess('Congratulation! your payment completed.');
            setTransactionId(paymentIntent.id);
          }
        })
      }
      setProcessing(false);

  };
 
    return (
     <>
      <form onSubmit={handleSubmit}>
      <CardElement
        options={{
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
        }}
      />
      <button className="btn btn-sm mt-3 btn-secondary" 
      type="submit" 
      disabled={!stripe || !clientSecret || processing}>
        Pay
      </button>
    </form>
    <p className="text-red-500">{cardError}</p>
    {
      success && <div>
        <p className="text-green-600">{success}</p>
        <p>Your transactionId: <span className="font-bold">{transactionId}</span></p>
      </div>
    }
    </>
    );
};

export default CheckOutForm;