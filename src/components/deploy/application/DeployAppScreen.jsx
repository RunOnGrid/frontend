import React, { useState } from "react";
import Summary from "../Summary";
import Botonera2 from "@/commons/Botonera2";
import { useTheme } from "@/ThemeContext";
import ThemeToggle from "../../ThemeToggle";
import Notis from "../../applications2/Notis";
import AppCloudSelect from "./AppCloudSelect";
import AppMethodSelect from "./AppMethodSelect";
import AppGeoSelect from "./AppGeoSelect";
import AppComponentSelect from "./AppComponentSelect";
import AppDetails from "./AppDetails";

const DeployAppScreen = () => {
  const { darkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [databaseName, setDatabaseName] = useState("");
  const [instanceType, setInstanceType] = useState({});
  const [price, setPrice] = useState(0);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
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
      <div className="deploy-container2">
        <div>
          <AppCloudSelect />
          <AppMethodSelect
            darkMode={darkMode}
            onClick={setDatabaseName}
            value={databaseName}
          />
          <AppGeoSelect darkMode={darkMode} />
          <AppComponentSelect darkMode={darkMode} />
          <AppDetails darkMode={darkMode} />
        </div>
        <Summary mode={darkMode} />
        <div className="termService">
          <Botonera2 />
          <h4>I agree with Terms of Service</h4>
        </div>
        <div className="deploy-button-wrapper">
          <div className="line-background"></div>
          <button className="deploy-button">Deploy</button>
        </div>
      </div>
    </div>
  );
};

export default DeployAppScreen;
