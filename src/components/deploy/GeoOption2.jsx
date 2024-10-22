import React, { useState, useEffect } from "react";

const GeoOption2 = ({ title, darkMode, onLocationsChange2 }) => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const locations = [
    { name: "North America", code: "NA" },
    { name: "South America", code: "SA" },
    { name: "Africa", code: "AF" },
    { name: "Europe", code: "EU" },
    { name: "Asia", code: "AS" },
    { name: "Oceania", code: "OC" },
    { name: "All", code: "ALL" },
  ];

  useEffect(() => {
    onLocationsChange2(selectedLocations.map((loc) => `a!c${loc.code}`));
  }, [selectedLocations]);

  const handleAddLocation = () => {
    if (
      currentLocation &&
      !selectedLocations.some((loc) => loc.code === currentLocation.code)
    ) {
      setSelectedLocations((prevLocations) => [
        ...prevLocations,
        currentLocation,
      ]);
      setCurrentLocation(null);
    }
  };

  const handleRemoveLocation = (location) => {
    setSelectedLocations((prevLocations) =>
      prevLocations.filter((loc) => loc.code !== location.code)
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
              currentLocation?.code === location.code ? "selected" : ""
            }`}
            onClick={() => setCurrentLocation(location)}
          >
            {location.name}
          </button>
        ))}
      </div>
      <button className="add-button" onClick={handleAddLocation}>
        + Add Forbidden
      </button>
    </div>
  );
};

export default GeoOption2;
