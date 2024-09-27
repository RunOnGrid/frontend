import React from 'react';
import { DataComponent } from "../deployBoxes/DataComponent";

const Summary = ({ service = "Web", mode, componentData }) => {
  return (
    <div className={`summary-container ${mode ? "dark" : "light"}`}>
      <h2>Summary</h2>
      <p>
        <strong>Name:</strong> {componentData.name}
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
          <li>CPU: {componentData.cpu} Units</li>
          <li>RAM: {componentData.ram} Mi</li>
          <li>HDD: {componentData.hdd} Mi</li>
        </ul>
      </p>

      {/* <ul className="specs-list">
        {specs.length > 0 ? (
          specs.map((spec, index) => <li key={index}>{spec}</li>)
        ) : (
          <li>No specs available</li>
        )}
      </ul> */}
    </div>
  );
};

export default Summary;
