import React, { useState } from 'react';
import AppActive from './AppActive';
import TeamActive from './TeamActive';
import NewTeam from './NewTeam';
import EnvActive from './EnvActive';
import NewEnv from './NewEnv';
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "@/ThemeContext";
import AppContainer from "./AppContainer";
import Notis from "../applications2/Notis";
import BillingSection from "./BillingSection";
import TeamSection from "./TeamSection";
import EnvSection from "./EnvSection";
import EventSection from "./EventSection";

const DashboardActive = () => {
  const { darkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

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
            src={`${darkMode ? "notification2.png" : "notification.png"}`}
            alt="Notifications"
          />
        </div>
        {showNotifications && <Notis darkMode={darkMode} />}
      </div>
      <div
        style={{ display: "flex", gap: "20px", width: "92%", margin: "auto" }}
      >
        <AppContainer type="Applications" darkMode={darkMode} />
        <AppContainer type="Databases" darkMode={darkMode} />
      </div>

      <div className="middle-section">
        <BillingSection darkMode={darkMode} />
        <TeamSection darkMode={darkMode} />
        <EnvSection darkMode={darkMode} />
      </div>
      <EventSection darkMode={darkMode} />
    </div>
  );
};

export default DashboardActive;
