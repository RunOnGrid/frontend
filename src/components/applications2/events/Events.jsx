import React, { useState } from "react";
import { useTheme } from "@/ThemeContext";
import Notis from "../Notis";
import ThemeToggle from "@/components/ThemeToggle";
import InfoSideBar from "../InfoSideBar";
import EventInfo from "./EventInfo";

const EventScreen = () => {
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
            className={`main-content ${darkMode ? "dark" : "light"}`}
            style={{ display: "flex", flexDirection: "column", width: "80%" }}
          >
            <EventInfo
              darkMode={darkMode}
              icon="/verify.png"
              title="Deploy succeed for d5a4193: actualization"
              info="Exited with status 1 while running your code. Check your deploy logs for more information"
              date="June 27, 2024 at 3:43 PM"
            />
            <EventInfo
              darkMode={darkMode}
              icon="/calendar.png"
              title="First deploy started for d5a4193: actualization"
              date="June 27, 2024 at 3:43 PM"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventScreen;
