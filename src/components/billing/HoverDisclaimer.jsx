import React from "react";


const DisclaimerHover = ({ title, message }) => {
  return (
    <div className="disclaimer-container">
      <div className="info-icon-wrapper">
        <span className="info-icon">i</span>
      </div>

      <div className="tooltip">
        <div className="tooltip-content">
          <span className="info-icon-large">i</span>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerHover;
