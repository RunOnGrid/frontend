import React, { useState } from "react";

const GeoOption = ({ title, darkMode }) => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");

  const locations = [
    "North America",
    "South America",
    "Africa",
    "Europe",
    "Asia",
    "Oceania",
  ];

  const handleAddLocation = () => {
    if (currentLocation && !selectedLocations.includes(currentLocation)) {
      setSelectedLocations([...selectedLocations, currentLocation]);
      setCurrentLocation(""); // Reset current location after adding
    }
  };

  return (
    <div className={`geo-option ${darkMode ? "dark" : "light"}`}>
      <h2>{title}</h2>
      <div className="selected-locations">
        {selectedLocations.map((location, index) => (
          <div key={index} className="location">
            -{location}
          </div>
        ))}
      </div>
      <div className="geo-locations">
        {locations.map((location, index) => (
          <button
            key={index}
            className={`geo-button ${
              currentLocation === location ? "selected" : ""
            }`}
            onClick={() => setCurrentLocation(location)}
          >
            {location}
          </button>
        ))}
      </div>
      <button className="add-button" onClick={handleAddLocation}>
        + Add
      </button>
    </div>
  );
};

export default GeoOption;
