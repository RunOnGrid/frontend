import React, { useState } from "react";

import ThemeToggle from "../ThemeToggle";
import { useTheme } from "@/ThemeContext";
import Notis from "./Notis";
import InfoSideBar from "./InfoSideBar";
import UpgradeInfo from "./UpgradeInfo";

const Update = () => {
  const { darkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        <h2>My applications</h2>

        <div
          className={`notification-icon ${darkMode ? "dark" : "light"}`}
          onClick={toggleNotifications}
        >
          <img
            src={`${
              darkMode
                ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/9c8e0b0b-66e0-4ff9-8035-36e4f8074600/public"
                : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/7d027139-b7ab-4069-7577-8f546dd02f00/public"
            }`}
            alt="Notifications"
          />
        </div>
        {showNotifications && <Notis darkMode={darkMode} />}
      </div>
      <div className={`application-details ${darkMode ? "dark" : "light"}`}>
        <div className="header">
          <h1>Application name</h1>
          <span className="subheader">Web service</span>
          {/* <a href="https://meet.google.com/jrb-zjea-msu" className="link">
          https://meet.google.com/jrb-zjea-msu
        </a> */}
          <div className="deployment-info">
            <div className={`info-box ${darkMode ? "dark" : "light"}`}>
              <h4>Last deployed</h4>
              <span>12/03/2025 17:00:25</span>
            </div>
            <div className={`info-box ${darkMode ? "dark" : "light"}`}>
              <h4>Renewal date</h4>
              <span>12/03/2025</span>
            </div>
          </div>
        </div>
        <h3>Upgrade/Renew</h3>
        <div className="content2">
          <InfoSideBar darkMode={darkMode} />
          <div
            style={{ display: "flex", flexDirection: "column", width: "80%" }}
          >
            <UpgradeInfo darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
