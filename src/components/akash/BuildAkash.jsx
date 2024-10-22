import Select from "@/commons/Select";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Spinner from "@/commons/Spinner";
import { v4 as uuidv4 } from "uuid";
import YamlEditor from "./YamlEditor";
import EnvModal from "../EnvModal";
import PayModal from "../PayModal";
import CommModal from "../CommModal";
import PortModal from "../PortModal";
import Select2 from "@/commons/Select2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../stripe/StripeScreen";
import PricingPlanAkash from "../deploy/PricingPlanAkash";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function BuildAkash({ darkMode, image }) {
  const [deploymentName, setDeploymentName] = useState("");
  const [editingPortIndex, setEditingPortIndex] = useState(null);
  const [serviceName, setServiceName] = useState("service-grid");
  const [cpu, setCpu] = useState(0.5);
  const [memory, setMemory] = useState(512);
  const [ephemeralStorage, setEphemeralStorage] = useState(512);
  const [persistentStorage, setPersistentStorage] = useState(186);
  const [readOnly, setReadOnly] = useState(false);
  const [serviceCount, setServiceCount] = useState(1);
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
    port: 8080,
    as: 80,
    accept: [],
    protocol: "http",
  });
  const [accept, setAccept] = useState("");
  const [mount, setMount] = useState("/mnt/data");
  const [persistStorageName, setPersistStorageName] = useState("");
  const [memoryUnit, setMemoryUnit] = useState("Mi");
  const [storageUnit, setStorageUnit] = useState("Mi");
  const [persistUnit, setPersistUnit] = useState("Mi");
  const [typeUnit, setTypeUnit] = useState("hdd");
  const [showEnv, setShowEnv] = useState(false);
  const [showComm, setShowComm] = useState(false);
  const [showPorts, setShowPorts] = useState(false);
  const [persistentName, setPersistentName] = useState("");
  const [yaml, setYaml] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

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

  const handleContinue = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    setPaymentCompleted(true);
    setShowPayment(false);
    setIsLoading(true);

    try {
      let response;
      if (activeTab === "builder2") {
        response = await fetch("/api/akash-deploy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceName,
            cpu,
            memory,
            ephemeralStorage,
            serviceCount,
            image,
            ports,
            storageUnit,
            memoryUnit,
            commands,
            env,
            accept,
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

      const data = await response.json();

      if (data.name && data.uri) {
        localStorage.setItem("DeploymentName", data.name);
        localStorage.setItem("DeploymentUri", data.uri);
        localStorage.setItem("DeploymentDate", currentDate);
      }
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateYamlFromBuilder = () => {
    const exposeSection = ports
      ? `
    expose:
      - port: ${ports.port}
        as: ${ports.as}${
          ports.accept.length > 0
            ? `
        accept:
          - ${ports.accept.join("\n          - ")}`
            : ""
        }${
          ports.protocol !== "http"
            ? `
        proto: ${ports.protocol}`
            : ""
        }
        to:
          - global: true`
      : "";

    const commandSection =
      commands.length > 1
        ? `
    command:
      - ${commands.join("\n      - ")}`
        : "";

    const argsSection =
      args.length > 0
        ? `
    args:
      - ${args.join("\n      - ")}`
        : "";

    const envSection =
      Object.keys(env).length > 0
        ? `
    env:
      - ${Object.entries(env)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n      - ")}`
        : "";

    const newYaml = `---
version: "2.0"
services:
  ${serviceName}:
    image: ${image}${exposeSection}${commandSection}${argsSection}${envSection}
profiles:
  compute:
    ${serviceName}:
      resources:
        cpu:
          units:
            - ${cpu}
        memory:
          size: ${memory}${memoryUnit}
        storage:
          - size: ${ephemeralStorage}${storageUnit}
  placement:
    dcloud:
      pricing:
        ${serviceName}:
          denom: uakt
          amount: 10000
deployment:
  ${serviceName}:
    dcloud:
      profile: ${serviceName}
      count: ${serviceCount}`;

    setYaml(newYaml.trim());
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
  }, []);
  useEffect(() => {
    updateYamlFromBuilder();
  }, [
    serviceName,
    cpu,
    memory,
    ephemeralStorage,
    serviceCount,
    image,
    ports,
    commands,
    args,
    env,
    memoryUnit,
    storageUnit,
  ]);
  return (
    <div>
      <div className={`deployment-config ${showPayment ? "disabled" : ""}`}>
        <h2>Deployment configuration</h2>

        <p>Configure your deployment settings.</p>
        <div className="billing-tabs">
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
            Yaml
          </div>
        </div>
        {activeTab === "builder" ? (
          <>
            <div className="buildpack-selects">
              <div className="buildpack-single">
                <h3> Deployment name (optional)</h3>
                <div
                  className={`input-container5 ${darkMode ? "dark" : "light"}`}
                >
                  <input
                    type="text"
                    className={`custom-input ${darkMode ? "dark" : "light"}`}
                    value={deploymentName}
                    onChange={(e) => setDeploymentName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="buildpack-single">
                <h3> Service name</h3>
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
            <div className="akash-sliders">
              <div className="sliders-akash">
                <h3>CPU</h3>
                <div className="slider-group">
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={cpu}
                    onChange={(e) => setCpu(parseFloat(e.target.value))}
                  />
                  <span>{cpu}</span>
                </div>

                <h3>Memory</h3>
                <div className="slider-group">
                  <input
                    type="range"
                    min="128"
                    max="1024"
                    step="128"
                    value={memory}
                    onChange={(e) => setMemory(parseInt(e.target.value))}
                  />
                  <span>{memory} </span>
                  <Select2
                    options={UnitOptions}
                    onSelect={handleMemoryUnit}
                    initialValue={memoryUnit}
                  />
                </div>

                <h3>Ephemeral Storage</h3>
                <div className="slider-group">
                  <input
                    type="range"
                    min="128"
                    max="1024"
                    step="128"
                    value={ephemeralStorage}
                    onChange={(e) =>
                      setEphemeralStorage(parseInt(e.target.value))
                    }
                  />
                  <span>{ephemeralStorage} </span>
                  <Select2
                    options={UnitOptions}
                    onSelect={handleStorageUnit}
                    initialValue={storageUnit}
                  />
                </div>
              </div>
              <div className="sections-akash">
                <div className="section">
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
                    onSave={handleShowEnv}
                    onCancel={() => setShowEnv(false)}
                  />
                )}
                {showComm && (
                  <CommModal
                    onSave={handleSaveCommand}
                    onCancel={() => setShowComm(false)}
                  />
                )}
                <div className="section">
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
            {showPorts && (
              <PortModal
                onSave={handleSavePort}
                onCancel={() => setShowPorts(false)}
                initialPort={ports}
              />
            )}
            <div className="second-akash">
              <div className="akash-expose">
                <div className="section2">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>Expose</h3>
                    <p>
                      Port: {ports.port} : {ports.as} ({ports.protocol})
                    </p>
                    <p>Global: True</p>
                    <p>Accept: {ports.accept}</p>
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
                <div className="buildpack-single">
                  <h3> Instances</h3>
                  <div
                    className={`input-container5 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={parseFloat(serviceCount)}
                      onChange={(e) =>
                        setServiceCount(parseFloat(e.target.value))
                      }
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
              />
            </div>
          </>
        ) : (
          <YamlEditor yaml={yaml} onChange={handleYamlChange} />
        )}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {isLoading ? (
          <div className="loading-container">
            <Spinner />
          </div>
        ) : (
          <button
            className="continue-button"
            onClick={() => {
              setShowModal(true);
            }}
            disabled={isLoading || paymentCompleted}
          >
            {paymentCompleted
              ? "Deployment in progress"
              : "Continue to payment"}
          </button>
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
}

{
  /* <div className="akash-persistent">
              <h3>Persistent Storage</h3>
              <div className="slider-group">
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