import { useTheme } from "@/ThemeContext";
import React, { useState } from "react";
import ThemeToggle from "../ThemeToggle";
import Notis from "../applications2/Notis";
import History from "./History";
import BillOverview from "./BillOverview";
import CurrentPlan from "./CurrentPlan";
import NextPayment from "./NextPayment";
import ExtraFeatures from "./ExtraFeatures";

const BillingScreen = () => {
  const { darkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("billing-overview");

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      {/* <div className="dashboard-header">
        <div
          className={`notification-icon ${darkMode ? "dark" : "light"}`}
          onClick={toggleNotifications}
        >
          <img
            src={`${darkMode ? "/notification2.png" : "/notification.png"}`}
            alt="Notifications"
          />
        </div>
        {showNotifications && <Notis darkMode={darkMode} />}
      </div> */}
      <div className="dashboard-header">
        <h2>Billing overwiev</h2>
      </div>
      <div className="billing-container">
        <div className="billing-title">Billing</div>

        <div className="billing-flex">
          <div className="billing-column1 billing-gap-20 ">
            <div style={{ display: "flex" }}>
              <BillOverview />
              <CurrentPlan darkMode={darkMode} />
            </div>
            <History darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingScreen;
