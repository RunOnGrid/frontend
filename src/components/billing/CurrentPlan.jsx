import React from "react";

const CurrentPlan = ({ darkMode }) => {
  return (
    <div className={`billing-section ${darkMode ? "dark" : "light"}`}>
      <div className="section-header">
        <h4>Current subscription plan</h4>
      </div>
      <div className="billing-info">
        <div>
          <h1>DEV</h1>
          <div style={{ display: "flex" }}>
            <h3>$ 000 </h3>
            <span> / month</span>
          </div>
          <p>NEXT PAYMENT: 6/14/2024</p>
        </div>
      </div>
      <button className="billing3">Manage my plan</button>
    </div>
  );
};

export default CurrentPlan;
