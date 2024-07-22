import React, { useState } from "react";
import AppsTableRow from "./AppsTableRow";
import Link from "next/link";

const AppsTable = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRecents, setShowRecents] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleRecents = () => {
    setShowRecents(!showRecents);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
      <div className="filters-container">
        <button className="filter-button" onClick={toggleRecents}>
          Recents
        </button>
        {showRecents && (
          <div className="dropdown">
            <p>Sort by:</p>
            <ul>
              <li>Recents</li>
              <li>Name</li>
              <li>Date created</li>
              <li>Status</li>
              <li>Type</li>
            </ul>
          </div>
        )}
        <button className="filter-button" onClick={toggleFilters}>
          Filters
        </button>
        {showFilters && (
          <div className="dropdown2">
            <p>Status</p>
            <ul>
              <li>
                {" "}
                <div className="circle3"></div>ACTIVE
              </li>
              <li>
                {" "}
                <div className="circle4"></div>INACTIVE
              </li>
              <li>
                {" "}
                <div className="circle5"></div>RENEW
              </li>
            </ul>
            <p>Type</p>
            <ul>
              <li>Web service</li>
            </ul>
          </div>
        )}
      </div>
      <div className="table-container">
        <div className="table-header">
          <div>Name</div>
          <div>Type</div>
          <div>Status</div>
          <div>Team</div>
          <div>Creation date</div>
          <div>Renewal date</div>
          <div>Instance type</div>
        </div>
        <Link href="/profile/project/activity">
          <AppsTableRow
            name="Application name"
            type="Application"
            status="ACTIVE"
            team="+1"
            creationDate="12/03/2025"
            renewalDate="12/03/2025"
            instanceType="STANDARD"
            mode={darkMode}
          />
        </Link>
        <AppsTableRow
          name="Application name"
          type="Application"
          status="ACTIVE"
          team="+1"
          creationDate="12/03/2025"
          renewalDate="12/03/2025"
          instanceType="STANDARD"
          mode={darkMode}
        />
        <AppsTableRow
          name="Application name"
          type="Application"
          status="ACTIVE"
          team="+1"
          creationDate="12/03/2025"
          renewalDate="12/03/2025"
          instanceType="STANDARD"
          mode={darkMode}
        />
        <AppsTableRow
          name="Application name"
          type="Application"
          status="ACTIVE"
          team="+1"
          creationDate="12/03/2025"
          renewalDate="12/03/2025"
          instanceType="STANDARD"
          mode={darkMode}
        />
      </div>
    </div>
  );
};

export default AppsTable;
