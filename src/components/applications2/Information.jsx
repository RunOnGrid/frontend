import React, { useState } from "react";
import General from "./General";
import Domains from "./Domains";
import Notifications from "./Notifications";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "@/ThemeContext";
import Notis from "./Notis";
import InfoSideBar from "./InfoSideBar";

const Information = () => {
  const { darkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        <h2>My applications</h2>
        <ThemeToggle />
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
        <div className="content">
          <InfoSideBar darkMode={darkMode} />
          <div
            style={{ display: "flex", flexDirection: "column", width: "80%" }}
          >
            <General darkMode={darkMode} />
            <Domains darkMode={darkMode} />
            <Notifications darkMode={darkMode} />
            <div>
              <div className="noti-buttons2">
                <button className="noti-button3"> Delete web service</button>
                <button className="noti-button4"> Suspend web service</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
