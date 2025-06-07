import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
"pk_test_51OyeDUI9Ub3q7ez0M65r5xAPHgcAaNLqXHV3UG2FNifIVFJ03lPZrzAl5tZMW0sarc8I6rXK9PBfDkr4DwHJjXzM00aabOHmn2"
);
export default function App() {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/checkout_sessions", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
