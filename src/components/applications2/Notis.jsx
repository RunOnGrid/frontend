import React from "react";

const Notis = ({ darkMode }) => {
  return (
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
  );
};

export default Notis;
