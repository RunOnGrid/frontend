import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import EnvModal from "../EnvModal";
import PayModal from "../PayModal";
import CommModal from "../CommModal";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../stripe/StripeScreen";
import PricingPlanAkash from "../deploy/PricingPlanAkash";
import Botonera2 from "@/commons/Botonera2";
import SummaryAkash from "../deploy/SummaryAkash";
import LoadingText from "@/commons/LoaderText";
import Image from "next/image";
import AppGeoSelect from "../deploy/application/AppGeoSelect";
import PricingPlanFlux from "../deploy/application/PricingPlanFlux";
import { TokenService } from "../../../tokenHandler";
import PortFlux from "../PortFlux";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const ownerFlux = process.env.OWNER_FLUX

export default function BuildFlux({ darkMode, image }) {
  const [activeStep, setActiveStep] = useState(3);
  const [editingPortIndex, setEditingPortIndex] = useState(null);
  const [serviceName, setServiceName] = useState("service-grid");
  const [cpu, setCpu] = useState(0.5);
  const [memory, setMemory] = useState(512);
  const [ephemeralStorage, setEphemeralStorage] = useState(512);
  const [serviceCount, setServiceCount] = useState(3);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("builder");
  const [currentDate, setCurrentDate] = useState("");
  const [commands, setCommands] = useState([]);
  const [args, setArgs] = useState([]);
  const [env, setEnv] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ports, setPorts] = useState({
    port: 39470,
    accept: [],
    contPorts: "[]",
  });

  const [showEnv, setShowEnv] = useState(false);
  const [showComm, setShowComm] = useState(false);
  const [showPorts, setShowPorts] = useState(false);
  const [yaml, setYaml] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [summary, setSummary] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [allowedLocations, setAllowedLocations] = useState([]);
  const [forbiddenLocations, setForbiddenLocations] = useState([]);
  const [orderId, setOrderId] = useState(1);
  const [appPrice, setAppPrice] = useState(0);
  const [accessToken, setAccessToken] = useState("");

  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const envRef = useRef(null);

  const handleYamlChange = (newYaml) => {
    setYaml(newYaml);
  };
  const router = useRouter();

  const handleShowEnv = (newEnv) => {
    setEnv((prevEnv) => ({ ...prevEnv, ...newEnv }));
    setShowEnv(false);
  };
  const handleSaveCommand = (newData) => {
    setCommands((prevCommands) => [...prevCommands, newData.command]);
    setArgs((prevArgs) => [...prevArgs, newData.argument]);

    setShowComm(false);
  };
  const handleOpenPortModal = (index = null) => {
    setEditingPortIndex(index);
    setShowPorts(true);
  };
  const handleSavePort = (newPort) => {
    const newPorts = newPort;

    setPorts(newPorts);
    setShowPorts(false);
    setEditingPortIndex(null);
  };
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setServiceName(name);
  };
  const handleSummary = (state) => {
    if (!name.trim()) {
      setErrorMessage("This field is required.");
      return;
    }
    if (!imageURL.trim()) {
      setErrorMessage("This field is required.");
      return;
    }
    setErrorMessage("");
    setSummary(true);
    setActiveStep(4);
  };

  const UnitOptions = ["Mb", "Mi", "GB", "Gi", "TB", "Ti"];
  const MemoryUnits = ["hdd", "ssd", "NVMe"];

  const handleTypeUnit = (selectedOption) => {
    setTypeUnit(selectedOption);
  };
  const handleDelete = (keyToDelete) => {
    setEnv((prevEnv) => {
      const updatedEnv = { ...prevEnv };
      delete updatedEnv[keyToDelete];
      return updatedEnv;
    });
  };
  const handleDeleteCommand = (indexToDelete) => {
    setCommands((prevCommands) =>
      prevCommands.filter((_, index) => index !== indexToDelete)
    );
  };
  const handleDeleteArgs = (indexToDelete) => {
    setArgs((prevArgs) =>
      prevArgs.filter((_, index) => index !== indexToDelete)
    );
  };



  const handlePaymentSuccess = async () => {
    setPaymentCompleted(true);

    const portsInput = ports.contPorts;
    const portsArray = JSON.parse(portsInput);

    try {
      const deploymentConfig = {
        name: serviceName,
        description: "Application deployed on Grid",
        owner: ownerFlux,
        compose: [
          {
            name: serviceName,
            description: "Application deployed on Grid",
            repotag: imageURL,
            ports: [36522],
            domains: [""],
            environmentParameters: env || [],
            commands: commands || [],
            containerPorts: [8080],
            containerData: "/data",
            cpu: cpu,
            ram: memory,
            hdd: ephemeralStorage,
            tiered: false,
            secrets: "",
            repoauth: "",
          },
        ],
        instances: serviceCount || 3,
        geolocation: [...allowedLocations, ...forbiddenLocations],
        staticip: false,
      };

      const response = await fetch("/api/flux-deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(deploymentConfig),
      });
      console.log(deploymentConfig);
      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      router.push("/profile");
    } catch (error) {
      console.error("Deployment error:", error);
    }
  };

  // useEffect(() => {
  //   const tokens = TokenService.getTokens();
  //   setAccessToken(tokens.tokens.accessToken);
  // }, [accessToken]);

  useEffect(() => {
    if (activeStep === 3) {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 4) {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 5) {
      envRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep]);
  return (
    <div className="databaseSelect">
      <div
        ref={servicesRef}
        className={`deployment-config ${summary ? "disabled" : ""}`}
      >
        <h2>Deployment configuration</h2>

        <p>Configure your deployment settings.</p>
        <div className="billing-tabs">
          <div
            className={`billing-tab ${
              activeTab === "builder" ? "billing-tab-active" : ""
            }  ${darkMode ? "dark" : "light"}`}
            onClick={() => setActiveTab("builder")}
          >
            Builder
          </div>
        </div>
        {activeTab === "builder" ? (
          <>
            <h3> Specify your image URL</h3>
            {errorImage && <h3 className="error-message">{errorImage}</h3>}{" "}
            <div className={`input-with-image4 ${darkMode ? "dark" : "light"}`}>
              <input
                onChange={(e) => setImageURL(e.target.value)}
                // value={imageURL}
                placeholder="ex: gridcloud/aptos-app:v.1"
              />
              <Image alt="" src="/searchLigth.png" height={20} width={20} />
            </div>
            <div className="buildpack-selects">
              <div
                className={`buildpack-single ${darkMode ? "dark" : "light"}`}
              >
                <h3> Service name</h3>
                {errorMessage && (
                  <h3 className="error-message">{errorMessage}</h3>
                )}{" "}
                <div
                  className={`input-container5 ${darkMode ? "dark" : "light"}`}
                >
                  <input
                    type="text"
                    className={`custom-input ${darkMode ? "dark" : "light"}`}
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
              </div>
            </div>
            <PricingPlanFlux
              setMemory={setMemory}
              setCpu={setCpu}
              setEphemeralStorage={setEphemeralStorage}
              setServiceCount={setServiceCount}
              mode={darkMode}
              setPrice={setAppPrice}
            />
            {showPorts && (
              <PortFlux
                darkMode={darkMode}
                onSave={handleSavePort}
                onCancel={() => setShowPorts(false)}
                initialPort={ports}
              />
            )}
            <div className="second-akash">
              <div className="akash-expose">
                <div className={`section2 ${darkMode ? "dark" : "light"}`}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>Expose</h3>
                    <p>
                      Port: {ports.port} : {ports.as} ({ports.protocol})
                    </p>
                    <p>Global: True</p>
                    <p>Accept: {ports.accept}</p>
                    <p>Cont Ports:</p>
                  </div>
                  <span
                    onClick={() => {
                      setShowPorts(true);
                    }}
                    className="edit-button"
                  >
                    Edit
                  </span>
                </div>
              </div>

              <div className="sections-akash">
                <div className={`section ${darkMode ? "dark" : "light"}`}>
                  <div>
                    <h3>Environment Variables</h3>

                    <p>
                      {Object.keys(env).length === 0 ? (
                        "None"
                      ) : (
                        <div>
                          {Object.entries(env).map(([key, value]) => (
                            <p key={key}>
                              {key}={value}
                              <button
                                className="add-button3"
                                onClick={() => handleDelete(key)}
                              >
                                Delete
                              </button>
                            </p>
                          ))}
                        </div>
                      )}
                    </p>
                  </div>
                  <span
                    onClick={() => {
                      setShowEnv(true);
                    }}
                    className="edit-button"
                  >
                    Edit
                  </span>
                </div>
                {showEnv && (
                  <EnvModal
                    darkMode={darkMode}
                    onSave={handleShowEnv}
                    onCancel={() => setShowEnv(false)}
                  />
                )}
                {showComm && (
                  <CommModal
                    darkMode={darkMode}
                    onSave={handleSaveCommand}
                    onCancel={() => setShowComm(false)}
                  />
                )}
                <div className={`section ${darkMode ? "dark" : "light"}`}>
                  <div>
                    <h3>Commands</h3>
                    {commands.length === 0 ? (
                      <p>None</p>
                    ) : (
                      commands.map((cmd, index) => (
                        <div key={index}>
                          <h5>
                            {cmd}
                            <button
                              className="add-button3"
                              onClick={() => handleDeleteCommand(index)}
                            >
                              Delete
                            </button>
                          </h5>
                        </div>
                      ))
                    )}
                    {args.length === 0
                      ? ""
                      : args.map((cmd, index) => (
                          <div key={index}>
                            <p>
                              {cmd}
                              <button
                                className="add-button3"
                                onClick={() => handleDeleteArgs(index)}
                              >
                                Delete
                              </button>
                            </p>
                          </div>
                        ))}
                  </div>
                  <span
                    onClick={() => setShowComm(true)}
                    className="edit-button"
                  >
                    Edit
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <AppGeoSelect
          allowedLocations={allowedLocations}
          setAllowedLocations={setAllowedLocations}
          forbiddenLocations={forbiddenLocations}
          setForbiddenLocations={setForbiddenLocations}
          darkMode={darkMode}
        />
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        <button
          className="add-button4"
          onClick={() => {
            handleSummary(true);
          }}
        >
          Continue
        </button>
      </div>

      {summary && (
        <div ref={deployRef}>
          <SummaryAkash
            cpu={cpu}
            ram={memory}
            hdd={ephemeralStorage}
            mode={darkMode}
            name={serviceName}
            setSummary={setSummary}
            setAgree={setAgree}
          />
          <div className="termService">
            <Botonera2 setAgree={setAgree} agree={agree} />
            <h4>I agree with Terms of Service</h4>
          </div>
          <div
            className={
              agree ? "deploy-button-wrapper" : "deploy-button-wrapper-disabled"
            }
          >
            <div className="line-background"></div>
            {isLoading ? (
              <div className="loading-container">
                <LoadingText />
              </div>
            ) : (
              <>
                <button
                  className="deploy-button"
                  onClick={() => {
                    handlePaymentSuccess();
                  }}
                  disabled={isLoading}
                >
                  Deploy
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

      // {showPayment && clientSecret && (
      //   <Elements options={{ clientSecret }} stripe={stripePromise}>
      //     <CheckoutForm
      //       onClick={setShowPayment}
      //       onPaymentSuccess={handlePaymentSuccess}
      //     />
      //   </Elements>
      // )}
      
        // const handleContinue = async () => {
        //   if (!agree) {
        //     return;
        //   }
      
        //   setIsLoading(true);
        //   setError(null);
        //   setShowModal(false);
      
        //   try {
        //     const response = await fetch("/api/create-payment-intent", {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({
        //         amount: appPrice,
        //         currency: "usd",
        //         orderId: orderId,
        //         accessToken: accessToken,
        //       }),
        //     });
      
        //     if (!response.ok) {
        //       throw new Error(`Error: ${response.status} ${response.statusText}`);
        //     }
      
        //     const data = await response.json();
        //     setClientSecret(data.clientSecret);
        //     setShowPayment(true);
        //   } catch (err) {
        //     setError(err.message);
        //   } finally {
        //     setIsLoading(false);
        //   }
        // };