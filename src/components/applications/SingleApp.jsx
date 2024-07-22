import React, { useState } from "react";
import General from "./General";
import Domains from "./Domains";
import Notifications from "./Notifications";

const SingleApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        <h2>My applications</h2>
        <div className="toggle-mode">
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div
          className={`notification-icon ${darkMode ? "dark" : "light"}`}
          onClick={toggleNotifications}
        >
          <img
            src={`${darkMode ? "/notification2.png" : "/notification.png"}`}
            alt="Notifications"
          />
        </div>
        {showNotifications && (
          <div className={`notifications-popup ${darkMode ? "dark" : "light"}`}>
            <h2>Notifications</h2>
            <div className={`notification-item ${darkMode ? "dark" : "light"}`}>
              <span className="dot green"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className={`notification-item ${darkMode ? "dark" : "light"}`}>
              <span className="dot orange"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className={`notification-item ${darkMode ? "dark" : "light"}`}>
              <span className="dot green"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className={`notification-item ${darkMode ? "dark" : "light"}`}>
              <span className="dot red"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
        )}
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
          <div className={`sidebar ${darkMode ? "dark" : "light"}`}>
            <ul>
              <li>Information</li>
              <li>Events</li>
              <li>Logs</li>
              <li>Team</li>
              <li>Environment</li>
              <li>Metrics</li>
              <li>Update/Renew</li>
            </ul>
          </div>
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

export default SingleApp;
