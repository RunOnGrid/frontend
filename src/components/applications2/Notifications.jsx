import React from "react";

const Notifications = ({ darkMode }) => {
  return (
    <div className={`main-content ${darkMode ? "dark" : "light"}`}>
      <div className="notification">
        <h3>Notifications</h3>
        <div className="general-item2">
          <div>
            <label>Service notifications</label>
            <span style={{ fontSize: "0.8rem" }}>
              A unique name for your application
            </span>
          </div>
          <select>
            <option value="yes">
              Use account default (Only failure notifications)
            </option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="noti-buttons">
          <button className={`noti-button1 ${darkMode ? "dark" : "light"}`}>
            {" "}
            Cancel
          </button>
          <button className={`noti-button2 ${darkMode ? "dark" : "light"}`}>
            {" "}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
