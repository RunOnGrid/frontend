import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TokenService } from "../../../tokenHandler";
import ""

const CurrentPlan = ({ darkMode, onClick, handleAmount }) => {
  const [balance, setBalance] = useState(0);
  const [accessToken, setAccessToken] = useState(null);
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
  return (
    <div className={`billing-section ${darkMode ? "dark" : "light"}`}>
      <div className="section-header2">
        <h1>CREDITS</h1>
      </div>
      <div className="billing-info">
        <h3>${balance} </h3>
      </div>
      <div className="billing-buttons">
        <button
          onClick={() => {
            handleAmount(1);
          }}
          className="billing3"
        >
          {" "}
          Add $1
        </button>
        <button
          onClick={() => {
            handleAmount(5);
          }}
          className="billing3"
        >
          {" "}
          Add $5
        </button>
        <button
          onClick={() => {
            handleAmount(10);
          }}
          className="billing3"
        >
          {" "}
          Add $10
        </button>
        <button
          onClick={() => {
            handleAmount(20);
          }}
          className="billing3"
        >
          {" "}
          Add $20
        </button>
        <button
          onClick={() => {
            handleAmount(50);
          }}
          className="billing3"
        >
          {" "}
          Add $50
        </button>
      </div>
    </div>
  );
};

export default CurrentPlan;
