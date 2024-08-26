import React, { forwardRef } from "react";
import GeoOption from "../GeoOption";
import Botonera2 from "@/commons/Botonera2";

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
          <GeoOption
            title="FORBIDDEN"
            subtitle="Add forbidden geolocations"
            darkMode={darkMode}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h4> DURATION: 2 WEEKS </h4>
          <div className="ranges3">
            <input type="range" name="range1" min="100" max="1000" step="50" />
          </div>
          <Botonera2 titulo="STATIC IP" />
          <Botonera2 titulo="ENTERPRISE APPLICATION" />
          <button onClick={onNext} className="add-button">
            {" "}
            Done
          </button>
        </div>
      </div>
    </div>
  );
});

export default AppGeoSelect;
