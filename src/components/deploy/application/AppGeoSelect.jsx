import React, { forwardRef } from "react";
import GeoOption from "../GeoOption";

import Botonera3 from "@/commons/Botonera3";
import GeoOption2 from "../GeoOption2";

const AppGeoSelect = forwardRef(
  (
    { onNext, darkMode, onLocationsChange, onLocationsChange2, onStaticIp },
    ref
  ) => {
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
              onLocationsChange={onLocationsChange}
            />
            <GeoOption2
              title="FORBIDDEN"
              subtitle="Add forbidden geolocations"
              darkMode={darkMode}
              onLocationsChange2={onLocationsChange2}
            />
          </div>
          <div className="geo-options">
            <Botonera3 titulo="STATIC IP" onClick={onStaticIp} />
            <button onClick={onNext} className="add-button2">
              {" "}
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
);
AppGeoSelect.displayName = "AppGeoSelect";
export default AppGeoSelect;
