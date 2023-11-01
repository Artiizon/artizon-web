import React from 'react';

const CheckoutForm = ({ sessionId }) => {
  return (
    <div>
      {/* Additional content or components can be added here */}
      <iframe
        src={`https://api.stripe.com/v1/checkout/sessions`}
        width="100%"
        height="800px"
        title="Stripe Checkout"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default CheckoutForm;