import React, { useEffect, useRef, useState } from "react";
import Summary from "../Summary";
import Botonera2 from "@/commons/Botonera2";
import { useTheme } from "@/ThemeContext";
import Notis from "../../applications2/Notis";
import AppCloudSelect from "./AppCloudSelect";
import AppGeoSelect from "./AppGeoSelect";
import AppComponentSelect from "./AppComponentSelect";
import BuildAkash from "@/components/akash/BuildAkash";
import Spinner from "@/commons/Spinner";
import { useRouter } from "next/router";
import { DataComponent } from "@/components/deployBoxes/DataComponent";
import MethodSelectAkash from "./MethodSelectAkash";
import MethodSelectFlux from "./MethodSelectFlux";
import Link from "next/link";
import axios from "axios";

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
  const [selectedCloud, setSelectedCloud] = useState(null);
  const [componentData, setComponentData] = useState({});
  const [agree, setAgree] = useState(false);
  const [image, setImage] = useState("gridcloud/aptos-app:v.1");
  const [fluxAvailable, setFluxAvailable] = useState(0);

  const nameRef = useRef(null);
  const detailsRef = useRef(null);
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const envRef = useRef(null);

  const handleSaveComponentData = (data) => {
    setComponentData(data);
  };

  useEffect(() => {
    if (activeStep === 1) {
      nameRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 2) {
      detailsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 3 && selectedCloud === "flux") {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 4 && selectedCloud === "flux") {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 5 && selectedCloud === "flux") {
      envRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep, selectedCloud]);
  useEffect(() => {
    const fluxWallet = async () => {
      try {
        const response = await axios.get(
          "https://api.runonflux.io/explorer/balance?address=t1SsyhfbkVJr8RFNP4VRPNeKx5wHWYQrXkT"
        );

        const formattedNum = (response.data.data / 100000000).toFixed(2);
        setFluxAvailable(formattedNum);
      } catch (error) {
        console.error("Error obteniendo los repositorios", error);
      }
    };

    fluxWallet();
  }, []);

  const handleCompleteStep = (step) => {
    setCompletedSteps((prevSteps) => [...prevSteps, step]);
    setActiveStep(step + 1);
  };
  const resetFlow = () => {
    setDatabaseName("");
    setPrice(0);
    setCompletedSteps([]);
    setActiveStep(null);
    setIsDeploying(false);
    setDeploymentMessage("Deploy");
    setSelectedCloud(null);
    setComponentData({});
    setAgree(false);
    setImage("gridcloud/aptos-app:v.1");
  };

  const handleCloudSelect = (cloud) => {
    resetFlow();
    setSelectedCloud(cloud);
    handleCompleteStep(1);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentMessage("");

    try {
      if (selectedCloud === "flux") {
        // Lógica de despliegue para Flux
        const deploymentConfig = {
          name: componentData.name || "grid-cloud",
          description: "anotherDescription",
          owner: process.env.owner,
          compose: [
            {
              name: componentData.name || "grid-cloud",
              description: "GridTestNamev0001",
              repotag: componentData.image || "gridcloud/aptos-app:v.1",
              ports: [36522],
              domains: [""],
              environmentParameters: [],
              commands: [],
              containerPorts: [8080],
              containerData: "/data",
              cpu: parseFloat(componentData.cpu),
              ram: parseInt(componentData.ram),
              hdd: parseInt(componentData.hdd),
              tiered: false,
              secrets: "",
              repoauth: "",
            },
          ],
        };
        const response = await fetch("/api/flux-deploy", {
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
        if (data.name && data.uri) {
          localStorage.setItem("DeploymentName", data.name);
          localStorage.setItem("DeploymentUri", data.uri);
        }
        setDeploymentMessage(`Succesfull deployment`);

        router.push("/applications");
      } else if (selectedCloud === "akash") {
        // Lógica de despliegue para Akash
        // Aquí deberías usar la lógica de BuildAkash para el despliegue
        const response = await fetch("/api/akash/deploy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(componentData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setDeploymentMessage(
          `Despliegue exitoso en Akash. Detalles: ${JSON.stringify(data)}`
        );
      }
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
          <AppCloudSelect onNext={handleCloudSelect} ref={nameRef} />

          {selectedCloud === "akash" && completedSteps.includes(1) && (
            <>
              <span className="akash-faucet">
                Use
                <strong>
                  <Link
                    href="https://faucet.sandbox-01.aksh.pw/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    this faucet
                  </Link>
                </strong>
                to fund our sandbox address:
                <strong> akash1lvjmmlqd0ucjx6ntyh55v78a7z2u7myel6rarn </strong>
              </span>
            </>
          )}
          {selectedCloud === "flux" && completedSteps.includes(1) && (
            <>
              <span className="flux-faucet">
                Flux available:
                <strong>{fluxAvailable}</strong>
              </span>
            </>
          )}

          {selectedCloud === "flux" && completedSteps.includes(1) && (
            <>
              <MethodSelectFlux
                darkMode={darkMode}
                onClick={setDatabaseName}
                value={databaseName}
                onNext={() => handleCompleteStep(2)}
                setImage={setImage}
                ref={detailsRef}
              />
            </>
          )}
          {selectedCloud === "akash" && completedSteps.includes(1) && (
            <>
              <MethodSelectAkash
                darkMode={darkMode}
                onClick={setDatabaseName}
                value={databaseName}
                onNext={() => handleCompleteStep(2)}
                setImage={setImage}
                ref={detailsRef}
              />
            </>
          )}

          {selectedCloud === "flux" && completedSteps.includes(2) && (
            <>
              <AppGeoSelect
                darkMode={darkMode}
                onNext={() => handleCompleteStep(3)}
                ref={servicesRef}
              />
              {completedSteps.includes(3) && (
                <AppComponentSelect
                  darkMode={darkMode}
                  onNext={() => handleCompleteStep(4)}
                  onSaveComponentData={handleSaveComponentData}
                  ref={deployRef}
                  price={price}
                  setPrice={setPrice}
                  image={image}
                />
              )}
            </>
          )}

          {selectedCloud === "akash" && completedSteps.includes(2) && (
            <BuildAkash
              darkMode={darkMode}
              onSaveComponentData={handleSaveComponentData}
              onNext={() => handleCompleteStep(3)}
              image={image}
            />
          )}
        </div>

        {((selectedCloud === "flux" && completedSteps.includes(4)) ||
          (selectedCloud === "akash" && completedSteps.includes(3))) && (
          <div ref={envRef}>
            <Summary componentData={componentData} mode={darkMode} />
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
                disabled={isDeploying || !agree}
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