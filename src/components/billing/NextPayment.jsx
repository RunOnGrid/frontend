import React from "react";

const NextPayment = ({ darkMode }) => {
  return (
    <div className={`payment-section ${darkMode ? "dark" : "light"}`}>
      <div className="section-header">
        <h4>Next Payment</h4>
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
      <button className="billing3">Manage payment</button>
    </div>
  );
};

export default NextPayment;
