import React from "react";
import { DataComponent } from "../deployBoxes/DataComponent";

const SummaryAkash = ({
  service = "Web",
  mode,
  cpu,
  ram,
  hdd,
  name,
  setSummary,
  setAgree,
  price,
  setActiveStep,
  summaryStep,
}) => {
  const handleReturn = () => {
    setSummary(false);
    setAgree(false);
    setActiveStep(summaryStep);
  };
  return (
    <div className={`summary-container ${mode ? "dark" : "light"}`}>
      <h2>Summary</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      {/* <p>
        <strong>Period:</strong> {period}
      </p> */}
      <p>
        <strong>Service:</strong> {service}
      </p>

      <strong>Resources:</strong>
      <ul>
        <li>CPU: {cpu} Units</li>
        <li>Memory: {ram} </li>
        <li>Ephemeral Storage: {hdd} </li>
      </ul>
      <strong>Price: USD ${price.toFixed(2)}</strong>

      <button onClick={() => handleReturn()} className="add-button4">
        {" "}
        Return
      </button>
    </div>
  );
};

export default SummaryAkash;
