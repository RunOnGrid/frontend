import React, { useState, useEffect } from "react";

// Helper function to extract the base geographic code
const getBaseCode = (fullCode) => {
    if (fullCode === "ac" || fullCode === "a!c") {
        return fullCode;
    }
    if (fullCode.startsWith("ac")) {
        return fullCode.substring(2);
    }
    if (fullCode.startsWith("a!c")) {
        return fullCode.substring(3);
    }
    return fullCode;
};

const GeoOption = ({
  title,
  darkMode,
  onLocationsChange,
  disabled,
  disabledLocations, // These are now base codes (e.g., ["NA", "EU"])
  value, // This is the array of full codes (e.g., ["acNA", "acAS"])
}) => {
  const [selectedLocations, setSelectedLocations] = useState(value);
  const [currentSelections, setCurrentSelections] = useState([]);

  const locations = [
    { name: "North America", code: "acNA" },
    { name: "South America", code: "acSA" },
    { name: "Africa", code: "acAF" },
    { name: "Europe", code: "acEU" },
    { name: "Asia", code: "acAS" },
    { name: "Oceania", code: "acOC" },
  
  ];

  useEffect(() => {
    if (JSON.stringify(selectedLocations) !== JSON.stringify(value)) {
      setSelectedLocations(value);
      setCurrentSelections([]);
    }
  }, [value, selectedLocations]);

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
      let newSelectedCodes;

      if (currentSelections.some((loc) => loc.code === "ac")) {
        newSelectedCodes = ["ac"];
      } else {
        const currentSelectionCodes = currentSelections.map((loc) => loc.code);
        newSelectedCodes = [
          ...selectedLocations.filter(code => code !== "ac"),
          ...currentSelectionCodes.filter(
            (code) => !selectedLocations.includes(code)
          ),
        ];
      }

      onLocationsChange(newSelectedCodes); // Sends original codes back
      setCurrentSelections([]);
    }
  };

  const handleRemoveLocation = (codeToRemove) => {
    const newSelectedCodes = selectedLocations.filter(
      (code) => code !== codeToRemove
    );
    onLocationsChange(newSelectedCodes); // Sends original codes back
  };

  return (
    <div className={`geo-option ${darkMode ? "dark" : "light"}`}>
      <h2>{title}</h2>
      <div className="selected-locations">
        {selectedLocations.map((code, index) => {
          const location = locations.find(loc => loc.code === code);
          return location ? (
            <div
              key={index}
              className="location selected"
              onClick={() => handleRemoveLocation(location.code)}
            >
              {location.name}
            </div>
          ) : null;
        })}
      </div>
      <div className="geo-locations">
        {locations.map((location, index) => {
          const isSelectedInCurrent = currentSelections.some(
            (loc) => loc.code === location.code
          );
          const alreadyAdded = selectedLocations.includes(location.code);

          // Get the base code for comparison
          const currentButtonBaseCode = getBaseCode(location.code);

          const isLocationDisabled =
            disabled ||
            // Check if the base code of this button is in the disabledLocations (from the other component)
            (location.code !== "ac" && disabledLocations.includes(currentButtonBaseCode)) ||
            (currentSelections.some((loc) => loc.code === "ac") &&
              location.code !== "ac") ||
            (selectedLocations.includes("ac") &&
              location.code !== "ac") ||
            (location.code !== "ac" && alreadyAdded);

          return (
            <button
              key={index}
              className={`geo-button ${isSelectedInCurrent ? "selected" : ""}`}
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