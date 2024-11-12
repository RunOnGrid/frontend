import React from "react";
import { DataComponent } from "../deployBoxes/DataComponent";

const SummaryAkash = ({ service = "Web", mode, cpu, ram, hdd, name }) => {
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
      <p>
        <strong>Resources:</strong>
        <ul>
          <li>CPU: {cpu} Units</li>
          <li>Memory: {ram} Mi</li>
          <li>Ephemeral Storage: {hdd} Mi</li>
        </ul>
      </p>
    </div>
  );
};

export default SummaryAkash;
