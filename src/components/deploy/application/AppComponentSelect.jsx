import React, { forwardRef } from "react";
import AddComponent from "../AddComponent";

const AppComponentSelect = forwardRef(({ onNext, darkMode }, ref) => {
  return (
    <div ref={ref} className="locationSelect">
      <div style={{ display: "flex" }}>
        <h3>4.</h3>
        <span>Component</span>
      </div>
      <AddComponent onNext={onNext} darkMode={darkMode} />
    </div>
  );
});

export default AppComponentSelect;
