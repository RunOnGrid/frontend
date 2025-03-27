import { useTheme } from "@/ThemeContext";
import React, { useEffect, useState } from "react";
import CurrentPlan from "./CurrentPlan";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../stripe/StripeScreen";
import { TokenService } from "../../../tokenHandler";
import { loadStripe } from "@stripe/stripe-js";

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
  const [error, setError] = useState(null);

  useEffect(() => {
    const tokens = TokenService.getTokens();
    if (tokens && tokens.tokens && tokens.tokens.accessToken)
      setAccessToken(tokens.tokens.accessToken);
  }, [accessToken]);

  const handleIntent = async (amount) => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amount: amount,
          currency: "USD",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      setClientSecret(data.clientSecret);
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
            <CurrentPlan onClick={handleIntent} darkMode={darkMode} />
          </div>
        </div>
      </div>
      {showPayment && clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm onClick={setShowPayment} />
        </Elements>
      )}
    </>
  );
};

export default BillingScreen;
