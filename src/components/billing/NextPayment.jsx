import React, { useEffect, useState } from "react";
import { TokenService } from "../../../tokenHandler";

const NextPayment = ({ darkMode }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [balance, setBalance] = useState(0);
  

  return (
    <div className="billing-card3">
      <div className="billing-heading">Account Balance</div>
      <div className="billing-text-large">${10}</div>
    </div>
  );
};

export default NextPayment;
