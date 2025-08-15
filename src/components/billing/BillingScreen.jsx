import { useTheme } from "@/ThemeContext";
import React, { useEffect, useState } from "react";

import NextPayment from "./NextPayment";
import DepositFunds from "./FundsComponent";
import HoverInfo from "@/commons/HoverInfo";
import MobileFooterBar from "../applications2/ProfileFooter";

const BillingScreen = () => {
  const { darkMode } = useTheme();
  const [error, setError] = useState(null);

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
        <DepositFunds handleIntent={1} darkMode={darkMode} />
      </div>
      <MobileFooterBar />
    </div>
  );
};

export default BillingScreen;
