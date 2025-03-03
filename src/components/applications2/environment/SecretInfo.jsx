import React from "react";

const SecretInfo = ({ darkMode }) => {
  return (
    <div className={`main-content ${darkMode ? "dark" : "light"}`}>
      <div className="secret-info">
        <h3>Secret files</h3>
        <span>
          Set environment-specific config and screts (such as API keys), then
          read those values from your code.
        </span>
        <p>Learn More</p>

        <button className="add-button">+ Add secret file</button>
      </div>
    </div>
  );
};

export default SecretInfo;
