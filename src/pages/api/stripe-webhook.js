// pages/api/webhook.js
import Stripe from "stripe";
import { buffer } from "micro";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Disable body parser for this route as we need the raw body for webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle different event types
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent ${paymentIntent.id} was successful!`);
        // Add your business logic here (e.g., update order status, send email)
        break;
      case "payment_intent.created":
        const paymentCreate = event.data.object;
        console.log(`PaymentIntent ${paymentCreate} was successful!`);
        // Add your business logic here (e.g., update order status, send email)
        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        console.log(`Payment failed for PaymentIntent ${failedPayment.id}`);
        // Handle failed payment
        break;

      case "checkout.session.completed":
        const session = event.data.object;
        console.log(`Checkout session ${session.id} completed`);
        // Handle successful checkout
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook handler failed:", err);
    res.status(500).end("Webhook handler failed");
  }
}
