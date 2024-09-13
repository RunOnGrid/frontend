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
import Spinner from "@/commons/Spinner";
import { useRouter } from "next/router";

const DeployAppScreen = () => {
  const { darkMode } = useTheme();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [databaseName, setDatabaseName] = useState("");
  const [price, setPrice] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentMessage, setDeploymentMessage] = useState("Deploy");
  const nameRef = useRef(null);
  const detailsRef = useRef(null);
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const envRef = useRef(null);
  const preDeployRef = useRef(null);
  const payRef = useRef(null);
  const [componentData, setComponentData] = useState({});
  const [agree, setAgree] = useState(false);
  const handleSaveComponentData = (data) => {
    setComponentData(data);
  };

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
    }
  }, [activeStep]);

  const handleCompleteStep = (step) => {
    setCompletedSteps((prevSteps) => [...prevSteps, step]);
    setActiveStep(step + 1);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentMessage(""); // Vaciar el mensaje para mostrar el Spinner
    // Simula un despliegue real
   
    try {
      const deploymentConfig = {
        name: componentData.serviceName,
        description: "anotherDescription",
        owner: process.env.owner,
        compose: [
          {
            name: componentData.serviceName,
            description: "GridTestNamev0001",
            repotag: "gridcloud/hello-app:2.0",
            ports: [36522],
            domains: [""],
            environmentParameters: [],
            commands: [],
            containerPorts: [8080],
            containerData: "/data",
            cpu: parseFloat(componentData.cpu), // Asegúrate de convertir a número
            ram: parseInt(componentData.ram), // Convertir a número entero
            hdd: parseInt(componentData.hdd),
            tiered: false,
            secrets: "",
            repoauth: "",
          },
        ],
      };
      const response = await fetch("/api/deploy-app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deploymentConfig),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDeploymentMessage(
        `Despliegue exitoso. ID de transacción: ${data.transactionId}, ID de aplicación: ${data.appId}`
      );
    } catch (error) {
      console.error("Error durante el despliegue:", error);
      setDeploymentMessage("Error en el despliegue: " + error.message);
    } finally {
      setIsDeploying(false);
    }
  };
  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        {/* <ThemeToggle /> */}
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
              onSaveComponentData={handleSaveComponentData}
              ref={deployRef}
              price={price}
              setPrice={setPrice}
            />
          )}
        </div>
        {completedSteps.includes(4) && (
          <div ref={envRef}>
            <Summary price={price} mode={darkMode} />
            <div className="termService">
              <Botonera2 setAgree={setAgree} agree={agree} />
              <h4>I agree with Terms of Service</h4>
            </div>
            <div
              className={
                agree
                  ? "deploy-button-wrapper"
                  : "deploy-button-wrapper-disabled"
              }
            >
              <div className="line-background"></div>
              <button
                className="deploy-button"
                onClick={handleDeploy}
                disabled={isDeploying}
              >
                {isDeploying ? <Spinner /> : deploymentMessage}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeployAppScreen;



