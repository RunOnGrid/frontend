import React, { useState, useEffect } from "react";

const GeoOption = ({ title, darkMode, onLocationsChange }) => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentSelections, setCurrentSelections] = useState([]);

  const locations = [
    { name: "North America", code: "NA" },
    { name: "South America", code: "SA" },
    { name: "Africa", code: "AF" },
    { name: "Europe", code: "EU" },
    { name: "Asia", code: "AS" },
    { name: "Oceania", code: "OC" },
    { name: "All", code: "ac" },
  ];

  useEffect(() => {
    onLocationsChange(selectedLocations.map((loc) => `ac${loc.code}`));
  }, [selectedLocations]);

  const handleToggleSelection = (location) => {
    setCurrentSelections((prev) => {
      // Si se selecciona "ac"
      if (location.code === "ac") {
        // Si "ac" ya estaba seleccionado, lo quitamos
        if (prev.some((loc) => loc.code === "ac")) {
          return [];
        }
        // Si "ac" no estaba seleccionado, solo seleccionamos "ac"
        return [location];
      }

      // Si se selecciona cualquier otra ubicación
      const withoutAll = prev.filter((loc) => loc.code !== "ac");

      if (prev.some((loc) => loc.code === location.code)) {
        return withoutAll.filter((loc) => loc.code !== location.code);
      } else {
        return [...withoutAll, location];
      }
    });
  };

  const handleAddLocations = () => {
    if (currentSelections.length > 0) {
      // Si estamos agregando "ac"
      if (currentSelections.some((loc) => loc.code === "ac")) {
        setSelectedLocations([
          currentSelections.find((loc) => loc.code === "ac"),
        ]);
      } else {
        // Si estamos agregando otras ubicaciones
        setSelectedLocations((prev) => {
          const newLocations = [...prev];
          currentSelections.forEach((location) => {
            if (!newLocations.some((loc) => loc.code === location.code)) {
              newLocations.push(location);
            }
          });
          return newLocations;
        });
      }
      setCurrentSelections([]);
    }
  };

  const handleRemoveLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.filter((loc) => loc.code !== location.code)
    );
  };

  return (
    <div className={`geo-option ${darkMode ? "dark" : "light"}`}>
      <h2>{title}</h2>
      <div className="selected-locations">
        {selectedLocations.map((location, index) => (
          <div
            key={index}
            className="location forbidden"
            onClick={() => handleRemoveLocation(location)}
          >
            {location.name}
          </div>
        ))}
      </div>
      <div className="geo-locations">
        {locations.map((location, index) => (
          <button
            key={index}
            className={`geo-button ${
              currentSelections.some((loc) => loc.code === location.code)
                ? "selected"
                : ""
            } ${
              selectedLocations.some((loc) => loc.code === "ac") &&
              location.code !== "ac"
                ? "disabled"
                : ""
            }`}
            onClick={() => handleToggleSelection(location)}
            disabled={
              selectedLocations.some((loc) => loc.code === "ac") &&
              location.code !== "ac"
            }
          >
            {location.name}
          </button>
        ))}
      </div>
      <button
        className="add-button"
        onClick={handleAddLocations}
        disabled={currentSelections.length === 0}
      >
        + Add Allowed
      </button>
    </div>
  );
};

export default GeoOption;
