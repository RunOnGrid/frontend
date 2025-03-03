import React from "react";

const LinkedInfo = ({ darkMode }) => {
  return (
    <div className={`main-content ${darkMode ? "dark" : "light"}`}>
      <div className="secret-info">
        <h3>Linked environment group</h3>
        <span>
          Set environment-specific config and screts (such as API keys), then
          read those values from your code
        </span>
        <p>No environment groups available to link</p>

        <button className="add-button">+ New environment group</button>
      </div>
    </div>
  );
};

export default LinkedInfo;
