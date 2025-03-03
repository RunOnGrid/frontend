import React from "react";

const KeyInfo = ({ darkMode }) => {
  return (
    <div className={`main-content ${darkMode ? "dark" : "light"}`}>
      <div className="environment-info">
        <div className="env-input-container">
          <div className="env-input">
            <label> Key</label>
            <div className={`input-container3 ${darkMode ? "dark" : "light"}`}>
              <input
                type="text"
                placeholder="NAME_OF_VARIABLE"
                className={`custom-input ${darkMode ? "dark" : "light"}`}
              />
            </div>
          </div>
          <div className="env-input">
            <label> Value</label>
            <div className={`input-container3 ${darkMode ? "dark" : "light"}`}>
              <input
                type="text"
                placeholder="VALUE"
                className={`custom-input ${darkMode ? "dark" : "light"}`}
              />
            </div>
          </div>
        </div>
        <div className="buttons-environment">
          <div>
            <button className="add-button">Create environment group</button>
            <button className="add-button">Add from .env</button>
          </div>
          <button className="add-button">+ Add environment variable</button>
        </div>
      </div>
      <div className="noti-buttons">
        <button className={`noti-button1 ${darkMode ? "dark" : "light"}`}>
          Cancel
        </button>
        <button className={`noti-button2 ${darkMode ? "dark" : "light"}`}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default KeyInfo;
