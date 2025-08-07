import Stripe from "stripe";
import MiningTransaction from "../../models/miningApp/MiningTransaction.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { amount, type, currency } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    automatic_payment_methods: { enabled: true },
    metadata: {
      userId: req.user.userId,
      type,
    },
  });

  const newTransaction = new MiningTransaction({
    userId: req.user.userId,
    amount,
    currency,
    transactionType: type,
    status: "Pending",
    stripePaymentIntentId: paymentIntent.id,
  });
  await newTransaction.save();
  res
    .status(200)
    .json({
      msg: "transaction intent successfull",
      clientSecret: paymentIntent.client_secret,
    });
};
