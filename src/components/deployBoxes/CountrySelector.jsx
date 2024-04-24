import React, { useState } from 'react';

const CountrySelector = () => {
  const continents = [
    { id: '1', name: 'ALL' },
    { id: '2', name: 'Africa' },
    { id: '3', name: 'North America' },
    { id: '4', name: 'South America' },
    { id: '5', name: 'Europe' },
    { id: '6', name: 'Oceania' },
    { id: '7', name: 'Asia' },
    // Add more continents as needed
  ];

  const countriesByContinent = {
    7: [
      'ALL',
      'Singapore',
      'Bahrain',
      'United Arab Emirates',
      'Hong Kong',
      'Taiwan',
      'Israel',
      'Japan',
      'India',
      'Thailand',
      'Malaysia',
      'Vietnam',
      'Indonesia',
      'South Korea',
      'Philippines',
      'Turkey',
      'China',
    ],
    2: ['ALL', 'South Africa'],
    3: ['ALL', 'United States', 'Canada', 'Mexico', 'Panama'],
    4: ['ALL', 'Brazil', 'Argentina', 'Chile', 'Paraguay'],
    5: [
      'ALL',
      'Finland',
      'Bulgaria',
      'Germany',
      'Poland',
      'France',
      'Portugal',
      'Spain',
      'Slovenia',
      'Sweden',
      'Moldova',
      'Netherlands',
      'Italy',
      'Lithuania',
      'Switzerland',
      'Romania',
      'Estonia',
      'United Kingdom',
      'Russia',
      'Denmark',
      'Hungary',
      'Greece',
      'Norway',
      'Czech Republic',
      'Latvia',
      'Belgium',
      'Serbia',
      'Slovakia',
      'Ireland',
      'Austria',
      'Croatia',
      'Ukraine',
      'Jersey',
      'Iceland',
      'Luxembourg',
      'Cyprus',
    ],
    6: ['ALL', 'Australia', 'New Zealand'],
    // Add more countries as needed
  };

  const [selections, setSelections] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleContinentChange = (event) => {
    const selectedContinentId = event.target.value;
    setSelectedContinent(selectedContinentId);

    setSelectedCountry(null);
  };

  const handleCountryChange = (event) => {
    const selectedCountryName = event.target.value;
    setSelectedCountry(selectedCountryName);
  };
  const handleAddSelection = () => {
    let newSelection;

    if (selectedContinent === '1') {
      // If both "ALL" options are selected, create a special selection
      newSelection = { continent: selectedContinent, country: selectedCountry };
    } else if (selectedContinent && selectedCountry) {
      // For other cases, add a regular selection
      newSelection = { continent: selectedContinent, country: selectedCountry };
    }

    if (newSelection) {
      setSelections([...selections, newSelection]);
      setSelectedContinent(null);
      setSelectedCountry(null);
    }
  };

  const [selections2, setSelections2] = useState([]);
  const [selectedContinent2, setSelectedContinent2] = useState(null);
  const [selectedCountry2, setSelectedCountry2] = useState(null);

  const handleContinentChange2 = (event) => {
    const selectedContinentId = event.target.value;
    setSelectedContinent2(selectedContinentId);

    setSelectedCountry2(null);
  };

  const handleCountryChange2 = (event) => {
    const selectedCountryName = event.target.value;
    setSelectedCountry2(selectedCountryName);
  };
  const handleAddSelection2 = () => {
    let newSelection;

    if (selectedContinent2 === '1') {
      // If both "ALL" options are selected, create a special selection
      newSelection = {
        continent: selectedContinent2,
        country: selectedCountry2,
      };
    } else if (selectedContinent2 && selectedCountry2) {
      // For other cases, add a regular selection
      newSelection = {
        continent: selectedContinent2,
        country: selectedCountry2,
      };
    }

    if (newSelection) {
      setSelections2([...selections2, newSelection]);
      setSelectedContinent2(null);
      setSelectedCountry2(null);
    }
  };

  const handleDelete = (indexToRemove) => {
    setSelections((prevSelections) => {
      const updatedSelections = [...prevSelections];
      updatedSelections.splice(indexToRemove, 1);
      return updatedSelections;
    });
  };

  const handleDelete2 = (indexToRemove) => {
    setSelections2((prevSelections) => {
      const updatedSelections = [...prevSelections];
      updatedSelections.splice(indexToRemove, 1);
      return updatedSelections;
    });
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className="geolocation">
          <h4>+ Add geolocation </h4>
          <div style={{ display: 'flex' }}>
            <div>
              <label>Continent:</label>

              <select
                onChange={handleContinentChange}
                value={selectedContinent || ''}>
                <option value="" disabled>
                  Select a continent
                </option>
                {continents.map((continent) => (
                  <option key={continent.id} value={continent.id}>
                    {continent.name}
                  </option>
                ))}
              </select>

              {selectedContinent && selectedContinent !== '1' && (
                <div>
                  <label> Country:</label>
                  <select
                    onChange={handleCountryChange}
                    value={selectedCountry || ''}>
                    <option value="" disabled>
                      Select a country
                    </option>
                    {countriesByContinent[selectedContinent].map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <button className="geo-button" onClick={handleAddSelection}>
              +
            </button>
          </div>
        </div>
        <div className="geolocation4">
          <h4>My allowed geolocations: </h4>

          {selections.map((selection, index) => (
            <div className="geolocation2" key={index}>
              <div>
                <div style={{ display: 'flex' }}>
                  <p>Continent: </p>
                  <span> {continents[selection.continent - 1].name} </span>
                </div>

                <div style={{ display: 'flex' }}>
                  <p>Country: </p>
                  <span> {selection.country} </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(index)}
                style={{ margin: 'auto 20px auto auto ' }}>
                -
              </button>
            </div>
          ))}
        </div>
      </div>

      <h3>Forbidden Geolocation </h3>

      <div style={{ display: 'flex' }}>
        <div className="geolocation">
          <h4>+ Add geolocation</h4>
          <div style={{ display: 'flex' }}>
            <div>
              <label>Continent:</label>
              <select
                onChange={handleContinentChange2}
                value={selectedContinent2 || ''}>
                <option value="" disabled>
                  Select a continent
                </option>
                {continents.map((continent) => (
                  <option key={continent.id} value={continent.id}>
                    {continent.name}
                  </option>
                ))}
              </select>

              {selectedContinent2 && selectedContinent2 !== '1' && (
                <div>
                  <label> Country:</label>
                  <select
                    onChange={handleCountryChange2}
                    value={selectedCountry2 || ''}>
                    <option value="" disabled>
                      Select a country
                    </option>
                    {countriesByContinent[selectedContinent2].map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <button className="geo-button" onClick={handleAddSelection2}>
              +
            </button>
          </div>
        </div>

        <div className="geolocation4">
          <h4>My Forbidden geolocations: </h4>

          {selections2.map((selection, index) => (
            <div className="geolocation2" key={index}>
              <div>
                <div style={{ display: 'flex' }}>
                  <p>Continent: </p>
                  <span> {continents[selection.continent - 1].name} </span>
                </div>

                <div style={{ display: 'flex' }}>
                  <p>Country: </p>
                  <span> {selection.country} </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete2(index)}
                style={{ margin: 'auto 20px auto auto ' }}>
                -
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CountrySelector;
