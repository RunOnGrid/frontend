import { useTheme } from "@/ThemeContext";
import React, { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../stripe/StripeScreen";
import { TokenService } from "../../../tokenHandler";
import { loadStripe } from "@stripe/stripe-js";
import NextPayment from "./NextPayment";
import SpendingOverview from "./BillOverview";
import DepositFunds from "./FundsComponent";
import DisclaimerHover from "./HoverDisclaimer";
import HoverInfo from "@/commons/HoverInfo";
import StripeWrapper from "../stripe/StripeWrapper";

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
  const [paymentAmount, setPaymentAmount] = useState(5);
  const [processingFee, setProcessingFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [minError, setMinError] = useState("");
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
  const handleAmountInput = (e) => {
    const processingFee = Number(e) * 0.029 + 0.3;
    const formattedProcessingFee = processingFee.toFixed(2);
    const totalAmount = Number(e) - processingFee;

    setPaymentAmount(Number(e));
    setProcessingFee(formattedProcessingFee);
    setTotalAmount(totalAmount.toFixed(2));
  };

  const handleIntent = async (qty) => {
    if (qty >= 5) {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            amount: qty,
            currency: "USD",
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        setClientSecret(data.clientSecret);
        // Save amount and processing fee in state
        setShowPayment(true);
        setMinError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading2(false);
      }
    } else {
      setMinError("Minimum deposit is 5 USD");
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
          <div className="billing-title">
            Billing{" "}
            <HoverInfo
              text={[
                " Deposits to your grid account are non-refundable and can be only use for deployments.",
                "For Deposits Issues please contact support@ongrid.run",
              ]}
            />
          </div>

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
        <StripeWrapper
          stripePromise={stripePromise}
          clientSecret={clientSecret}
          paymentAmount={paymentAmount}
          processingFee={processingFee}
          totalAmount={totalAmount}
          showPayment={setShowPayment}
          handleAmount={handleAmount}
          handleIntent={handleIntent}
          handleAmountInput={handleAmountInput}
          setPaymentAmount={setPaymentAmount}
          minError={minError}
          setMinError={setMinError}
        />
      )}
      {/* {showPayment && clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm
           
          />
        </Elements>
      )} */}
    </>
  );
};

export default BillingScreen;
