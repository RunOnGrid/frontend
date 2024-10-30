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
      <div className="dashboard-header">
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
      </div>
      <div className="billing-container">
        <div className="billing-tabs">
          <div
            className={`billing-tab ${
              activeTab === "billing-overview" ? "billing-tab-active" : ""
            }`}
            onClick={() => setActiveTab("billing-overview")}
          >
            Billing overview
          </div>
          {/* <div
            className={`billing-tab ${
              activeTab === "billing-settings" ? "billing-tab-active" : ""
            }`}
            onClick={() => setActiveTab("billing-settings")}
          >
            Billing settings
          </div>
          <div
            className={`billing-tab ${
              activeTab === "invoice-settings" ? "billing-tab-active" : ""
            }`}
            onClick={() => setActiveTab("invoice-settings")}
          >
            Invoice settings
          </div> */}
        </div>

        <div className="billing-title">Billing</div>

        <div className="billing-flex">
          <div className="billing-column1 billing-gap-20 ">
            <History darkMode={darkMode} />
            <BillOverview />
          </div>
          {/* 
          <div className="billing-column2 billing-gap-20">
            <CurrentPlan darkMode={darkMode} />
            <NextPayment darkMode={darkMode} />
            <ExtraFeatures />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BillingScreen;
