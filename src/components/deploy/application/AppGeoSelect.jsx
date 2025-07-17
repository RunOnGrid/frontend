import React, { useState } from "react";
import GeoOptionContainer from "../GeoOptionContainer";
import Botonera3 from "@/commons/Botonera3";

const AppGeoSelect = ({
  allowedLocations,
  setAllowedLocations,
  forbiddenLocations,
  setForbiddenLocations,
  allSelectedLocations,
  setAllSelectedLocations,
  onNext,
}) => {
  return (
    <div className="databaseSelect">
      <GeoOptionContainer
        allowedLocations={allowedLocations}
        setAllowedLocations={setAllowedLocations}
        forbiddenLocations={forbiddenLocations}
        setForbiddenLocations={setForbiddenLocations}
        allSelectedLocations={allSelectedLocations}
        setAllSelectedLocations={setAllSelectedLocations}
      />
    </div>
  );
};

export default AppGeoSelect;

{
  /* <div className="geo-options">
  <Botonera3 titulo="STATIC IP" />
  <button onClick={onNext} className="add-button4">
    {" "}
    Continue
  </button>
</div> */
}
{
  /* <div style={{ display: "flex" }}>
  <span onClick={onNext}>Geolocations</span>
</div> */
}
