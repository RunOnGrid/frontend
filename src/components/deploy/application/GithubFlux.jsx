import React, { useEffect, useRef, useState } from "react";
import BuildSettings from "../BuildSettings";
import { useRouter } from "next/router";
import { useTheme } from "@/ThemeContext";
import Botonera2 from "@/commons/Botonera2";
import Spinner from "@/commons/Spinner";
import SummaryAkash from "../SummaryAkash";
import { TokenService } from "../../../../tokenHandler";
import LoadingText from "@/commons/LoaderText";
import FluxInputs from "@/components/flux/FluxInputs";
import EnvFlux from "@/components/flux/EnvFlux";
import NetFlux from "@/components/flux/NetFlux";

const GithubFlux = ({
  image,
  setInstalled,
  setDisableSelect,
  selectedCloud,
  compDuration,
}) => {
  const { darkMode } = useTheme();
  const router = useRouter();

  // Missing state declarations
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [memory, setMemory] = useState(1000);
  const [cpu, setCpu] = useState(0.5);
  const [ram, setRam] = useState(100);
  const [hdd, setHdd] = useState(100);
  const [port, setPort] = useState([8080]);
  const [showEnv, setShowEnv] = useState(false);
  const [commands, setCommands] = useState([]);
  const [summary, setSummary] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showBuildSettings, setShowBuildSettings] = useState(false);
  const [repoTag, setRepoTag] = useState("");
  const [pat, setPat] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [activeTab, setActiveTab] = useState("builder");
  const [domain, setDomain] = useState([""]);
  const [existingNames, setExistingNames] = useState([]);
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [envs, setEnvs] = useState([]);
  const [email, setEmail] = useState(null);
  const [repositories, setRepositories] = useState([0, 1]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [owner, setOwner] = useState("");
  const [balance, setBalance] = useState(0);
  const [insufficient, setInsufficient] = useState(false);
  const [fundsError, setFundsError] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [validatorMsg, setValidatorMsg] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [instances, setInstances] = useState(3);
  const [compPrice, setCompPrice] = useState(0);
  const [priceLoader, setPriceLoader] = useState(false);
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const envRef = useRef(null);
  const serviceRef = useRef(null);
  const summaryRef = useRef(null);

  const imageValidator = async () => {
    try {
      const response = await fetch("/api/image-validator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          username: owner,
          pat: pat,
          imagePath: imagePath.toLowerCase(),
        }),
      });
      if (!response.ok) {
        setImageError(true);
        setError(err.message);
        return false;
      }
      const data = await response.json();
      setValidatorMsg("");
      setImageError(false);

      return true;
    } catch (err) {
      setImageError(true);
      setError(err.message);

      return false;
    }
  };
  const handleSummary = async () => {
    // Modificamos imageValidator para devolver el resultado en lugar de sólo establecer el estado
    const isImageValid = await imageValidator();

    if (!isImageValid) {
      setValidatorMsg("Wrong credentials, please check PAT");
      return;
    }

    if (!name.trim()) {
      setErrorMessage2("This field is required.");
      return;
    }

    if (!pat.trim()) {
      setErrorMessage("This field is required.");
      return;
    }

    if (isImageValid) {
      const price = await checkPrice();
      if (price) {
        setPriceLoader(false);
        setErrorMessage("");
        setErrorMessage2("");
        setSummary(true);
        setActiveStep(5);
        setValidatorMsg("");
        setImageError(false);
      }
    }
  };

  const handleShowConfig = () => {
    setActiveStep(3);
    setShowConfig(true);
  };

  const getBalance = async () => {
    try {
      const response = await fetch(`/api/balance-proxy`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      setBalance(data);
    } catch (err) {
      console.error("Error validating credentials:", err);
    }
  };

  const checkPrice = async () => {
    getBalance();
    setPriceLoader(true);
    const response = await fetch(
      `/api/get-price?cloudProvider=${encodeURIComponent(
        selectedCloud.toUpperCase()
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: name,
          description: "Application deployed by Grid",

          compose: [
            {
              name: name,
              description: "Application deployed by Grid",
              repotag: repoTag,
              ports: [36522],
              domains: domain || [""],
              environmentParameters: envs || [],
              commands: commands || [""],
              containerPorts: port || [""],
              containerData: "/data",
              cpu: cpu,
              ram: ram,
              hdd: hdd,
              tiered: true,
              secrets: "",
              repoauth: `${owner.toLowerCase()}:${pat}`,
            },
          ],
          expire: compDuration,
          instances: instances,
        }),
      }
    );
    const data = await response.json();
    setCompPrice(data.price.toFixed(2));
    if (data.price > balance) {
      setInsufficient(true);
    }

    return true;
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;

    // Expresión regular que solo permite letras y números
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;

    // Verificar si el input cumple con la expresión regular
    if (alphanumericRegex.test(inputValue)) {
      const lowercaseValue = inputValue.toLowerCase();

      const isNameTaken = existingNames.includes(lowercaseValue);

      setName(lowercaseValue);

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
    const tokens = TokenService.getTokens();
    setAccessToken(tokens.tokens.accessToken);
    getBalance();
  }, [accessToken]);

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
    if (activeStep === 1) {
      setActiveStep(2);
    } else if (activeStep === 2) {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 3) {
      envRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 4) {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 5) {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
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
    setIsLoading(true);
    if (insufficient) {
      setFundsError("Insufficient funds");
      setIsLoading(false);
      return;
    }
    try {
      const deploymentConfig = {
        name: name,
        description: "Application deployed by Grid",
        compose: [
          {
            name: name,
            description: "Application deployed by Grid",
            repotag: repoTag,
            domains: domain || [""],
            environmentParameters: envs || [],
            commands: commands || [""],
            containerPorts: port || [""],
            cpu: cpu,
            ram: ram,
            hdd: hdd,
            tiered: true,
            secrets: "",
            repoauth: `${owner.toLowerCase()}:${pat}`,
          },
        ],
        expire: compDuration,
        instances: instances,
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
        <div ref={servicesRef}>
          <BuildSettings
            repositories={repositories}
            darkMode={darkMode}
            setRepoTag={setRepoTag}
            summary={summary}
            setOwner={setOwner}
            owner={owner.toLowerCase()}
            onNext={() => handleShowConfig()}
            setDisableSelect={setDisableSelect}
            existingNames={existingNames}
            image={image}
            setPat={setPat}
            cpu={cpu}
            setCpu={setCpu}
            ram={ram}
            setRam={setRam}
            hdd={hdd}
            setHdd={setHdd}
            setImagePath={setImagePath}
            setInstances={setInstances}
          />
        </div>
      )}
      {showConfig && (
        <div ref={envRef} className="databaseSelect">
          <div className={` ${summary ? "disabled" : ""}`}>
            {/* <h2>Deployment configurations</h2>

            <p>Configure your deployment settings.</p> */}

            {activeTab === "builder" ? (
              <>
                <FluxInputs
                  name={name}
                  handleNameChange={handleNameChange}
                  darkMode={darkMode}
                  errorMessage2={errorMessage2}
                  errorMessage={errorMessage}
                  pat={pat}
                  handlePat={handlePat}
                />
                <div style={{ display: "flex" }}>
                  <EnvFlux darkMode={darkMode} envs={envs} setEnvs={setEnvs} />
                  <NetFlux
                    setPort={setPort}
                    port={port}
                    domain={domain}
                    setDomain={setDomain}
                    darkMode={darkMode}
                  />
                </div>
              </>
            ) : (
              ""
            )}

            {validatorMsg !== "" ? (
              <span className="error-message-login">{validatorMsg}</span>
            ) : (
              ""
            )}
            {priceLoader ? (
              <Spinner />
            ) : (
              <button
                className="add-button4"
                onClick={() => {
                  handleSummary(true);
                }}
              >
                Continue
              </button>
            )}
          </div>

          {summary && (
            <div ref={deployRef}>
              <SummaryAkash
                cpu={cpu}
                ram={memory}
                hdd={hdd}
                mode={darkMode}
                name={name}
                setSummary={setSummary}
                setAgree={setAgree}
                price={compPrice}
                setActiveStep={setActiveStep}
                summaryStep={4}
              />
              <div className="termService">
                <Botonera2 setAgree={setAgree} agree={agree} />
                <h4>I agree with Terms of Service</h4>
              </div>
              {fundsError !== "" ? (
                <h3 className="error-message-login">{fundsError}</h3>
              ) : (
                ""
              )}
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
{
  /* <AppGeoSelect
              allowedLocations={allowedLocations}
              setAllowedLocations={setAllowedLocations}
              forbiddenLocations={forbiddenLocations}
              setForbiddenLocations={setForbiddenLocations}
              darkMode={darkMode}
            /> */
}
{
  /* {showPorts && (
                  <PortFlux
                    darkMode={darkMode}
                    onSave={handleSavePort}
                    onCancel={() => setShowPorts(false)}
                    initialPort={ports}
                  />
                )} */
}
{
  /* <PricingPlanFlux
                  setMemory={setMemory}
                  setCpu={setCpu}
                  setEphemeralStorage={setEphemeralStorage}
                  setServiceCount={setServiceCount}
                  mode={darkMode}
                  setPrice={setAppPrice}
                /> */
}
{
  /* <div className="second-akash">
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
                </div> */
}
