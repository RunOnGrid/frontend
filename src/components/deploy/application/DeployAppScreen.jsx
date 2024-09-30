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
import JsonEditor from "@/components/flux/JsonEditor";

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
  const [currentDate, setCurrentDate] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [existingNames, setExistingNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    const formatDate = (date) => {
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    };
    setCurrentDate(formatDate(new Date()));
    const fetchExistingNames = async () => {
      try {
        const response = await fetch(
          "https://api.runonflux.io/apps/globalappsspecifications"
        );
        const data = await response.json();
        if (data && data.data) {
          const names = data.data.map((app) => app.name.toLowerCase());
          setExistingNames(names);
        }
      } catch (err) {
        setError("Error al cargar los nombres de aplicaciones existentes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingNames();
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
        const deploymentConfig = {
          name: componentData.name,
          description: "anotherDescription",
          owner: process.env.owner,
          compose: [
            {
              name: componentData.name,
              description: "GridTestNamev0001",
              repotag: componentData.image || "gridcloud/hello-app:2.0",
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
          geolocation: [],
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
          localStorage.setItem("DeploymentDate", currentDate);
        }
        setDeploymentMessage(`Succesfull deployment`);

        router.push("/applications");
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
              <div className="billing-tabs2">
                <div
                  className={`billing-tab ${
                    activeTab === "builder" ? "billing-tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("builder")}
                >
                  Builder
                </div>
                <div
                  className={`billing-tab ${
                    activeTab === "yaml" ? "billing-tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("yaml")}
                >
                  Json
                </div>
              </div>
              {activeTab === "yaml" ? (
                <JsonEditor existingNames={existingNames} image={image} />
              ) : (
                ""
              )}
              {activeTab === "builder" ? (
                <AppGeoSelect
                  darkMode={darkMode}
                  onNext={() => handleCompleteStep(3)}
                  ref={servicesRef}
                />
              ) : (
                ""
              )}

              {completedSteps.includes(3) && (
                <AppComponentSelect
                  darkMode={darkMode}
                  onNext={() => handleCompleteStep(4)}
                  onSaveComponentData={handleSaveComponentData}
                  ref={deployRef}
                  price={price}
                  setPrice={setPrice}
                  image={image}
                  existingNames={existingNames}
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