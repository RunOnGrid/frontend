import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@/ThemeContext";
import AppGeoSelect from "./AppGeoSelect";
import AppComponentSelect from "./AppComponentSelect";
import Summary from "../Summary";
import Botonera2 from "@/commons/Botonera2";
import Spinner from "@/commons/Spinner";
import JsonEditor from "@/components/flux/JsonEditor";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/stripe/StripeScreen";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const DockerDeploy = ({ databaseName, setDatabaseName, image }) => {
  const { darkMode } = useTheme();
  const router = useRouter();

  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(2);
  const [activeTab, setActiveTab] = useState("builder");
  const [componentData, setComponentData] = useState({});
  const [price, setPrice] = useState(0);
  const [existingNames, setExistingNames] = useState([]);
  const [allowedLocations, setAllowedLocations] = useState([]);
  const [forbiddenLocations, setForbiddenLocations] = useState([]);
  const [staticIp, setStaticIp] = useState(null);
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const envRef = useRef(null);

  // Fetch existing names on component mount
  useEffect(() => {
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
        console.error("Error loading existing app names");
      }
    };

    fetchExistingNames();
  }, []);

  useEffect(() => {
    if (activeStep === 3) {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 4) {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 5) {
      envRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep]);

  // Location and IP handlers
  const handleAllowedLocationsChange = useCallback((locations) => {
    setAllowedLocations(locations);
  }, []);

  const handleForbiddenLocationsChange = useCallback((locations) => {
    setForbiddenLocations(locations);
  }, []);

  const handleStaticIp = (boolean) => {
    setStaticIp(boolean);
  };

  // Step completion handler
  const handleCompleteStep = (step) => {
    setCompletedSteps((prevSteps) => [...prevSteps, step]);
    setActiveStep(step + 1);
  };

  // Tab change handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "yaml") {
      setCompletedSteps((prevSteps) => prevSteps.filter((step) => step <= 2));
      setActiveStep(2);
      setComponentData({});
      setAllowedLocations([]);
      setForbiddenLocations([]);
      setStaticIp(null);
      setPrice(0);
    }
  };

  // Payment and deployment handlers
  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: price * 100 }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
      setShowPayment(true);
    } catch (err) {
      console.error("Payment intent error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    setPaymentCompleted(true);
    setShowPayment(false);

    try {
      const deploymentConfig = {
        name: componentData.name,
        description: componentData.description || "grid-default-description",
        owner: process.env.owner,
        compose: [
          {
            name: componentData.name,
            description:
              componentData.description || "grid-default-description",
            repotag: image || "gridcloud/hello-app:2.0",
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
        localStorage.setItem("DeploymentDate", new Date().toLocaleDateString());
      }

      router.push("/profile");
    } catch (error) {
      console.error("Deployment error:", error);
    }
  };

  return (
    <div>
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

      {activeTab === "builder" && (
        <>
          <AppGeoSelect
            darkMode={darkMode}
            onNext={() => handleCompleteStep(3)}
            ref={servicesRef}
            onLocationsChange={handleAllowedLocationsChange}
            onLocationsChange2={handleForbiddenLocationsChange}
            onStaticIp={handleStaticIp}
          />

          {completedSteps.includes(3) && (
            <AppComponentSelect
              darkMode={darkMode}
              onSaveComponentData={setComponentData}
              onNext={() => handleCompleteStep(4)}
              ref={deployRef}
              price={price}
              setPrice={setPrice}
              image={image}
              existingNames={existingNames}
            />
          )}

          {completedSteps.includes(4) && (
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
                {isLoading ? (
                  <div className="loading-container">
                    <Spinner />
                  </div>
                ) : (
                  <button
                    className="deploy-button"
                    onClick={handleContinue}
                    disabled={isLoading || paymentCompleted}
                  >
                    {paymentCompleted
                      ? "Deployment in progress"
                      : "Continue to payment"}
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {showPayment && clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm
            onClick={setShowPayment}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
};

export default DockerDeploy;
