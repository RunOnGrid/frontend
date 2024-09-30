import Spinner from "@/commons/Spinner";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
  const [instances, setInstances] = useState(3);
  const [cpu, setCpu] = useState(0.1);
  const [ram, setRam] = useState(128);
  const [hdd, setHdd] = useState(1);
  const [selectedService, setSelectedService] = useState("Web");
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [ports, setPorts] = useState("");
  const [custom, setCustom] = useState(true);
  const [personalized, setPersonalized] = useState(false);
  const [instance, setInstance] = useState(false);
  const [name, setName] = useState("");
  const [existingNames2, setExistingNames2] = useState(existingNames);
  const [isNameTaken, setIsNameTaken] = useState(false);

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
    // Aquí envías los datos al componente padre
    onSaveComponentData({
      cpu,
      ram,
      hdd,
      name,
      image,
    });
    // Luego llamas a la función para avanzar al siguiente paso
    onNext();
  };

  const handleCustom = () => {
    setCustom(true);
    setPersonalized(false);
    setInstance(true);
  };

  const handlePersonalized = () => {
    setCustom(false);
    setPersonalized(true);
    setInstance(true);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    // Validar que solo contenga letras y números
    if (/^[a-zA-Z0-9]*$/.test(newName)) {
      setName(newName);

      if (existingNames2.includes(newName.toLowerCase())) {
        setIsNameTaken(true);
      } else {
        setIsNameTaken(false);
      }
    }
  };

  return (
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
                className={`tab-button ${
                  activeTab === "GENERAL" ? "active2" : ""
                }`}
                onClick={() => setActiveTab("GENERAL")}
              >
                GENERAL
              </button>
              {/* <button
                className={`tab-button ${
                  activeTab === "ADVANCED" ? "active2" : ""
                }`}
                onClick={() => setActiveTab("ADVANCED")}
              >
                ADVANCED
              </button> */}
            </div>

            {isNameTaken ? (
              <label className="error-text"> Name not available </label>
            ) : (
              <label>Name this service</label>
            )}

            <div className={`input-container3 ${darkMode ? "dark" : "light"}`}>
              <input
                type="text"
                className={`custom-input ${darkMode ? "dark" : "light"}`}
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>

            <label>Ports (comma-separated)</label>
            <div className={`input-container3 ${darkMode ? "dark" : "light"}`}>
              <input
                type="text"
                className={`custom-input ${darkMode ? "dark" : "light"}`}
                value={ports}
                onChange={(e) => setPorts(e.target.value)}
              />
            </div>
            <label>Commands (comma-separated)</label>
            <div className={`input-container3 ${darkMode ? "dark" : "light"}`}>
              <input
                type="text"
                className={`custom-input ${darkMode ? "dark" : "light"}`}
                value={ports}
                onChange={(e) => setPorts(e.target.value)}
              />
            </div>
          </div>

          {/* <button className="add-button" type="submit">
            + Add
          </button> */}
        </form>
      </div>
      <div className="instance-config">
        {/* <div className="instance-buttons">
          <button
            onClick={() => handleCustom()}
            className={`customize-button ${custom ? "active" : ""}`}
          >
            Customize
          </button>
          <button
            onClick={() => handlePersonalized()}
            className="customize-button"
          >
            Use recommended configuration
          </button>
        </div> */}
        {custom ? (
          <>
            {/* <h4>
              INSTANCES:{" "}
              <input
                className="number-input"
                type="number"
                value={instances}
                onChange={handleInputChange(setInstances)}
                min="0"
                max="10"
              />{" "}
            </h4> */}

            {/* <div className="ranges3">
              <input
                type="range"
                min="0"
                max="10"
                value={instances}
                onChange={(e) => setInstances(parseInt(e.target.value))}
              />
            </div> */}
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
            {isNameTaken ? (
              <span className="error-text"> Please select a valid name</span>
            ) : (
              <button className="add-button" onClick={handleSubmit}>
                Done
              </button>
            )}
          </>
        ) : (
          ""
        )}

        {/* {personalized ? (
          <>
            <PricingPlanSelector
              mode={darkMode}
              price={price}
              setPrice={setPrice}
            />
          </>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default AddComponent;
