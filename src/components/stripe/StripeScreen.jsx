import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Image from "next/image";

export default function CheckoutForm({ onPaymentSuccess, onClick }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsPaymentComplete(false);
    } else {
      setMessage("¡Pago realizado con éxito!");
      setIsPaymentComplete(true);
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  if (isPaymentComplete) {
    return (
      <div className="stripe-form">
        <Image
          className="close-form"
          onClick={() => {
            onClick(false);
          }}
          alt=""
          src="/close.png"
          width={20}
          height={20}
        />
        <div className="payment-success-message">
          <Image alt="" width={160} height={80} src="/LogoLigth.svg" />
          <h3>Successful Payment</h3>
        </div>
      </div>
    );
  }

  return (
    <form className="stripe-form" id="payment-form" onSubmit={handleSubmit}>
      <Image
        className="close-form"
        onClick={() => {
          onClick(false);
        }}
        alt=""
        src="/close.png"
        width={20}
        height={20}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        className="add-button4"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
