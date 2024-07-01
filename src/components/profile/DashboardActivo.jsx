import React, { useState } from 'react';
import AppActive from './AppActive';
import TeamActive from './TeamActive';
import NewTeam from './NewTeam';
import EnvActive from './EnvActive';
import NewEnv from './NewEnv';

const DashboardActive = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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
        </div>
        {/* <div
          className={`notification-icon ${darkMode ? 'dark' : 'light'}`}
          onClick={toggleNotifications}>
          <img
            src={`${darkMode ? 'notification2.png' : 'notification.png'}`}
            alt="Notifications"
          />
        </div> */}
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
      <div
        style={{ display: 'flex', gap: '20px', width: '92%', margin: 'auto' }}>
        <div className={`applications-section2 ${darkMode ? 'dark' : 'light'}`}>
          <div className="section-header">
            <h3>Applications</h3>
            <button>View all</button>
          </div>
          <div className="apps-flex">
            <AppActive
              title="App 1"
              state="Active"
              type="Database"
              date="27/06/2024"
              mode={darkMode}
            />
            <AppActive
              title="App 2"
              state="Inactive"
              type="Database"
              date="27/06/2024"
              mode={darkMode}
            />
            <AppActive
              title="App 3"
              state="Renew"
              type="Database"
              date="27/06/2024"
              mode={darkMode}
            />
            <AppActive
              title="App 4"
              state="Active"
              type="Database"
              date="27/06/2024"
              mode={darkMode}
            />
          </div>
        </div>
        <div className={`applications-section2 ${darkMode ? 'dark' : 'light'}`}>
          <div className="section-header">
            <div>
              <h3>Databases</h3>
            </div>
            <button>View all</button>
          </div>
          <div className="apps-flex">
            <AppActive
              title="App 1"
              state="Active"
              type="Database"
              date="27/06/2024"
              mode={darkMode}
            />
            <AppActive
              title="App 2"
              state="Inactive"
              type="Database"
              date="27/06/2024"
              mode={darkMode}
            />
            <AppActive
              title="App 3"
              state="Renew"
              type="Database"
              date="27/06/2024"
              mode={darkMode}
            />
            <AppActive
              title="App 4"
              state="Active"
              type="Database"
              date="27/06/2024"
              mode={darkMode}
            />
          </div>
        </div>
      </div>

      <div className="middle-section">
        <div className={`billing-section ${darkMode ? 'dark' : 'light'}`}>
          <div className="section-header">
            <h4>Billing overview / Plan</h4>
          </div>
          <div className="billing-info">
            <div>
              <h1>DEV</h1>
              <div style={{ display: 'flex' }}>
                <h3>$ 000 </h3>
                <span> / month</span>
              </div>
              <p>NEXT PAYMENT: 6/14/2024</p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: 'auto',
                marginRight: '0px',
              }}>
              <button className="billing1">My plan</button>
              <button className={`billing2 ${darkMode ? 'dark' : 'light'}`}>
                {' '}
                Upgrade
              </button>
            </div>
          </div>
        </div>
        <div className={`teams-section ${darkMode ? 'dark' : 'light'}`}>
          <div className="section-header">
            <h3> Teams</h3>
            <button>Manage</button>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              margin: 'auto',
              justifyContent: 'center',
              marginTop: '20px',
            }}>
            <TeamActive name="TEAM 1" mode={darkMode} />
            <TeamActive name="TEAM 2" mode={darkMode} />
            <NewTeam name="TEAM 3" />
          </div>
        </div>
        <div className={`envs-section ${darkMode ? 'dark' : 'light'}`}>
          <div className="section-header">
            <h3> Env Groups</h3>
            <button>Manage</button>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              margin: 'auto',
              justifyContent: 'center',
              marginTop: '20px',
            }}>
            <EnvActive name="GROUP 1" mode={darkMode} />
            <EnvActive name="GROUP 2" mode={darkMode} />
            <EnvActive name="GROUP 3" mode={darkMode} />
            <NewEnv mode={darkMode} />
          </div>
        </div>
      </div>
      <div className={`events-section ${darkMode ? 'dark' : 'light'}`}>
        <div className="section-header">
          <h3>Events</h3>
          <button>View all</button>
        </div>
        <table className={`events-table ${darkMode ? 'dark' : 'light'}`}>
          <thead>
            <tr>
              <th>Integration</th>
              <th>Action</th>
              <th>Date/Time</th>
              <th>By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  src="githubLogoDark.svg"
                  alt=""
                  className="integration-logo"
                />{' '}
                GITHUB
              </td>
              <td>Commit - Main Branch</td>
              <td>12/03/2025 17:30</td>
              <td>Benjamin Aguirre (Admin)</td>
            </tr>
            <tr>
              <td>
                <img
                  src="fluxLogoDark.svg"
                  alt=""
                  className="integration-logo"
                />{' '}
                FLUX
              </td>
              <td>Commit - Main Branch</td>
              <td>12/03/2025 17:30</td>
              <td>Infrastructure</td>
            </tr>
            <tr>
              <td>
                <img
                  src="akashLogoDark.svg"
                  alt=""
                  className="integration-logo"
                />{' '}
                AKASH
              </td>
              <td>Commit - Main Branch</td>
              <td>12/03/2025 17:30</td>
              <td>Infrastructure</td>
            </tr>
            <tr>
              <td>
                <img
                  src="githubLogoDark.svg"
                  alt=""
                  className="integration-logo"
                />{' '}
                GITHUB
              </td>
              <td>Commit - Main Branch</td>
              <td>12/03/2025 17:30</td>
              <td>Benjamin Aguirre (Admin)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardActive;
