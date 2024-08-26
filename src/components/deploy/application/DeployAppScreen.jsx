import React, { useEffect, useRef, useState } from "react";
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
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(null);
  const nameRef = useRef(null);
  const detailsRef = useRef(null);
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const envRef = useRef(null);
  const preDeployRef = useRef(null);
  const payRef = useRef(null);

  useEffect(() => {
    if (activeStep === 1) {
      nameRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 2) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 3) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 4) {
      deployRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 5) {
      envRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 6) {
      payRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep]);

  const handleCompleteStep = (step) => {
    setCompletedSteps((prevSteps) => [...prevSteps, step]);
    setActiveStep(step + 1);
  };

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
          <AppCloudSelect onNext={() => handleCompleteStep(1)} ref={nameRef} />
          {completedSteps.includes(1) && (
            <AppMethodSelect
              darkMode={darkMode}
              onClick={setDatabaseName}
              value={databaseName}
              onNext={() => handleCompleteStep(2)}
              ref={detailsRef}
            />
          )}
          {completedSteps.includes(2) && (
            <AppGeoSelect
              darkMode={darkMode}
              onNext={() => handleCompleteStep(3)}
              ref={servicesRef}
            />
          )}
          {completedSteps.includes(3) && (
            <AppComponentSelect
              darkMode={darkMode}
              onNext={() => handleCompleteStep(4)}
              ref={deployRef}
            />
          )}
          {completedSteps.includes(4) && (
            <AppDetails
              darkMode={darkMode}
              onNext={() => handleCompleteStep(5)}
              ref={envRef}
            />
          )}
        </div>
        {completedSteps.includes(5) && (
          <div ref={payRef}>
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
        )}
      </div>
    </div>
  );
};

export default DeployAppScreen;
