import express from 'express';

const router = express.Router();

import Stripe from 'stripe';

const stripe = Stripe('sk_test_51MxM0YFreLlEoqoAwtLnDCINkRy19QaosEreWjO9ByEjL2m1jnfONTdBs50AwQDalOp3OxAx8yto7HRbXXwt5dkt00YlmkxciY');

// Define a route to create a payment intent
router.route('/').post(async (req, res) => {
  let status, error;

  const {token, amount} = req.body;
  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: 'lkr',
    })
    status = "Success";
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.send({error, status});
});

export default router;