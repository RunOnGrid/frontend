import React, { useState } from "react";

export default function PaymentHistory({ darkMode }) {
  const [filter, setFilter] = useState("all");

  return (
    <div className={`billing-card ${darkMode ? "dark" : "light"}`}>
      <div className="billing-subtitle">Payment history</div>
      <div className="billing-filter billing-gap-20 billing-mb-20">
        <span>FILTER</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="billing-form-control"
        >
          <option value="all">Show: all</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          className="billing-form-control"
        />
      </div>
      <table className="billing-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Status</th>
            <th>Recipient</th>
            <th>Date</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(4)].map((_, i) => (
            <tr key={i}>
              <td>$--</td>
              <td>
                <span
                  className={`billing-status-indicator ${
                    i % 2 === 0
                      ? "billing-status-pending"
                      : "billing-status-completed"
                  }`}
                ></span>
                {i % 2 === 0 ? "Pending" : "Completed"}
              </td>
              <td>Benjamin Aguirre</td>
              <td>May 10, 2024</td>
              <td>Visa ****1234</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
