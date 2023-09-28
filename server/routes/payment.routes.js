import express from 'express';

const router = express.Router();

import Stripe from 'stripe';

const stripe = Stripe('sk_test_51MxM0YFreLlEoqoAwtLnDCINkRy19QaosEreWjO9ByEjL2m1jnfONTdBs50AwQDalOp3OxAx8yto7HRbXXwt5dkt00YlmkxciY');

// Define a route to create a payment intent
router.route('/').post(async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;