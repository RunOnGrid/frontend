import React from "react";
import AddComponent from "../AddComponent";

const AppComponentSelect = ({ darkMode }) => {
  return (
    <div className="locationSelect">
      <div style={{ display: "flex" }}>
        <h3>4.</h3>
        <span>Deployment location</span>
      </div>
      <AddComponent darkMode={darkMode} />
    </div>
  );
};

export default AppComponentSelect;
