import React, { useEffect, useState } from 'react';
import IntegrationBox from '../IntegrationBox';
import back from '../../../axios';
import { useTheme } from "@/ThemeContext";
import ThemeToggle from "../ThemeToggle";
import Notis from "../applications2/Notis";

const IntegrationScreen = () => {
  const { darkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [githubIntegrationState, setGithubIntegrationState] = useState("");

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const checkInstallationOwner = async () => {
      try {
        const userGrid = localStorage.getItem("userGrid");
        if (!userGrid) {
          setGithubIntegrationState("Not logged");
          return;
        }

        const response = await back.get(`/api/checkOwner/${userGrid}`);
        if (response.data.exists) {
          setGithubIntegrationState("Connected");
          localStorage.setItem("installationId", response.data.id);
        } else {
          setGithubIntegrationState("Install app");
        }
      } catch (error) {
        console.error("Error:", error);
        setGithubIntegrationState("Install app");
      }
    };

    checkInstallationOwner();
  }, []);
  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        <h2>Integrations</h2>
        <ThemeToggle />
        <div
          className={`notification-icon ${darkMode ? "dark" : "light"}`}
          onClick={toggleNotifications}
        >
          <img
            src={`${darkMode ? "/notification2.png" : "/notification.png"}`}
            alt="Notifications"
          />
        </div>
        {showNotifications && <Notis darkMode={darkMode} />}
      </div>
      <div style={{ display: "flex", width: "90%", margin: "20px auto" }}>
        <IntegrationBox
          mode={darkMode}
          state="Connect"
          title="Docker"
          image="/docker4.png"
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
