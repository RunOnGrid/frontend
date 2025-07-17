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

const GeoOption2 = ({
  title,
  darkMode,
  onLocationsChange2,
  disabled,
  disabledLocations, // These are now base codes (e.g., ["NA", "EU"])
  value, // This is the array of full codes (e.g., ["a!cNA", "a!cAS"])
}) => {
  const [selectedLocations, setSelectedLocations] = useState(value);
  const [currentSelections, setCurrentSelections] = useState([]);

  const locations = [
    { name: "North America", code: "a!cNA" }, // Updated codes for GeoOption2
    { name: "South America", code: "a!cSA" },
    { name: "Africa", code: "a!cAF" },
    { name: "Europe", code: "a!cEU" },
    { name: "Asia", code: "a!cAS" },
    { name: "Oceania", code: "a!cOC" },

  ];

  useEffect(() => {
    if (JSON.stringify(selectedLocations) !== JSON.stringify(value)) {
      setSelectedLocations(value);
      setCurrentSelections([]);
    }
  }, [value, selectedLocations]);

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
      let newSelectedCodes;

      if (currentSelections.some((loc) => loc.code === "a!c")) {
        newSelectedCodes = ["a!c"];
      } else {
        const currentSelectionCodes = currentSelections.map((loc) => loc.code);
        newSelectedCodes = [
          ...selectedLocations.filter(code => code !== "a!c"),
          ...currentSelectionCodes.filter(
            (code) => !selectedLocations.includes(code)
          ),
        ];
      }

      onLocationsChange2(newSelectedCodes); // Sends original codes back
      setCurrentSelections([]);
    }
  };

  const handleRemoveLocation = (codeToRemove) => {
    const newSelectedCodes = selectedLocations.filter(
      (code) => code !== codeToRemove
    );
    onLocationsChange2(newSelectedCodes); // Sends original codes back
  };

  return (
    <div className={`geo-option ${darkMode ? "dark" : "light"}`}>
      <h2>{title}</h2>
      <div className="selected-locations">
        {selectedLocations.map((code, index) => {
          const location = locations.find((loc) => loc.code === code);
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
            (location.code !== "a!c" &&
              disabledLocations.includes(currentButtonBaseCode)) ||
            (currentSelections.some((loc) => loc.code === "a!c") &&
              location.code !== "a!c") ||
            (selectedLocations.includes("a!c") && location.code !== "a!c") ||
            (location.code !== "a!c" && alreadyAdded);

          return (
            <button
              key={index}
              className={`geo-buttonF ${isSelectedInCurrent ? "selected" : ""}`}
              onClick={() => handleToggleSelection(location)}
              disabled={isLocationDisabled}
            >
              {location.name}
            </button>
          );
        })}
      </div>
      <button
        className="add-buttonF"
        onClick={handleAddLocations}
        disabled={disabled || currentSelections.length === 0}
      >
        + Add
      </button>
    </div>
  );
};

export default GeoOption2;