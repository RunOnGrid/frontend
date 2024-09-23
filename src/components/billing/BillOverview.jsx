import React, { useState } from "react";

export default function SpendingOverview() {
  const [spendingView, setSpendingView] = useState("monthly");

  const spendingData = [
    { name: "Plan", amount: "$2514.40", percentage: 70 },
    { name: "Web service", amount: "$1796.00", percentage: 50 },
    { name: "Host", amount: "$1077.60", percentage: 30 },
    { name: "Monolith, INC", amount: "$718.40", percentage: 20 },
    { name: "Prestige Worldwide", amount: "$359.20", percentage: 10 },
  ];

  return (
    <div className="billing-card2">
      <div className="billing-subtitle">Spending overview</div>
      <div className="billing-flex billing-gap-20 billing-mb-20">
        <button
          className={`billing-btn billing-btn-outline ${
            spendingView === "monthly" ? "billing-btn-outline-active" : ""
          }`}
          onClick={() => setSpendingView("monthly")}
        >
          Monthly
        </button>
        <button
          className={`billing-btn billing-btn-outline ${
            spendingView === "yearly" ? "billing-btn-outline-active" : ""
          }`}
          onClick={() => setSpendingView("yearly")}
        >
          Yearly
        </button>
      </div>
      <div className="billing-flex billing-gap-20">
        <div className="billing-flex-3 billing-card3 ">
          <div className="billing-heading">Total Spending</div>
          <div className="billing-text-large">$3,592.0</div>
        </div>
        <div className="billing-flex-1 billing-card4">
          <div className="billing-heading">Spending Breakdown</div>
          {spendingData.map((item, index) => (
            <div key={index} className="billing-spending-item">
              <div className="billing-spending-item-header">
                <span>{item.name}</span>
                <span>{item.amount}</span>
              </div>
              <div className="billing-spending-bar">
                <div
                  className="billing-spending-bar-fill"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
