import React from 'react';

const CheckoutForm = ({ sessionId }) => {
  return (
    <div>
      {/* Additional content or components can be added here */}
      <iframe
        src={`https://checkout.stripe.com/${sessionId}`}
        width="100%"
        height="800px"
        title="Stripe Checkout"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default CheckoutForm;