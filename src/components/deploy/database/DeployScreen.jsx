import Image from "next/image";
import React, { useState } from "react";
import PricingPlanSelector from "../PricingSelector";
import TeamAssistance from "../TeamAssist";
import Summary from "../Summary";
import { useTheme } from "@/ThemeContext";
import ThemeToggle from "../../ThemeToggle";
import Notis from "../../applications2/Notis";
import CloudSelect from "./CloudSelect";
import DatabaseSelect from "./DatabaseSelect";
import NameSelect from "./NameSelect";
import LocationSelect from "./LocationSelect";

const regions = [
  "North America",
  "South America",
  "Europe",
  "Africa",
  "Asia",
  "Oceania",
];

const DeployScreen = () => {
  const { darkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("North America");
  const [databaseType, setDatabaseType] = useState("");
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
      <div className="deploy-container">
        <div>
          <CloudSelect />
          <DatabaseSelect onClick={setDatabaseType} />
          <NameSelect
            darkMode={darkMode}
            onClick={setDatabaseName}
            data={databaseName}
          />
          <LocationSelect
            darkMode={darkMode}
            regions={regions}
            selectedRegion={selectedRegion}
            onClick={setSelectedRegion}
          />

          <div className="locationSelect">
            <div style={{ display: "flex" }}>
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
        <div style={{ marginLeft: "50px" }}>
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
