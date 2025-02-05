import React, { useState, useEffect } from "react";

const GeoOption2 = ({
  title,
  darkMode,
  onLocationsChange2,
  disabled,
  disabledLocations,
  hasSpecialSelection,
}) => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentSelections, setCurrentSelections] = useState([]);

  const locations = [
    { name: "North America", code: "a!cNA" },
    { name: "South America", code: "a!cSA" },
    { name: "Africa", code: "a!cAF" },
    { name: "Europe", code: "a!cEU" },
    { name: "Asia", code: "a!cAS" },
    { name: "Oceania", code: "a!cOC" },
    { name: "None", code: "" },
  ];

  useEffect(() => {
    if (hasSpecialSelection) {
      setSelectedLocations([]);
      setCurrentSelections([]);
      onLocationsChange2([]);
    }
  }, [hasSpecialSelection]);

  const handleToggleSelection = (location) => {
    setCurrentSelections((prev) => {
      if (location.code === "a!c") {
        return prev.some((loc) => loc.code === "a!c") ? [] : [location];
      }

      const withoutNone = prev.filter((loc) => loc.code !== "a!c");
      if (prev.some((loc) => loc.code === location.code)) {
        return withoutNone.filter((loc) => loc.code !== location.code);
      } else {
        return [...withoutNone, location];
      }
    });
  };

  const handleAddLocations = () => {
    if (currentSelections.length > 0) {
      let newSelectedLocations;

      if (currentSelections.some((loc) => loc.code === "a!c")) {
        newSelectedLocations = [
          currentSelections.find((loc) => loc.code === "a!c"),
        ];
      } else {
        newSelectedLocations = [
          ...selectedLocations,
          ...currentSelections.filter(
            (loc) =>
              !selectedLocations.some((prevLoc) => prevLoc.code === loc.code)
          ),
        ];
      }

      setSelectedLocations(newSelectedLocations);
      onLocationsChange2(newSelectedLocations.map((loc) => loc.code));
      setCurrentSelections([]);
    }
  };

  const handleRemoveLocation = (location) => {
    const newSelectedLocations = selectedLocations.filter(
      (loc) => loc.code !== location.code
    );
    setSelectedLocations(newSelectedLocations);
    onLocationsChange2(newSelectedLocations.map((loc) => loc.code));
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
        {locations.map((location, index) => {
          const isLocationDisabled =
            disabled ||
            disabledLocations.includes(location.code) ||
            (selectedLocations.some((loc) => loc.code === "a!c") &&
              location.code !== "a!c") ||
            (location.code !== "a!c" &&
              selectedLocations.some((loc) => loc.code === location.code));

          return (
            <button
              key={index}
              className={`geo-button ${
                currentSelections.some((loc) => loc.code === location.code)
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleToggleSelection(location)}
              disabled={isLocationDisabled}
            >
              {location.name}
            </button>
          );
        })}
      </div>
      <button
        className="add-button"
        onClick={handleAddLocations}
        disabled={disabled || currentSelections.length === 0}
      >
        + Add
      </button>
    </div>
  );
};

export default GeoOption2;