// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// import { useParams } from 'react-router';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { fee } = useParams();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Make a request to your backend to create a payment intent
//     const response = await fetch('http://localhost:8080/api/payment', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: fee, currency: 'lkr', payment_method_types: ['cards'] }),
//     });

//     const data = await response.json();

//     // Confirm the card payment on the client
//     const result = await stripe.confirmCardPayment(data.clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (result.error) {
//       console.error(result.error.message);
//     } else {
//       // Payment succeeded
//       console.log('Payment succeeded:', result.paymentIntent);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md max-w-md w-full">
//         <div className="mb-4">
//           <label className="block text-gray-700">Card details</label>
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: '16px',
//                   color: '#424770',
//                   '::placeholder': {
//                     color: '#aab7c4',
//                   },
//                 },
//                 invalid: {
//                   color: '#9e2146',
//                 },
//               },
//             }}
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-black hover:bg-black text-white font-semibold py-2 px-4 rounded-full w-full"
//           disabled={!stripe || loading}
//         >
//           Pay Rs.{fee}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51MxM0YFreLlEoqoAeH0F3pkVu0M9OKo55p00CZCuYgAeVjMrPs55JVL40UZTPNeapYuzxAn50uH67VpbdkBpobpt00nHKcySE9');

const PaymentForm = () => {
  const [sessionId, setSessionId] = useState(null);

  const handleClick = async () => {
    // Call your server to create a checkout session
    const response = await fetch('http://localhost:8080/api/payment', {
      method: 'POST',
    });

    const session = await response.json();
    setSessionId(session.id);
  };

  return (
    <div>
      <button onClick={handleClick}>Proceed to Checkout</button>
      {sessionId && <CheckoutForm sessionId={sessionId} />}
    </div>
  );
};

export default PaymentForm;