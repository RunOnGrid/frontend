import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/stripe/StripeScreen";
import { loadStripe } from "@stripe/stripe-js";
import PayModal from "@/components/PayModal";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

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
  const [activeTab, setActiveTab] = useState("builder");
  const [existingNames, setExistingNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);
  const [allowedLocations, setAllowedLocations] = useState([]);
  const [forbiddenLocations, setForbiddenLocations] = useState([]);
  const [staticIp, setStaticIp] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleAllowedLocationsChange = useCallback((locations) => {
    setAllowedLocations(locations);
  }, []);

  const handleForbiddenLocationsChange = useCallback((locations) => {
    setForbiddenLocations(locations);
  }, []);
  const handleContinue = async () => {
    setIsLoading2(true);
    setError(null);
    setShowModal(false);

    try {
      const price = 100;

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: price * 100 }), // Convert to cents
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
      setShowPayment(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading2(false);
    }
  };

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
  const handleStaticIp = (boolean) => {
    setStaticIp(boolean);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const handleDeploy = async () => {
    setShowPayment(true);
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price * 100 }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      setShowPayment(false);
    }
  };
  const handlePaymentSuccess = async () => {
    setPaymentCompleted(true);
    setShowPayment(false);
    setIsDeploying(true);
    setDeploymentMessage("");

    try {
      if (selectedCloud === "flux") {
        const deploymentConfig = {
          name: componentData.name,
          description: componentData.description || "grid-default-description",
          owner: process.env.owner,
          compose: [
            {
              name: componentData.name,
              description:
                componentData.description || "grid-default-description",
              repotag: componentData.image || "gridcloud/hello-app:2.0",
              ports: componentData.ports || [36522],
              domains: componentData.domains || [""],
              environmentParameters: componentData.envVariables || [],
              commands: componentData.commands || [],
              containerPorts: componentData.contPorts || [8080],
              containerData: "/data",
              cpu: parseFloat(componentData.cpu) || 0.1,
              ram: parseInt(componentData.ram) || 128,
              hdd: parseInt(componentData.hdd) || 1,
              tiered: false,
              secrets: "",
              repoauth: "",
            },
          ],
          instances: parseInt(componentData.instances),
          geolocation: [...allowedLocations, ...forbiddenLocations],
          staticip: staticIp,
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

        router.push("/profile");
      }
    } catch (error) {
      console.error("Error durante el despliegue:", error);
      setDeploymentMessage("Error en el despliegue: " + error.message);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "yaml") {
      // Reset completed steps to only include steps 1 and 2
      setCompletedSteps((prevSteps) => prevSteps.filter((step) => step <= 2));
      // Reset active step to 2 (since we want to keep up to step 2)
      setActiveStep(2);
      // Reset any data from later steps
      setComponentData({});
      setAllowedLocations([]);
      setForbiddenLocations([]);
      setStaticIp(null);
      setPrice(0);
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
              <span className={`akash-faucet ${darkMode ? "dark" : "light"}`}>
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
                  } ${darkMode ? "dark" : "light"}`}
                  onClick={() => handleTabChange("builder")}
                >
                  Builder
                </div>
                <div
                  className={`billing-tab ${
                    activeTab === "yaml" ? "billing-tab-active" : ""
                  } ${darkMode ? "dark" : "light"}`}
                  onClick={() => handleTabChange("yaml")}
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
                  onLocationsChange={handleAllowedLocationsChange}
                  onLocationsChange2={handleForbiddenLocationsChange}
                  onStaticIp={handleStaticIp}
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
                onClick={() => {
                  setShowModal(true);
                }}
                disabled={isLoading || paymentCompleted}
              >
                {paymentCompleted
                  ? "Deployment in progress"
                  : "Continue to payment"}
              </button>
            </div>
          </div>
        )}
      </div>
      {showPayment && clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm
            onClick={setShowPayment}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      )}
      {showModal && (
        <>
          <PayModal
            onClick={() => {
              setShowModal(false);
            }}
            pay={() => {
              handleContinue();
            }}
          />
        </>
      )}
    </div>
  );
};

export default DeployAppScreen;
