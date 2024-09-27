import React, { forwardRef } from "react";
import GeoOption from "../GeoOption";

import Botonera3 from "@/commons/Botonera3";
import GeoOption2 from "../GeoOption2";

const AppGeoSelect = forwardRef(({ onNext, darkMode }, ref) => {
  return (
    <div ref={ref} className="databaseSelect">
      <div style={{ display: "flex" }}>
        <h3>3.</h3>
        <span onClick={onNext}>Geolocations</span>
      </div>
      <div className="geoSelect-container">
        <div style={{ display: "flex" }}>
          <GeoOption
            title="ALLOWED"
            subtitle="Add allowed geolocations"
            darkMode={darkMode}
          />
          <GeoOption2
            title="FORBIDDEN"
            subtitle="Add forbidden geolocations"
            darkMode={darkMode}
          />
        </div>
        <div className="geo-options">
          {/* <h4> DURATION: 2 WEEKS </h4>
          <div className="ranges3">
            <input type="range" name="range1" min="100" max="1000" step="50" />
          </div>
          <Botonera3 titulo="STATIC IP" />
          <Botonera3 titulo="ENTERPRISE APPLICATION" /> */}
          <button onClick={onNext} className="add-button2">
            {" "}
            Continue
          </button>
        </div>
      </div>
    </div>
  );
});
AppGeoSelect.displayName = "AppGeoSelect";
export default AppGeoSelect;
