import React from "react";

const BillingSection = ({ darkMode }) => {
  return (
    <div className={`billing-section ${darkMode ? "dark" : "light"}`}>
      <div className="section-header">
        <h4>Billing overview / Plan</h4>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            marginRight: "0px",
          }}
        >
          <button className="billing1">My plan</button>
          <button className={`billing2 ${darkMode ? "dark" : "light"}`}>
            {" "}
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingSection;
