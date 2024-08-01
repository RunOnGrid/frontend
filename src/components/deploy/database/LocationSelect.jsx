import React from "react";

const LocationSelect = ({ darkMode, onClick, regions, selectedRegion }) => {
  return (
    <div className="locationSelect">
      <div style={{ display: "flex" }}>
        <h3>4.</h3>
        <span>Deployment location</span>
      </div>
      <div className={`region-container ${darkMode ? "dark" : "light"}`}>
        {regions.map((region) => (
          <button
            key={region}
            className={`region-button ${
              selectedRegion === region ? "active" : ""
            }`}
            onClick={() => onClick(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationSelect;
