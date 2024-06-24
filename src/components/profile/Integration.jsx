import React, { useEffect, useState } from 'react';
import IntegrationBox from '../IntegrationBox';
import back from '../../../axios';

const IntegrationScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [githubIntegrationState, setGithubIntegrationState] = useState('');

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    const checkInstallationOwner = async () => {
      try {
        const userGrid = localStorage.getItem('userGrid');
        if (!userGrid) {
          setGithubIntegrationState('Not logged');
          return;
        }

        const response = await back.get(`/api/checkOwner/${userGrid}`);
        if (response.data.exists) {
          setGithubIntegrationState('Connected');
          localStorage.setItem('installationId', response.data.id);
        } else {
          setGithubIntegrationState('Install app');
        }
      } catch (error) {
        console.error('Error:', error);
        setGithubIntegrationState('Install app');
      }
    };

    checkInstallationOwner();
  }, []);
  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="dashboard-header">
        <h2>Integrations</h2>
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
        <div
          className={`notification-icon ${darkMode ? 'dark' : 'light'}`}
          onClick={toggleNotifications}>
          <img
            src={`${darkMode ? '/notification2.png' : '/notification.png'}`}
            alt="Notifications"
          />
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
      <div style={{ display: 'flex', width: '90%', margin: '20px auto' }}>
        <IntegrationBox
          mode={darkMode}
          state="Connect"
          title="Docker"
          image="/docker4.png"
        />
        <IntegrationBox
          mode={darkMode}
          state="Connect"
          title="Slack"
          image="/slackButton.png"
        />
        <IntegrationBox
          mode={darkMode}
          state={githubIntegrationState}
          title="Github"
          image="/gitButton.png"
        />
      </div>
    </div>
  );
};

export default IntegrationScreen;
