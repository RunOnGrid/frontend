import React, { forwardRef } from "react";
import AddComponent from "../AddComponent";

const AppComponentSelect = forwardRef(
  ({ onNext, darkMode, onSaveComponentData, price, setPrice }, ref) => {
    return (
      <div ref={ref} className="locationSelect">
        <div style={{ display: "flex" }}>
          <h3>4.</h3>
          <span>Component</span>
        </div>
        <AddComponent
          onSaveComponentData={onSaveComponentData}
          onNext={onNext}
          darkMode={darkMode}
          price={price}
          setPrice={setPrice}
        />
      </div>
    );
  }
);
AppComponentSelect.displayName = "AppComponentSelect";
export default AppComponentSelect;
