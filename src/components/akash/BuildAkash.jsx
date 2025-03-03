import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import EnvModal from "../EnvModal";
import PayModal from "../PayModal";
import CommModal from "../CommModal";
import PortModal from "../PortFlux";
import Select2 from "@/commons/Select2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../stripe/StripeScreen";
import PricingPlanAkash from "../deploy/PricingPlanAkash";
import Botonera2 from "@/commons/Botonera2";
import SummaryAkash from "../deploy/SummaryAkash";
import Select3 from "@/commons/Select3";
import HoverInfo from "@/commons/HoverInfo";
import LoadingText from "@/commons/LoaderText";
import Image from "next/image";
import { TokenService } from "../../../tokenHandler";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function BuildAkash({ darkMode, image }) {
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
  const [env, setEnv] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [ports, setPorts] = useState({
    port: 80,
    as: 80,
    accept: [],
    protocol: "http",
    contPorts: [],
  });
  const [accept, setAccept] = useState("");
  const [memoryUnit, setMemoryUnit] = useState("Mi");
  const [storageUnit, setStorageUnit] = useState("Gi");
  const [persistUnit, setPersistUnit] = useState("Mi");
  const [typeUnit, setTypeUnit] = useState("hdd");
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
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const envRef = useRef(null);
  const [imageURL, setImageURL] = useState("");
  const [orderId, setOrderId] = useState(1);
  const [appPrice, setAppPrice] = useState(0);
  const [accessToken, setAccessToken] = useState("");

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
    setServiceName(`${newName.toLowerCase()}-${uuidv4()}`);
  };
  const handleSummary = (state) => {
    if (!name.trim()) {
      setErrorMessage("This field is required.");
      return;
    }
    if (!imageURL.trim()) {
      setErrorImage("This field is required.");
      return;
    }
    setErrorMessage("");
    setErrorImage("");
    setSummary(true);
    setActiveStep(4);
  };

  const UnitOptions = ["Mb", "Mi", "GB", "Gi", "TB", "Ti"];
  const MemoryUnits = ["hdd", "ssd", "NVMe"];

  const handleStorageUnit = (selectedOption) => {
    setStorageUnit(selectedOption);
  };
  const handlePersistUnit = (selectedOption) => {
    setPersistUnit(selectedOption);
  };
  const handleMemoryUnit = (selectedOption) => {
    setMemoryUnit(selectedOption);
  };
  const handleTypeUnit = (selectedOption) => {
    setTypeUnit(selectedOption);
  };
  const handleDelete = (keyToDelete) => {
    setEnv((prevEnv) => {
      const updatedEnv = { ...prevEnv };
      delete updatedEnv[keyToDelete]; // Elimina el par clave/valor
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

  const cpuText = [
    "The amount of vCPU's required for this workload.",
    "The maximum for a single instance is 384 vCPU's.",
    "The maximum total multiplied by the count of instances is 512 vCPU's.",
  ];
  const memoryText = [
    "The amount of memory required for this workload.",
    "The maximum for a single instance is 512 Gi.",
    "The maximum total multiplied by the count of instances is 1024 Gi.",
  ];
  const ephemeralText = [
    "The amount of ephemeral disk storage required for this workload.",
    "This disk storage is ephemeral, meaning it will be wiped out on every deployment update or provider reboot.",
    "The maximum for a single instance is 32 Ti.",
    "The maximum total multiplied by the count of instances is also 32 Ti",
  ];

  const handleContinue = async () => {
    if (!agree) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowModal(false);

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: appPrice,
          currency: "usd",
          orderId: orderId,
          accessToken: accessToken,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // setClientSecret(data.client_secret);
      // setShowPayment(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    setPaymentCompleted(true);
    setIsLoading(true);

    try {
      let response;
      if (activeTab === "builder") {
        response = await fetch("/api/akash-deploy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            serviceName,
            cpu,
            memory,
            ephemeralStorage,
            serviceCount,
            image: imageURL,
            ports,
            storageUnit,
            memoryUnit,
            commands,
            env,
            accept,
            accessToken,
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

      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
    const tokens = TokenService.getTokens();
    setAccessToken(tokens.tokens.accessToken);
  }, [accessToken]);

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
            {" "}
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
            <PricingPlanAkash
              setMemory={setMemory}
              setMemoryUnit={setMemoryUnit}
              setCpu={setCpu}
              setEphemeralStorage={setEphemeralStorage}
              setStorageUnit={setStorageUnit}
              setServiceCount={setServiceCount}
              mode={darkMode}
              setPrice={setAppPrice}
            />
            {showPorts && (
              <PortModal
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
// {showModal && (
//   <>
//     <PayModal
//       darkMode={darkMode}
//       onClick={() => {
//         setShowModal(false);
//       }}
//       pay={() => {
//         handleContinue();
//       }}
//     />
//   </>
// )}
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
  /* <div className="akash-persistent">
              <h3>Persistent Storage</h3>
              <div className={`slider-group ${darkMode ? "dark" : "light"}`}>
                <input
                  type="range"
                  min="1"
                  max="1024"
                  value={persistentStorage}
                  onChange={(e) =>
                    setPersistentStorage(parseInt(e.target.value))
                  }
                />
                <span>{persistentStorage} </span>
                <Select2
                  options={UnitOptions}
                  onSelect={handlePersistUnit}
                  initialValue={persistUnit}
                />
              </div>
              <div className="checkbox-group">
                <label htmlFor="readonly">Read only</label>
                <input
                  type="checkbox"
                  id="readonly"
                  checked={readOnly}
                  onChange={(e) => setReadOnly(e.target.checked)}
                />
              </div>

              <div className="buildpack-single">
                <h3> Persistent Name</h3>
                <div
                  className={`input-container5 ${darkMode ? "dark" : "light"}`}
                >
                  <input
                    type="text"
                    className={`custom-input ${darkMode ? "dark" : "light"}`}
                    value={persistentName}
                    onChange={(e) => setPersistentName(e.target.value)}
                    required
                    placeholder=""
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="buildpack-single">
                  <h3> Type</h3>
                  <Select2
                    options={MemoryUnits}
                    onSelect={handleTypeUnit}
                    initialValue={typeUnit}
                  />
                </div>

                <div className="buildpack-single">
                  <h3> Mount</h3>
                  <div
                    className={`input-container5 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={mount}
                      onChange={(e) => setMount(e.target.value)}
                      required
                      placeholder="Example: /mnt/data"
                    />
                  </div>
                </div>
              </div>
            </div> */
}
{
  /* <YamlEditor yaml={yaml} onChange={handleYamlChange} /> */
}
// const updateYamlFromBuilder = () => {
//   const exposeSection = ports
//     ? `
//   expose:
//     - port: ${ports.port}
//       as: ${ports.as}${
//         ports.accept.length > 0
//           ? `
//       accept:
//         - ${ports.accept.join("\n          - ")}`
//           : ""
//       }${
//         ports.protocol !== "http"
//           ? `
//       proto: ${ports.protocol}`
//           : ""
//       }
//       to:
//         - global: true`
//     : "";

//   const commandSection =
//     commands.length > 1
//       ? `
//   command:
//     - ${commands.join("\n      - ")}`
//       : "";

//   const argsSection =
//     args.length > 0
//       ? `
//   args:
//     - ${args.join("\n      - ")}`
//       : "";

//   const envSection =
//     Object.keys(env).length > 0
//       ? `
//   env:
//     - ${Object.entries(env)
//       .map(([key, value]) => `${key}=${value}`)
//       .join("\n      - ")}`
//       : "";

//   const newYaml = `---
// version: "2.0"
// services:
// ${serviceName}:
//   image: ${image}${exposeSection}${commandSection}${argsSection}${envSection}
// profiles:
// compute:
//   ${serviceName}:
//     resources:
//       cpu:
//         units:
//           - ${cpu}
//       memory:
//         size: ${memory}${memoryUnit}
//       storage:
//         - size: ${ephemeralStorage}${storageUnit}
// placement:
//   dcloud:
//     pricing:
//       ${serviceName}:
//         denom: uakt
//         amount: 10000
// deployment:
// ${serviceName}:
//   dcloud:
//     profile: ${serviceName}
//     count: ${serviceCount}`;

//   setYaml(newYaml.trim());
// };
//   useEffect(() => {
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
{
  /* <div
className={`buildpack-single ${darkMode ? "dark" : "light"}`}
>
<h3> Instances</h3>
<div
  className={`input-container5 ${
    darkMode ? "dark" : "light"
  }`}
>
  <input
    type="text"
    className={`custom-input ${darkMode ? "dark" : "light"}`}
    value={serviceCount}
    onChange={(e) => {
      const value = e.target.value;
      if (/^\d*\.?\d*$/.test(value)) {
        setServiceCount(value);
      }
    }}
    onBlur={() => {
      if (parseFloat(serviceCount) < 3) {
        setServiceCount("3");
      }
    }}
    required
  />
</div>
</div> */
}

{
  /* <div className="sliders-akash">
                <h3>CPU</h3>
                <div className={`slider-group ${darkMode ? "dark" : "light"}`}>
                  <input
                    type="range"
                    min="0.1"
                    max="384"
                    step="1"
                    value={cpu}
                    onChange={(e) => setCpu(parseFloat(e.target.value))}
                  />
                  <span>{cpu}</span>
                  <HoverInfo text={cpuText} />
                </div>

                <h3>Memory</h3>
                <div className={`slider-group ${darkMode ? "dark" : "light"}`}>
                  <input
                    type="range"
                    min="1"
                    max="5120"
                    step="1"
                    value={memory}
                    onChange={(e) => setMemory(parseInt(e.target.value))}
                  />
                  <span>{memory} </span>
                  <Select2
                    darkMode={darkMode}
                    options={UnitOptions}
                    onSelect={handleMemoryUnit}
                    initialValue={memoryUnit}
                  />
                  <HoverInfo text={memoryText} />
                </div>

                <h3>Ephemeral Storage</h3>
                <div className={`slider-group ${darkMode ? "dark" : "light"}`}>
                  <input
                    type="range"
                    min="1"
                    max="5120"
                    step="1"
                    value={ephemeralStorage}
                    onChange={(e) =>
                      setEphemeralStorage(parseInt(e.target.value))
                    }
                  />
                  <span>{ephemeralStorage} </span>
                  <Select3
                    darkMode={darkMode}
                    options={UnitOptions}
                    onSelect={handleStorageUnit}
                    initialValue={storageUnit}
                  />
                  <HoverInfo text={ephemeralText} />
                </div>
              </div> */
}
