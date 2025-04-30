import React, { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { TokenService } from "../../../tokenHandler";
import BuildSettings from "../deploy/BuildSettings";
import DockerSettings from "./DockerSettings";
import AddComponent from "../deploy/AddComponent";
import FluxInputs from "./FluxInputs";
import EnvFlux from "./EnvFlux";
import NetFlux from "./NetFlux";
import ComponentsTable from "./ComponentTable";
import SummaryAkash from "../deploy/SummaryAkash";
import Botonera2 from "@/commons/Botonera2";
import LoadingText from "@/commons/LoaderText";
import Spinner from "@/commons/Spinner";

export default function BuildFlux({ darkMode, selectedCloud, compDuration }) {
  const [activeStep, setActiveStep] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [commands, setCommands] = useState([]);
  const [port, setPort] = useState([8080]);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [repoTag, setRepoTag] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [existingNames, setExistingNames] = useState([]);
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const [envs, setEnvs] = useState([]);
  const [cpu, setCpu] = useState(0.5);
  const [ram, setRam] = useState(100);
  const [hdd, setHdd] = useState(100);
  const [owner, setOwner] = useState("");
  const [pat, setPat] = useState("");
  const [summary, setSummary] = useState(false);
  const [agree, setAgree] = useState(false);
  const [domain, setDomain] = useState([""]);
  const [priv, setPriv] = useState(false);
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [balance, setBalance] = useState(0);
  const [compPrice, setCompPrice] = useState(0);
  const [instances, setInstances] = useState(3);
  const [insufficient, setInsufficient] = useState(false);
  const [fundsError, setFundsError] = useState(true);
  const [priceLoader, setPriceLoader] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   getBalance();
  // }, []);
  const handleSummary = async () => {
    if (!name.trim()) {
      setErrorMessage2("This field is required.");

      return;
    }
    if (priv) {
      if (!pat.trim()) {
        setErrorMessage("This field is required.");

        return;
      }
    }

    const price = await checkPrice();

    if (price) {
      setPriceLoader(false);
      setErrorMessage("");
      setErrorMessage2("");
      setSummary(true);
      setActiveStep(4);
    }
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
      console.error("Error loading existing app names:", err);
    }
  };

  const checkPrice = async () => {
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
          configurationDetails: {
            deploymentDetails: {
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
                  tiered: false,
                  secrets: "",
                  repoauth: "",
                },
              ],
              expire: compDuration,
              instances: instances,
            },
          },
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
  const handlePaymentSuccess = async () => {
    setPaymentCompleted(true);
    setIsLoading(true);
    if (insufficient) {
      setFundsError("Insufficient funds");
      setIsLoading(false);
      return;
    }
    // const portsArray = portsInput ? JSON.parse(portsInput) : '';

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
            tiered: false,
            secrets: "",
            repoauth: "",
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
      setIsLoading(false);
      router.push("/profile");
    } catch (error) {
      console.error("Deployment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    const tokens = TokenService.getTokens();
    setAccessToken(tokens.tokens.accessToken);
    getBalance();
  }, [accessToken]);

  useEffect(() => {
    if (activeStep === 3) {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 4) {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep]);
  return (
    <div ref={servicesRef} className="databaseSelect">
      <div className="components-display">
        <DockerSettings
          repoTag={repoTag}
          setRepoTag={setRepoTag}
          name={name}
          setName={setName}
          darkMode={darkMode}
          owner={owner}
          setOwner={setOwner}
          setPat={setPat}
          pat={pat}
          priv={priv}
          setPriv={setPriv}
          errorMessage2={errorMessage2}
          errorMessage={errorMessage}
          errorMessage3={errorMessage3}
        />
        <AddComponent
          darkMode={darkMode}
          cpu={cpu}
          setCpu={setCpu}
          ram={ram}
          setRam={setRam}
          hdd={hdd}
          setHdd={setHdd}
          setInstances={setInstances}
        />
      </div>

      <>
        <h3> Settings</h3>
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
      {/* <ComponentsTable /> */}
      {summary && (
        <div ref={deployRef}>
          <SummaryAkash
            cpu={cpu}
            ram={ram}
            hdd={hdd}
            mode={darkMode}
            name={name}
            setSummary={setSummary}
            setAgree={setAgree}
            price={compPrice}
            setActiveStep={setActiveStep}
            summaryStep={3}
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

{
  /* <AppGeoSelect
          allowedLocations={allowedLocations}
          setAllowedLocations={setAllowedLocations}
          forbiddenLocations={forbiddenLocations}
          setForbiddenLocations={setForbiddenLocations}
          darkMode={darkMode}
        /> */
}

// {summary && (
//   <div ref={deployRef}>
//     <SummaryAkash
//       cpu={cpu}
//       ram={memory}
//       hdd={ephemeralStorage}
//       mode={darkMode}
//       name={name}
//       setSummary={setSummary}
//       setAgree={setAgree}
//     />
//     <div className="termService">
//       <Botonera2 setAgree={setAgree} agree={agree} />
//       <h4>I agree with Terms of Service</h4>
//     </div>
//     <div
//       className={
//         agree ? "deploy-button-wrapper" : "deploy-button-wrapper-disabled"
//       }
//     >
//       <div className="line-background"></div>
//       {isLoading ? (
//         <Spinner />
//       ) : (
//         <>
//           <button
//             className="deploy-button"
//             onClick={() => {
//               handlePaymentSuccess();
//             }}
//             disabled={isLoading}
//           >
//             Deploy
//           </button>
//         </>
//       )}
//     </div>
//   </div>
// )}

{
  /* <div
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
            {errorMessage && (
              <h3 className="error-message">{errorMessage}</h3>
            )}{" "}
            <div className={`input-with-image4 ${darkMode ? "dark" : "light"}`}>
              <input
                onChange={(e) => setImageURL(e.target.value)}
                value={imageURL}
                placeholder="ex: gridcloud/hello-app:1.0"
              />
              <Image alt="" src="/searchLigth.png" height={20} width={20} />
            </div>
            <div className="buildpack-selects">
              <div
                className={`buildpack-single ${darkMode ? "dark" : "light"}`}
              >
                <h3> Service name</h3>
                {errorMessage2 && (
                  <h3 className="error-message">{errorMessage2}</h3>
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

                    <p>Cont Ports:{ports.contPorts}</p>
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

                    <div>
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
                    </div>
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
            handleSummary(true);
          }}
        >
          Continue
        </button>
      </div> */
}
