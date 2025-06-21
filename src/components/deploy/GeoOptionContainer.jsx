import React, { useState, useMemo } from "react"; // Import useMemo
import GeoOption from "./GeoOption";
import GeoOption2 from "./GeoOption2";

// Helper function to extract the base geographic code
const getBaseCode = (fullCode) => {
  if (fullCode === "ac" || fullCode === "a!c") {
    return fullCode; // Return 'ac' or 'a!c' as is for special handling
  }
  if (fullCode.startsWith("ac")) {
    return fullCode.substring(2); // e.g., "acNA" -> "NA"
  }
  if (fullCode.startsWith("a!c")) {
    return fullCode.substring(3); // e.g., "a!cNA" -> "NA"
  }
  return fullCode;
};

const GeoOptionContainer = ({
  darkMode,
  allSelectedLocations,
  setAllSelectedLocations,
}) => {
  // Single source of truth for all selected locations

  // Derive allowedLocations and forbiddenLocations from allSelectedLocations
  const allowedLocations = useMemo(
    () =>
      allSelectedLocations.filter(
        (code) => code.startsWith("ac") && code !== "ac"
      ),
    [allSelectedLocations]
  );

  const forbiddenLocations = useMemo(
    () =>
      allSelectedLocations.filter(
        (code) => code.startsWith("a!c") && code !== "a!c"
      ),
    [allSelectedLocations]
  );

  // Handle the special 'All' and 'None' states directly
  const isAllowedAllSelected = allSelectedLocations.includes("ac");
  const isForbiddenNoneSelected = allSelectedLocations.includes("a!c");

  // This function is called by GeoOption
  const handleAllowedChange = (newAllowedCodes) => {
    let updatedLocations = allSelectedLocations.filter(
      (code) => !code.startsWith("ac") // Remove all existing allowed codes (except 'ac' if it's there from before)
    );

    // If 'All' is selected in the new allowed codes
    if (newAllowedCodes.includes("ac")) {
      updatedLocations = ["ac"]; // Only 'ac' should be present
    } else {
      // Add new individual allowed codes
      updatedLocations = [...updatedLocations, ...newAllowedCodes];
    }

    // If 'ac' (All) is newly selected, clear forbidden locations
    if (newAllowedCodes.includes("ac")) {
      updatedLocations = ["ac"]; // Ensure only 'ac' is present
    }

    // If 'a!c' (None) was previously selected in forbidden, and individual allowed are selected, remove 'a!c'
    if (
      newAllowedCodes.length > 0 &&
      !newAllowedCodes.includes("ac") &&
      isForbiddenNoneSelected
    ) {
      updatedLocations = updatedLocations.filter((code) => code !== "a!c");
    }

    setAllSelectedLocations(updatedLocations);
  };

  // This function is called by GeoOption2
  const handleForbiddenChange = (newForbiddenCodes) => {
    let updatedLocations = allSelectedLocations.filter(
      (code) => !code.startsWith("a!c") // Remove all existing forbidden codes (except 'a!c' if it's there from before)
    );

    // If 'None' is selected in the new forbidden codes
    if (newForbiddenCodes.includes("a!c")) {
      updatedLocations = ["a!c"]; // Only 'a!c' should be present
    } else {
      // Add new individual forbidden codes
      updatedLocations = [...updatedLocations, ...newForbiddenCodes];
    }

    // If 'a!c' (None) is newly selected, clear allowed locations
    if (newForbiddenCodes.includes("a!c")) {
      updatedLocations = ["a!c"]; // Ensure only 'a!c' is present
    }

    // If 'ac' (All) was previously selected in allowed, and individual forbidden are selected, remove 'ac'
    if (
      newForbiddenCodes.length > 0 &&
      !newForbiddenCodes.includes("a!c") &&
      isAllowedAllSelected
    ) {
      updatedLocations = updatedLocations.filter((code) => code !== "ac");
    }

    setAllSelectedLocations(updatedLocations);
  };

  // Determine if GeoOption should be disabled (when 'a!c' is in forbiddenLocations)
  const isAllowedDisabled = isForbiddenNoneSelected;
  // Determine if GeoOption2 should be disabled (when 'ac' is in allowedLocations)
  const isForbiddenDisabled = isAllowedAllSelected;

  // Create sets of *base codes* from the current selections for comparison
  const allowedBaseCodes = useMemo(
    () => new Set(allowedLocations.map(getBaseCode)),
    [allowedLocations]
  );

  const forbiddenBaseCodes = useMemo(
    () => new Set(forbiddenLocations.map(getBaseCode)),
    [forbiddenLocations]
  );

  return (
    <>
      <GeoOption
        title="ALLOWED GEOLOCATIONS"
        darkMode={darkMode}
        onLocationsChange={handleAllowedChange}
        disabled={isAllowedDisabled}
        // Pass base codes of forbidden locations to disable
        disabledLocations={Array.from(forbiddenBaseCodes)}
        value={allowedLocations} // Pass derived allowed locations
      />
      <GeoOption2
        title="FORBIDDEN GEOLOCATIONS"
        darkMode={darkMode}
        onLocationsChange2={handleForbiddenChange}
        disabled={isForbiddenDisabled}
        // Pass base codes of allowed locations to disable
        disabledLocations={Array.from(allowedBaseCodes)}
        value={forbiddenLocations} // Pass derived forbidden locations
      />
    </>
  );
};

export default GeoOptionContainer;
