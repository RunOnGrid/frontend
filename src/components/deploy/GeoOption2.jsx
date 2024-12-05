import React, { useState, useEffect } from "react";

const GeoOption2 = ({ title, darkMode, onLocationsChange2 }) => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentSelections, setCurrentSelections] = useState([]);

  const locations = [
    { name: "North America", code: "NA" },
    { name: "South America", code: "SA" },
    { name: "Africa", code: "AF" },
    { name: "Europe", code: "EU" },
    { name: "Asia", code: "AS" },
    { name: "Oceania", code: "OC" },
    { name: "None", code: "a!c" },
  ];

  useEffect(() => {
    onLocationsChange2(selectedLocations.map((loc) => `a!c${loc.code}`));
  }, [selectedLocations]);

  const handleToggleSelection = (location) => {
    setCurrentSelections((prev) => {
      // Si se selecciona "a!c"
      if (location.code === "a!c") {
        // Si "a!c" ya estaba seleccionado, lo quitamos
        if (prev.some((loc) => loc.code === "a!c")) {
          return [];
        }
        // Si "a!c" no estaba seleccionado, solo seleccionamos "a!c"
        return [location];
      }

      // Si se selecciona cualquier otra ubicación
      const withoutAll = prev.filter((loc) => loc.code !== "a!c");

      if (prev.some((loc) => loc.code === location.code)) {
        return withoutAll.filter((loc) => loc.code !== location.code);
      } else {
        return [...withoutAll, location];
      }
    });
  };

  const handleAddLocations = () => {
    if (currentSelections.length > 0) {
      // Si estamos agregando "a!c"
      if (currentSelections.some((loc) => loc.code === "a!c")) {
        setSelectedLocations([
          currentSelections.find((loc) => loc.code === "a!c"),
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
              selectedLocations.some((loc) => loc.code === "a!c") &&
              location.code !== "a!c"
                ? "disabled"
                : ""
            }`}
            onClick={() => handleToggleSelection(location)}
            disabled={
              selectedLocations.some((loc) => loc.code === "a!c") &&
              location.code !== "a!c"
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
        + Add Forbidden
      </button>
    </div>
  );
};

export default GeoOption2;

const locations = [
  { name: "North America", code: "NA" },
  { name: "South America", code: "SA" },
  { name: "Africa", code: "AF" },
  { name: "Europe", code: "EU" },
  { name: "Asia", code: "AS" },
  { name: "Oceania", code: "OC" },
  { name: "All", code: "ALL" },
];