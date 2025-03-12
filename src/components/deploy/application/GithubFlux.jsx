import React, {
  memo,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import BuildSettings from "../BuildSettings";
import { useRouter } from "next/router";
import { useTheme } from "@/ThemeContext";
import Botonera2 from "@/commons/Botonera2";
import Spinner from "@/commons/Spinner";
import SummaryAkash from "../SummaryAkash";
import CommModal from "@/components/CommModal";
import EnvModal from "@/components/EnvModal";
import PortFlux from "@/components/PortFlux";
import PricingPlanFlux from "./PricingPlanFlux";
import { TokenService } from "../../../../tokenHandler";
import Link from "next/link";
import LoadingText from "@/commons/LoaderText";

const GithubFlux = ({ image, databaseName, setInstalled }) => {
  const { darkMode } = useTheme();
  const router = useRouter();

  // Missing state declarations
  const [serviceName, setServiceName] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [memory, setMemory] = useState(256);
  const [cpu, setCpu] = useState(0.1);
  const [ephemeralStorage, setEphemeralStorage] = useState(1);
  const [serviceCount, setServiceCount] = useState(3);
  const [appPrice, setAppPrice] = useState(0);
  const [ports, setPorts] = useState({
    port: 39470,
    accept: [],
    contPorts: [],
  });
  const [showPorts, setShowPorts] = useState(false);
  const [env, setEnv] = useState({});
  const [showEnv, setShowEnv] = useState(false);
  const [commands, setCommands] = useState([]);
  const [args, setArgs] = useState([]);
  const [showComm, setShowComm] = useState(false);
  const [summary, setSummary] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showBuildSettings, setShowBuildSettings] = useState(false);
  const [repoTag, setRepoTag] = useState("");
  const [pat, setPat] = useState("");

  const handleShowConfig = () => {
    setActiveStep(2);
    setShowConfig(true);
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;

    // Expresión regular que solo permite letras y números
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;

    // Verificar si el input cumple con la expresión regular
    if (alphanumericRegex.test(inputValue)) {
      const lowercaseValue = inputValue.toLowerCase();

      // Verificar si el nombre ya existe
      const isNameTaken = existingNames.includes(lowercaseValue);

      // Actualizar el estado del nombre
      setName(lowercaseValue);

      // Manejar el estado de error para nombres existentes
      if (isNameTaken) {
        setErrorMessage2("Este nombre de aplicación ya está en uso");
      } else {
        setErrorMessage2("");
      }
    }
  };
  const handlePat = (e) => {
    setPat(e.target.value);
  };

  const handleSavePort = (portData) => {
    setPorts(portData);
    setShowPorts(false);
  };

  const handleShowEnv = (envData) => {
    setEnv(envData);
    setShowEnv(false);
  };

  const handleDelete = (key) => {
    const newEnv = { ...env };
    delete newEnv[key];
    setEnv(newEnv);
  };

  const handleSaveCommand = (newData) => {
    setCommands((prevCommands) => [...prevCommands, newData.command]);
    setArgs((prevArgs) => [...prevArgs, newData.argument]);

    setShowComm(false);
  };

  const handleDeleteCommand = (index) => {
    setCommands(commands.filter((_, i) => i !== index));
  };

  const handleDeleteArgs = (index) => {
    setArgs(args.filter((_, i) => i !== index));
  };

  const handleSummary = (state) => {
    if (!name.trim()) {
      setErrorMessage2("This field is required.");
      return;
    }
    if (!pat.trim()) {
      setErrorMessage("This field is required.");
      return;
    }
    setErrorMessage("");
    setSummary(true);
    setActiveStep(3);
  };

  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(3);
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
  const [email, setEmail] = useState(null);
  const [repositories, setRepositories] = useState([0, 1]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [owner, setOwner] = useState("");
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const envRef = useRef(null);
  const geolocationRef = useRef(null);
  const serviceRef = useRef(null);
  const summaryRef = useRef(null);

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
    const emailGrid = localStorage.getItem("grid_email");
    setEmail(emailGrid);
    fetchExistingNames();
  }, [email]);

  useEffect(() => {
    const response = TokenService.getTokens();
    setAccessToken(response.tokens.accessToken);
  }, []);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch("/api/repositories-proxy");

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setInstalled(true);
        setRepositories(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setError("Failed to fetch repositories");
      }
    };

    const intervalId = setInterval(() => {
      if (repositories.length === 0) {
        fetchRepositories();
      }
    }, 4000);

    return () => clearInterval(intervalId);
  }, [repositories]);

  useEffect(() => {
    if (activeStep === 2) {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 3) {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 4) {
      envRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 5) {
      serviceRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 6) {
      summaryRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep]);

  useEffect(() => {
    if (repositories.length > 0) {
      setShowBuildSettings(true);
    }
  }, [repositories]);

  const handlePaymentSuccess = async () => {
    setPaymentCompleted(true);
    setShowPayment(false);
    setIsLoading(true);

    try {
      const deploymentConfig = {
        name: name,
        description:
          componentData.description || "Application deployed by Grid",
        compose: [
          {
            name: name,
            description:
              componentData.description || "Application deployed by Grid",
            repotag: repoTag,
            domains: componentData.domains || [""],
            environmentParameters: [""],
            commands: commands || [""],
            containerPorts: ports.contPorts || [""],
            tiered: true,
            secrets: "",
            repoauth: `${owner.toLowerCase()}:${pat}`,
          },
        ],
      };

      const response = await fetch("/api/flux-deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(deploymentConfig),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      router.push("/profile");
    } catch (error) {
      console.error("Deployment error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {repositories.length === 0 && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      {showBuildSettings && (
        <BuildSettings
          repositories={repositories}
          darkMode={darkMode}
          ref={servicesRef}
          setRepoTag={setRepoTag}
          summary={summary}
          setOwner={setOwner}
          owner={owner.toLowerCase()}
          onNext={() => handleShowConfig()}
        />
      )}
      {showConfig && (
        <div className="databaseSelect">
          <div
            ref={servicesRef}
            className={`deployment-config ${summary ? "disabled" : ""}`}
          >
            <h2>Deployment configurations</h2>

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
                <div className="buildpack-selects">
                  <div
                    className={`buildpack-single ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <h3> Service name</h3>
                    {errorMessage2 && (
                      <h3 className="error-message">{errorMessage2}</h3>
                    )}{" "}
                    <div
                      className={`input-container5 ${
                        darkMode ? "dark" : "light"
                      }`}
                    >
                      <input
                        type="text"
                        className={`custom-input ${
                          darkMode ? "dark" : "light"
                        }`}
                        value={name}
                        onChange={handleNameChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`buildpack-single ${darkMode ? "dark" : "light"}`}
                >
                  <h3> Personal Access Token</h3>
                  <Link
                    href={
                      "https://github.com/settings/tokens/new?description=grid%20(pull%20images)&scopes=read:packages"
                    }
                    target="_blank"
                  >
                    <p>Click here to generate it</p>
                  </Link>
                  {errorMessage && (
                    <h3 className="error-message">{errorMessage}</h3>
                  )}{" "}
                  <div
                    className={`input-container5 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={pat}
                      onChange={handlePat}
                      required
                    />
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

                        <p>Cont Ports: {ports.contPorts}</p>
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
            {/* <AppGeoSelect
              allowedLocations={allowedLocations}
              setAllowedLocations={setAllowedLocations}
              forbiddenLocations={forbiddenLocations}
              setForbiddenLocations={setForbiddenLocations}
              darkMode={darkMode}
            /> */}
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
                name={name}
                setSummary={setSummary}
                setAgree={setAgree}
              />
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
      )}
    </div>
  );
};

export default GithubFlux;

// Location and IP handlers
// const handleAllowedLocationsChange = useCallback((locations) => {
//   setAllowedLocations(locations);
// }, []);

// const handleForbiddenLocationsChange = useCallback((locations) => {
//   setForbiddenLocations(locations);
// }, []);

// const handleStaticIp = (boolean) => {
//   setStaticIp(boolean);
// };

// Step completion handler
// const handleCompleteStep = (step) => {
//   setCompletedSteps((prevSteps) => [...prevSteps, step]);
//   setActiveStep(step + 1);
// };

// Tab change handler
// const handleTabChange = (tab) => {
//   setActiveTab(tab);
//   if (tab === "yaml") {
//     setCompletedSteps((prevSteps) => prevSteps.filter((step) => step <= 2));
//     setActiveStep(2);
//     setComponentData({});
//     setAllowedLocations([]);
//     setForbiddenLocations([]);
//     setStaticIp(null);
//     setPrice(0);
//   }
// };

// Payment and deployment handlers
// const handleContinue = async () => {
//   setIsLoading(true);
//   try {
//     const response = await fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ amount: price * 100 }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     setClientSecret(data.clientSecret);
//     setShowPayment(true);
//   } catch (err) {
//     console.error("Payment intent error:", err);
//   } finally {
//     setIsLoading(false);
//   }
// };
