import Spinner from "@/commons/Spinner";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PricingPlanSelector from "./PricingSelector";

const AddComponent = ({
  darkMode,
  onNext,
  onSaveComponentData,
  price,
  setPrice,
  image,
  existingNames,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [instances, setInstances] = useState(1);
  const [cpu, setCpu] = useState(0.1);
  const [ram, setRam] = useState(128);
  const [hdd, setHdd] = useState(1);
  const [selectedService, setSelectedService] = useState("Web");
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [ports, setPorts] = useState("");
  const [name, setName] = useState("");
  const [existingNames2, setExistingNames2] = useState(existingNames);
  const [isNameTaken, setIsNameTaken] = useState(false);
  const [description, setDescription] = useState("");
  const [domains, setDomains] = useState('[""]');
  const [contPorts, setContPorts] = useState("");
  const [envVariables, setEnvVariables] = useState("[]");
  const [commands, setCommands] = useState("[]");
  const [contData, setContData] = useState("");

  const [error, setError] = useState(null);

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === "" || isNaN(value)) return;
    setter(parseFloat(value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const portArray = ports
      .split(",")
      .map((port) => parseInt(port.trim(), 10))
      .filter((port) => !isNaN(port));

    const contPortArray = contPorts
      .split(",")
      .map((contPort) => parseInt(contPort.trim(), 10))
      .filter((contPort) => !isNaN(contPort));

    const domainsArray = domains
      .slice(1, -1)
      .split(",")
      .map((domain) => domain.trim().replace(/['"]+/g, ""));

    const envsArray = envVariables
      .slice(1, -1)
      .split(",")
      .map((env) => env.trim().replace(/['"]+/g, ""));
    const commandsArray = commands
      .slice(1, -1)
      .split(",")
      .map((comm) => comm.trim().replace(/['"]+/g, ""));

    onSaveComponentData({
      cpu,
      ram,
      hdd,
      name,
      image,
      instances,
      description,
      ports: portArray,
      domains: domainsArray,
      contPorts: contPortArray,
      envVariables: envsArray,
      commands: commandsArray,
    });

    onNext();
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    if (/^[a-zA-Z0-9]*$/.test(newName)) {
      setName(newName);
      if (existingNames2.includes(newName.toLowerCase())) {
        setIsNameTaken(true);
      } else {
        setIsNameTaken(false);
      }
    }
  };
  const handlePortChange = (e) => {
    setPorts(e.target.value);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className={`add-component ${darkMode ? "dark" : "light"}`}>
          <form onSubmit={handleSubmit} className="form">
            <h2>Add a Service</h2>
            <div className="service-type">
              <button
                className={`service-button ${
                  selectedService === "Web" ? "active" : ""
                }`}
                onClick={() => handleServiceSelection("Web")}
              >
                Web
              </button>
            </div>
            <div className="tabs-container">
              <div className="tabs">
                <button
                  type="button"
                  className={`tab-button ${
                    activeTab === "GENERAL" ? "active2" : ""
                  }`}
                  onClick={() => setActiveTab("GENERAL")}
                >
                  GENERAL
                </button>
                <button
                  type="button"
                  className={`tab-button ${
                    activeTab === "CONNECTIVITY" ? "active2" : ""
                  }`}
                  onClick={() => setActiveTab("CONNECTIVITY")}
                >
                  CONNECTIVITY
                </button>
                <button
                  type="button"
                  className={`tab-button ${
                    activeTab === "ENVIRONMENT" ? "active2" : ""
                  }`}
                  onClick={() => setActiveTab("ENVIRONMENT")}
                >
                  ENVIRONMENT
                </button>
              </div>

              {activeTab === "GENERAL" && (
                <>
                  {isNameTaken ? (
                    <label className="error-text"> Name not available </label>
                  ) : (
                    <label>Name this service</label>
                  )}
                  <div
                    className={`input-container3 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                  <label>Description</label>
                  <div
                    className={`input-container3 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {activeTab === "CONNECTIVITY" && (
                <>
                  <label>Ports (comma-separated)</label>
                  <div
                    className={`input-container3 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={ports}
                      onChange={handlePortChange}
                    />
                  </div>

                  <label>Domains</label>
                  <div
                    className={`input-container3 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={domains}
                      onChange={(e) => setDomains(e.target.value)}
                    />
                  </div>
                  <label>Container Ports (comma-separated)</label>
                  <div
                    className={`input-container3 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={contPorts}
                      onChange={(e) => setContPorts(e.target.value)}
                    />
                  </div>
                </>
              )}
              {activeTab === "ENVIRONMENT" && (
                <>
                  <label>Environment Variables</label>
                  <div
                    className={`input-container3 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={envVariables}
                      onChange={(e) => setEnvVariables(e.target.value)}
                    />
                  </div>
                  <label>Commands</label>
                  <div
                    className={`input-container3 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={commands}
                      onChange={(e) => setCommands(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
        <div className="instance-config">
          <>
            <h4>
              INSTANCES:{" "}
              <div className="slider-group">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={instances}
                  onChange={(e) => setInstances(parseInt(e.target.value))}
                />
                <span>{instances}</span>
              </div>
            </h4>
            <h4>RESOURCES:</h4>
            <div className="akash-sliders">
              <div className="sliders-flux">
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

                <h3>RAM</h3>
                <div className="slider-group">
                  <input
                    type="range"
                    min="128"
                    max="1024"
                    step="128"
                    value={ram}
                    onChange={(e) => setRam(parseInt(e.target.value))}
                  />
                  <span>{ram} Mi</span>
                </div>

                <h3>HDD</h3>
                <div className="slider-group">
                  <input
                    type="range"
                    min="1"
                    max="2"
                    step="1"
                    value={hdd}
                    onChange={(e) => setHdd(parseInt(e.target.value))}
                  />
                  <span>{hdd} </span>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
      <PricingPlanSelector
        setInstances={setInstances}
        setCpu={setCpu}
        setRam={setRam}
        setHdd={setHdd}
        mode={darkMode}
      />
      {isNameTaken ? (
        <span className="error-text"> Please select a valid name</span>
      ) : (
        <button className="add-button4" onClick={handleSubmit}>
          Done
        </button>
      )}
    </div>
  );
};

export default AddComponent;
