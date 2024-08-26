import React, { useState } from "react";
import { useTheme } from "@/ThemeContext";
import Notis from "../Notis";
import ThemeToggle from "@/components/ThemeToggle";
import InfoSideBar from "../InfoSideBar";
import TeamInfo from "./TeamInfo";
import TeamInfoHeader from "./TeamInfoHeader";

const TeamScreen = () => {
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

        <div className="content2">
          <InfoSideBar darkMode={darkMode} />
          <div
            className={`main-content ${darkMode ? "dark" : "light"}`}
            style={{ display: "flex", flexDirection: "column", width: "80%" }}
          >
            <TeamInfoHeader />
            <TeamInfo
              darkMode={darkMode}
              icon="/memberDark.svg"
              name="Benjamin Aguirre"
              user="@user1999"
              role="Admin"
              status="ACTIVE"
              email="prueba@gmail.com"
              team="Grid 1"
              number={3}
            />
            <TeamInfo
              darkMode={darkMode}
              icon="/memberDark.svg"
              name="Benjamin Aguirre"
              user="@user1999"
              role="Admin"
              status="INACTIVE"
              email="prueba@gmail.com"
              team="Grid 1"
              number={4}
            />
            <button className="add-button2">+ Add team member</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamScreen;
