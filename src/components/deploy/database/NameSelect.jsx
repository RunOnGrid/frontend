import React from "react";

const NameSelect = ({ darkMode, onClick, data }) => {
  return (
    <div className="databaseSelect">
      <div style={{ display: "flex" }}>
        <h3>3.</h3>
        <span>Database name</span>
      </div>
      <div>
        <div className={`input-container2 ${darkMode ? "dark" : "light"}`}>
          <input
            type="text"
            className={`custom-input ${darkMode ? "dark" : "light"}`}
            value={data}
            onChange={(e) => onClick(e.target.value)}
          />
          <button className={`custom-button ${darkMode ? "dark" : "light"}`}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameSelect;
