import Image from 'next/image';
import React, { useState } from 'react';
import PricingPlanSelector from './PricingSelector';
import TeamAssistance from './TeamAssist';
import Summary from './Summary';

const regions = [
  'North America',
  'South America',
  'Europe',
  'Africa',
  'Asia',
  'Oceania',
];

const DeployScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('North America');
  const [databaseType, setDatabaseType] = useState('');
  const [databaseName, setDatabaseName] = useState('');
  const [instanceType, setInstanceType] = useState({});
  const [price, setPrice] = useState(0);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="dashboard-header">
        <div className="toggle-mode">
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
          <h2>Deploy Database</h2>
        </div>
        {showNotifications && (
          <div className={`notifications-popup ${darkMode ? 'dark' : 'light'}`}>
            <h2>Notifications</h2>
            <div className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
              <span className="dot green"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
              <span className="dot orange"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
              <span className="dot green"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
              <span className="dot red"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
        )}
      </div>
      <div className="deploy-container">
        <div>
          <div className="cloudSelect">
            <div style={{ display: 'flex' }}>
              <h3>1.</h3>
              <span>Cloud</span>
            </div>
            <button>
              <Image src="/fluxLanding.svg" alt="" height={25} width={100} />
            </button>
          </div>
          <div className="databaseSelect">
            <div style={{ display: 'flex' }}>
              <h3>2.</h3>
              <span>Database type</span>
            </div>
            <div style={{ marginLeft: '20px' }}>
              <button onClick={() => setDatabaseType('MySQL')}>
                <Image src="/psqlLogo.png" alt="" height={45} width={130} />
              </button>
              <button onClick={() => setDatabaseType('PostgreSQL')}>
                <Image src="/psqlLogo.png" alt="" height={45} width={130} />
              </button>
              <button onClick={() => setDatabaseType('MongoDB')}>
                <Image src="/psqlLogo.png" alt="" height={45} width={130} />
              </button>
              <button onClick={() => setDatabaseType('SQLite')}>
                <Image src="/psqlLogo.png" alt="" height={45} width={130} />
              </button>
            </div>
          </div>
          <div className="databaseSelect">
            <div style={{ display: 'flex' }}>
              <h3>3.</h3>
              <span>Database name</span>
            </div>
            <div>
              <div
                className={`input-container2 ${darkMode ? 'dark' : 'light'}`}>
                <input
                  type="text"
                  className={`custom-input ${darkMode ? 'dark' : 'light'}`}
                  value={databaseName}
                  onChange={(e) => setDatabaseName(e.target.value)}
                />
                <button
                  className={`custom-button ${darkMode ? 'dark' : 'light'}`}>
                  Done
                </button>
              </div>
            </div>
          </div>
          <div className="locationSelect">
            <div style={{ display: 'flex' }}>
              <h3>4.</h3>
              <span>Deployment location</span>
            </div>
            <div className={`region-container ${darkMode ? 'dark' : 'light'}`}>
              {regions.map((region) => (
                <button
                  key={region}
                  className={`region-button ${
                    selectedRegion === region ? 'active' : ''
                  }`}
                  onClick={() => setSelectedRegion(region)}>
                  {region}
                </button>
              ))}
            </div>
          </div>
          <div className="locationSelect">
            <div style={{ display: 'flex' }}>
              <h3>5.</h3>
              <span>Instance type</span>
            </div>
            <PricingPlanSelector
              setInstanceType={setInstanceType}
              setPrice={setPrice}
              mode={darkMode}
            />
          </div>
        </div>
        <div style={{ marginLeft: '50px' }}>
          <TeamAssistance />
          <Summary
            geolocation={selectedRegion}
            period={selectedRegion}
            service={databaseType}
            instanceType={instanceType}
            specs={instanceType.specs || []}
            price={price}
            mode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default DeployScreen;
