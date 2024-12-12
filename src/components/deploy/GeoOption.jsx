import React, { useState, useEffect } from "react";

const GeoOption = ({
  title,
  darkMode,
  onLocationsChange,
  disabled,
  disabledLocations,
  hasSpecialSelection,
}) => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentSelections, setCurrentSelections] = useState([]);

  const locations = [
    { name: "North America", code: "acNA" },
    { name: "South America", code: "acSA" },
    { name: "Africa", code: "acAF" },
    { name: "Europe", code: "acEU" },
    { name: "Asia", code: "acAS" },
    { name: "Oceania", code: "acOC" },
    { name: "All", code: "" },
  ];

  useEffect(() => {
    if (hasSpecialSelection) {
      setSelectedLocations([]);
      setCurrentSelections([]);
      onLocationsChange([]);
    }
  }, [hasSpecialSelection]);

  const handleToggleSelection = (location) => {
    setCurrentSelections((prev) => {
      if (location.code === "ac") {
        return prev.some((loc) => loc.code === "ac") ? [] : [location];
      }

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
      let newSelectedLocations;

      if (currentSelections.some((loc) => loc.code === "ac")) {
        newSelectedLocations = [
          currentSelections.find((loc) => loc.code === "ac"),
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
      onLocationsChange(newSelectedLocations.map((loc) => loc.code));
      setCurrentSelections([]);
    }
  };

  const handleRemoveLocation = (location) => {
    const newSelectedLocations = selectedLocations.filter(
      (loc) => loc.code !== location.code
    );
    setSelectedLocations(newSelectedLocations);
    onLocationsChange(newSelectedLocations.map((loc) => loc.code));
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
            (selectedLocations.some((loc) => loc.code === "ac") &&
              location.code !== "ac") ||
            (location.code !== "ac" &&
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

export default GeoOption;