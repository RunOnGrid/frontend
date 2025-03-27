import React, { useEffect, useRef, useState } from "react";
import BuildSettings from "../BuildSettings";
import { useRouter } from "next/router";
import { useTheme } from "@/ThemeContext";
import Botonera2 from "@/commons/Botonera2";
import SummaryAkash from "../SummaryAkash";
import PricingPlanFlux from "./PricingPlanFlux";
import PortFlux from "@/components/PortFlux";
import EnvModal from "@/components/EnvModal";
import CommModal from "@/components/CommModal";
import Link from "next/link";
import LoadingText from "@/commons/LoaderText";
import { TokenService } from "../../../../tokenHandler";

const GithubAkash = ({
  image,
  databaseName,
  setInstalled,
  setDisableSelect,
}) => {
  const { darkMode } = useTheme();
  const router = useRouter();

  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(3);
  const [cpu, setCpu] = useState(0.5);
  const [memory, setMemory] = useState(1000);
  const [memoryUnit, setMemoryUnit] = useState("Mi");
  const [storageUnit, setStorageUnit] = useState("Gi");
  const [ephemeralStorage, setEphemeralStorage] = useState(40);
  const [serviceCount, setServiceCount] = useState(3);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("builder");
  const [commands, setCommands] = useState([]);
  const [args, setArgs] = useState([]);
  const [env, setEnv] = useState({});
  const [showPorts, setShowPorts] = useState(false);
  const [ports, setPorts] = useState({
    port: 80,
    as: 8080,
    accept: [],
    protocol: "http",
  });
  const [accept, setAccept] = useState("");
  const [showEnv, setShowEnv] = useState(false);
  const [showComm, setShowComm] = useState(false);
  const [yaml, setYaml] = useState("");
  const [summary, setSummary] = useState(false);
  const [agree, setAgree] = useState(false);
  const [repositories, setRepositories] = useState([0, 1]);
  const [repoTag, setRepoTag] = useState("");
  const [owner, setOwner] = useState("");
  const [showConfig, setShowConfig] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [appPrice, setAppPrice] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [pat, setPat] = useState("");
  const servicesRef = useRef(null);
  const deployRef = useRef(null);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };
  
  const handlePat = (e) => {
    setPat(e.target.value);
  };
  
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
    setShowPorts(true);
  };
  
  const handleSavePort = (newPort) => {
    setPorts(newPort);
    setShowPorts(false);
  };
  
  const handleSummary = () => {
    setSummary(true);
    setActiveStep(4);
  };
  
  const handleShowConfig = () => {
    setActiveStep(2);
    setShowConfig(true);
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
    setIsLoading(true);

    try {
      let response;
      if (activeTab === "builder") {
        response = await fetch("/api/akash-deploy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            serviceName: name,
            cpu,
            memory,
            ephemeralStorage,
            serviceCount,
            image: repoTag,
            ports,
            commands,
            env,
            accept,
            pat,
            owner,
            memoryUnit,
            storageUnit
          }),
        });
      } else {
        response = await fetch("/api/akash-deploy-yaml", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            yamlContent: yaml,
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      await response.json();
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
     useEffect(() => {
        const tokens = TokenService.getTokens();
        if (tokens && tokens.tokens && tokens.tokens.accessToken) {
          setAccessToken(tokens.tokens.accessToken);
        }
      }, []);

  useEffect(() => {
    if (activeStep === 2) {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 3) {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep]);

  return (
    <div>
      <BuildSettings
        repositories={repositories}
        darkMode={darkMode}
        ref={servicesRef}
        setRepoTag={setRepoTag}
        summary={summary}
        setOwner={setOwner}
        owner={owner.toLowerCase()}
        onNext={() => handleShowConfig()}
        setDisableSelect={setDisableSelect}
      />
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
                        {ports.contPorts && <p>Cont Ports: {ports.contPorts}</p>}
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

            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <button
              className="add-button4"
              onClick={() => {
                handleSummary();
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

export default GithubAkash;

{
  /* {showPayment && clientSecret && (
          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <CheckoutForm
              onClick={setShowPayment}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </Elements>
        )} */
}

{
  /* {showModal && (
          <>
            <PayModal
              darkMode={darkMode}
              onClick={() => {
                setShowModal(false);
              }}
              pay={() => {
                handleContinue();
              }}
            />
          </>
        )} */
}

{
  /* {isLoading ? (
                <div className="loading-container">
                  <LoadingText />
                </div>
              ) : (
                <>
                  <Link href="/profile/stripe_checkout">
                    <button
                      className="deploy-button"
                      // onClick={() => {
                      //   handleContinue();
                      // }}
                      disabled={isLoading || paymentCompleted}
                    >
                      {paymentCompleted
                        ? "Deployment in progress"
                        : "Continue to payment"}
                    </button>
                  </Link>
                </>
              )} */
}
{
  /* <AppGeoSelect
              allowedLocations={allowedLocations}
              setAllowedLocations={setAllowedLocations}
              forbiddenLocations={forbiddenLocations}
              setForbiddenLocations={setForbiddenLocations}
              darkMode={darkMode}
            /> */
}
//   const updateYamlFromBuilder = () => {
//     const exposeSection = ports
//       ? `
//     expose:
//       - port: ${ports.port}
//         as: ${ports.as}${
//           ports.accept.length > 0
//             ? `
//         accept:
//           - ${ports.accept.join("\n          - ")}`
//             : ""
//         }${
//           ports.protocol !== "http"
//             ? `
//         proto: ${ports.protocol}`
//             : ""
//         }
//         to:
//           - global: true`
//       : "";

//     const commandSection =
//       commands.length > 1
//         ? `
//     command:
//       - ${commands.join("\n      - ")}`
//         : "";

//     const argsSection =
//       args.length > 0
//         ? `
//     args:
//       - ${args.join("\n      - ")}`
//         : "";

//     const envSection =
//       Object.keys(env).length > 0
//         ? `
//     env:
//       - ${Object.entries(env)
//         .map(([key, value]) => `${key}=${value}`)
//         .join("\n      - ")}`
//         : "";

//     const newYaml = `---
// version: "2.0"
// services:
//   ${serviceName}:
//     image: ${image}${exposeSection}${commandSection}${argsSection}${envSection}
// profiles:
//   compute:
//     ${serviceName}:
//       resources:
//         cpu:
//           units:
//             - ${cpu}
//         memory:
//           size: ${memory}${memoryUnit}
//         storage:
//           - size: ${ephemeralStorage}${storageUnit}
//   placement:
//     dcloud:
//       pricing:
//         ${serviceName}:
//           denom: uakt
//           amount: 10000
// deployment:
//   ${serviceName}:
//     dcloud:
//       profile: ${serviceName}
//       count: ${serviceCount}`;

//     setYaml(newYaml.trim());
//   };

  // useEffect(() => {
  //   const formatDate = (date) => {
  //     const options = {
  //       weekday: "short",
  //       year: "numeric",
  //       month: "short",
  //       day: "numeric",
  //     };
  //     return date.toLocaleDateString("en-US", options);
  //   };
  //   setCurrentDate(formatDate(new Date()));
  // }, []);
  // useEffect(() => {
  //   updateYamlFromBuilder();
  // }, [
  //   serviceName,
  //   cpu,
  //   memory,
  //   ephemeralStorage,
  //   serviceCount,
  //   image,
  //   ports,
  //   commands,
  //   args,
  //   env,
  //   memoryUnit,
  //   storageUnit,
  // ]);