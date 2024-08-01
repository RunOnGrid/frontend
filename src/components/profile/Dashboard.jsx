import React, { useState } from 'react';
import Notis from "../applications2/Notis";

const Dashboard = () => {
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
        <h2>Dashboard</h2>
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
            src={`${darkMode ? "notification2.png" : "notification.png"}`}
            alt="Notifications"
          />
        </div>
        {showNotifications && <Notis darkMode={darkMode} />}
      </div>
      <div className={`applications-section ${darkMode ? "dark" : "light"}`}>
        <div className="section-header">
          <h3>Applications</h3>
          <button>View all</button>
        </div>
        <p>It looks like you don't have any applications running yet</p>
        <button className="section-button">Deploy</button>
      </div>
      <div className="middle-section">
        <div className="billing-section">
          <div className="section-header">
            <h3>Billing overview / Plan</h3>
            <button>More info</button>
          </div>
          <p>
            Current plan:<span>Free </span>
          </p>
        </div>
        <div className={`teams-section ${darkMode ? "dark" : "light"}`}>
          <h3>Teams</h3>
          <p>You don't have any teams yet</p>
          <button>Manage</button>
        </div>
      </div>
      <div className={`events-section ${darkMode ? "dark" : "light"}`}>
        <div className="section-header">
          <h3>Events</h3>
          <button>View all</button>
        </div>
        <table className={`events-table ${darkMode ? "dark" : "light"}`}>
          <thead>
            <tr>
              <th>Integration</th>
              <th>Action</th>
              <th>Date/Time</th>
              <th>By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  src="github-logo.png"
                  alt=""
                  className="integration-logo"
                />{" "}
                GITHUB
              </td>
              <td>Commit - Main Branch</td>
              <td>12/03/2025 17:30</td>
              <td>Benjamin Aguirre (Admin)</td>
            </tr>
            <tr>
              <td>
                <img src="flux-logo.png" alt="" className="integration-logo" />{" "}
                FLUX
              </td>
              <td>Commit - Main Branch</td>
              <td>12/03/2025 17:30</td>
              <td>Infrastructure</td>
            </tr>
            <tr>
              <td>
                <img src="akash-logo.png" alt="" className="integration-logo" />{" "}
                AKASH
              </td>
              <td>Commit - Main Branch</td>
              <td>12/03/2025 17:30</td>
              <td>Infrastructure</td>
            </tr>
            <tr>
              <td>
                <img
                  src="github-logo.png"
                  alt=""
                  className="integration-logo"
                />{" "}
                GITHUB
              </td>
              <td>Commit - Main Branch</td>
              <td>12/03/2025 17:30</td>
              <td>Benjamin Aguirre (Admin)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
