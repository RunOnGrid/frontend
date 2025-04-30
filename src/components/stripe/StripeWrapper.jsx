// components/StripeWrapper.jsx
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./StripeScreen";

const StripeWrapper = ({ stripePromise, clientSecret, paymentAmount, showPayment,
    processingFee,
    totalAmount,
    handleAmount,
    handleIntent,
    handleAmountInput,
    setPaymentAmount,minError, setMinError }) => {
  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <Elements key={clientSecret} stripe={stripePromise} options={options}>
      <CheckoutForm  paymentAmount={paymentAmount}
    processingFee={processingFee}
    totalAmount={totalAmount}
    showPayment={showPayment}
    handleAmount={handleAmount}
    handleIntent={handleIntent}
    handleAmountInput={handleAmountInput}
    setPaymentAmount={setPaymentAmount}
    minError={minError}
    setMinError={setMinError} />
    </Elements>
  );
};

export default StripeWrapper;
