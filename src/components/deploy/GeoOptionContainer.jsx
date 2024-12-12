import React from "react";
import GeoOption from "./GeoOption";
import GeoOption2 from "./GeoOption2";

const GeoOptionContainer = ({
  allowedLocations,
  setAllowedLocations,
  forbiddenLocations,
  setForbiddenLocations,
  darkMode,
}) => {
  const handleAllowedChange = (newLocations) => {
    setAllowedLocations(newLocations);
    if (newLocations.some((loc) => loc === "ac")) {
      setForbiddenLocations([]);
    }
  };

  const handleForbiddenChange = (newLocations) => {
    setForbiddenLocations(newLocations);
    if (newLocations.some((loc) => loc === "a!c")) {
      setAllowedLocations([]); // Deshabilitar Allowed
    }
  };

  const isAllowedDisabled = forbiddenLocations.some((loc) => loc === "a!c");
  const isForbiddenDisabled = allowedLocations.some((loc) => loc === "ac");

  const allowedSet = new Set(allowedLocations);
  const forbiddenSet = new Set(forbiddenLocations);

  return (
    <>
      <GeoOption
        title="ALLOWED GEOLOCATIONS"
        darkMode={darkMode}
        onLocationsChange={handleAllowedChange}
        disabled={isAllowedDisabled}
        disabledLocations={Array.from(forbiddenSet)}
      />
      <GeoOption2
        title="FORBIDDEN GEOLOCATIONS"
        darkMode={darkMode}
        onLocationsChange2={handleForbiddenChange}
        disabled={isForbiddenDisabled}
        disabledLocations={Array.from(allowedSet)}
      />
    </>
  );
};

export default GeoOptionContainer;
