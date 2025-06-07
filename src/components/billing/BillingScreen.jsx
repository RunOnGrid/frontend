import { useTheme } from "@/ThemeContext";
import React, { useEffect, useState } from "react";

import NextPayment from "./NextPayment";
import DepositFunds from "./FundsComponent";
import HoverInfo from "@/commons/HoverInfo";
import { TokenService } from "../../../tokenHandler";

const BillingScreen = () => {
  const { darkMode } = useTheme();
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const tokens = TokenService.getTokens();
    if (tokens?.tokens?.accessToken) {
      setAccessToken(tokens.tokens.accessToken);
    }
  }, []);

  const handleIntent = async (amount) => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amount,
          currency: "USD",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.url) {
        window.open(data.url, "_blank"); // O usar window.location.href = data.url si querés redirigir
      } else {
        throw new Error("No checkout URL received.");
      }
    } catch (err) {
      setError(err.message);
      console.error("Stripe checkout error:", err);
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        <h1>
          Billing{" "}
          <HoverInfo
            text={[
              "Deposits to your grid account are non-refundable and can only be used for deployments.",
              "For deposit issues, please contact support@ongrid.run.",
            ]}
          />
        </h1>
      </div>
      <div className="billing-container">
        <div className="billing-container2">
          <NextPayment />
        </div>
        <DepositFunds handleIntent={handleIntent} />
      </div>
    </div>
  );
};

export default BillingScreen;
