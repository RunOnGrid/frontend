import React, { useEffect, useState } from "react";
import { TokenService } from "../../../tokenHandler";

const NextPayment = ({ darkMode }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (accessToken) {
      getBalance();
    }
  }, [accessToken]);

  useEffect(() => {
    const tokens = TokenService.getTokens();
    if (tokens && tokens.tokens && tokens.tokens.accessToken) {
      setAccessToken(tokens.tokens.accessToken);
    }
  }, []);

  const getBalance = async () => {
    try {
      const response = await fetch(`/api/balance-proxy`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      setBalance(data.toFixed(2));
    } catch (err) {
      console.error("Error loading existing app names:", err);
    }
  };

  return (
    <div className="billing-card3">
      <div className="billing-heading">Account Balance</div>
      <div className="billing-text-large">${balance}</div>
    </div>
  );
};

export default NextPayment;
