import express from 'express';

const router = express.Router();

import Stripe from 'stripe';

const stripe = Stripe('sk_test_51MxM0YFreLlEoqoAwtLnDCINkRy19QaosEreWjO9ByEjL2m1jnfONTdBs50AwQDalOp3OxAx8yto7HRbXXwt5dkt00YlmkxciY');

// Define a route to create a payment intent
router.route('/').post(async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Your Product Name',
          },
          unit_amount: 1000, // Amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/', // Redirect to this page on successful payment
    cancel_url: 'http://localhost:5173/', // Redirect to this page if the user cancels
  });

  res.json({ id: session.id });
});

export default router;