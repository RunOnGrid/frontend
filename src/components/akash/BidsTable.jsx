import React, { useState } from "react";

function BidsTable({ data, cpu, ram, ramUnit, storage, storageUnit, dseq, setProviderOwner }) {
  // If no data is provided, default to an empty array to prevent errors
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const tableData = data || [];
  const handleProvider = (bid) => {
    setSelectedProviderId((prevId) =>
      prevId === bid.providerName ? null : bid.providerName
    );
    setProviderOwner((prevId) =>
      prevId === bid.providerOwner ? null : bid.providerOwner
    );
  };
  return (
    <div className="app-container">
      <div className="header-bar">
        <div className="header-item">
          {" "}
          <p> DSEQ </p> {dseq}
        </div>
        <div className="header-item">{cpu} CPU</div>
        <div className="header-item">
          <p>Memory</p> {ram} {ramUnit}
        </div>
        <div className="header-item">
          <p>Ephemeral Storage</p> {storage} {storageUnit}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Price</th>
              <th>Region</th>
              <th>Uptime (7d)</th>
              <th>Provider</th>
              <th>Audited</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                className={`${
                  selectedProviderId == row.providerName ? "selected" : ""
                }`}
                onClick={() => {
                  handleProvider(row);
                }}
                key={index}
              >
                <td>
                  <p>{row.pricePerBlock.toFixed(2)} / month </p>
                </td>

                <td>
                  {row.providerIpRegionCode},{row.providerIpCountryCode}
                </td>
                <td
                  className={
                    row.providerUptime7d < 0.7 ? "uptime-low" : "uptime-high"
                  }
                >
                  {(row.providerUptime7d * 100).toFixed(2)}%
                </td>
                <td className="uptime-high">{row.providerName}</td>
                <td>
                  {row.providerIsAudited ? (
                    <span className="check-icon">✓</span>
                  ) : (
                    "No"
                  )}
                </td>
                <td>
                  <input
                    type="radio"
                    name="select-row"
                    checked={selectedProviderId === row.providerName}
                    onChange={() => {}} // Añade un handler vacío o la misma lógica de handleProvider si prefieres que el click directo en el radio también funcione
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BidsTable;
