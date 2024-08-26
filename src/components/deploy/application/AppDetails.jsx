import React, { forwardRef } from "react";

const AppDetails = forwardRef(({ onNext, darkMode }, ref) => {
  return (
    <div ref={ref} className="locationSelect">
      <div style={{ display: "flex" }}>
        <h3>5.</h3>
        <span>Instance type</span>
      </div>
      <div className="instance-details">
        <div className="details">
          <h2>Instance details</h2>
          <div className={`value-box ${darkMode ? "dark" : "light"}`}>
            <div>
              <span>Value:</span>
              <span>$7 / month</span>
            </div>
            <div>
              <p>256 MB (RAM)</p>
              <p>0.1 CPU</p>
            </div>
          </div>
          <button onClick={onNext} className="accept-button">
            Accept and continue
          </button>
        </div>
        <div className="customized-includes">
          <h3>Your customized instance includes:</h3>
          <ul>
            <li>Zero Downtime</li>
            <li>SSH Access</li>
            <li>Scaling</li>
            <li>One-off jobs</li>
            <li>Support for persistent disks</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default AppDetails;
