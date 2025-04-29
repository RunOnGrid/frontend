import { useTheme } from "@/ThemeContext";
import React, { useEffect, useState } from "react";
import CurrentPlan from "./CurrentPlan";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../stripe/StripeScreen";
import { TokenService } from "../../../tokenHandler";
import { loadStripe } from "@stripe/stripe-js";
import NextPayment from "./NextPayment";
import SpendingOverview from "./BillOverview";
import DepositFunds from "./FundsComponent";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const BillingScreen = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("billing-overview");
  const [accessToken, setAccessToken] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tokens = TokenService.getTokens();
    if (tokens && tokens.tokens && tokens.tokens.accessToken)
      setAccessToken(tokens.tokens.accessToken);
  }, [accessToken]);

  const handleAmount = (amount) => {
    const processingFee = amount * 0.029 + 0.3;
    const formattedProcessingFee = processingFee.toFixed(2);
    const totalAmount = amount - processingFee;

    setPaymentAmount(amount);
    setProcessingFee(formattedProcessingFee);
    setTotalAmount(totalAmount.toFixed(2));
  };

  const handleIntent = async (qty) => {
    console.log(qty, paymentAmount);
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amount: qty ? qty : paymentAmount,
          currency: "USD",
          // Optionally, you could also pass the processing fee to your backend
          // processingFee: processingFee
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      setClientSecret(data.clientSecret);
      // Save amount and processing fee in state
      setShowPayment(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <>
      <div
        className={`dashboard-container ${showPayment ? "disabled" : ""} ${
          darkMode ? "dark" : "light"
        } `}
      >
        <div className="billing-container">
          <div className="billing-title">Billing</div>
          <div className="billing-container2">
            <NextPayment />
          </div>
          <DepositFunds
            handleAmount={handleAmount}
            handleIntent={handleIntent}
            showPayment={setShowPayment}
          />
        </div>
      </div>
      {showPayment && clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm
            paymentAmount={paymentAmount}
            processingFee={processingFee}
            totalAmount={totalAmount}
            showPayment={setShowPayment}
            handleAmount={handleAmount}
            handleIntent={handleIntent}
          />
        </Elements>
      )}
    </>
  );
};

export default BillingScreen;
