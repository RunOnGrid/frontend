import React from "react";
import GeoOption from "../GeoOption";
import Botonera2 from "@/commons/Botonera2";

const AppGeoSelect = ({ darkMode }) => {
  return (
    <div className="databaseSelect">
      <div style={{ display: "flex" }}>
        <h3>3.</h3>
        <span>Geolocations</span>
      </div>
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Botonera2 titulo="Static IP" />
          <Botonera2 titulo="Enterprise Application" />
        </div>
      </div>
    </div>
  );
};

export default AppGeoSelect;
