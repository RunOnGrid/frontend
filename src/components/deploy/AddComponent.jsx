import React, { useState } from "react";
import SliderComp from "../slider/SliderComp";
import NoBorderSlider from "../slider/NoBorderSlider";

const AddComponent = ({ darkMode, ram, hdd, cpu, setCpu, setRam, setHdd }) => {
  const [customize, setCustomize] = useState(false);
  const handleBeta = () => {
    setCpu(0.5);
    setHdd(20);
    setRam(1000);
    setCustomize(true);
  };
  const handleTest = () => {
    setCpu(2);
    setHdd(20);
    setRam(4000);
    setCustomize(true);
  };

  const handleCustomize = () => {
    setCpu(0.1);
    setHdd(1);
    setRam(100);
    setCustomize(false);
  };

  return (
    <div className="sub-component-container">
      <div className="databaseSelect-title">
        <span>Resources</span>
      </div>
      <div className="options-container">
        <button onClick={() => handleCustomize()} className="add-button">
          Customize
        </button>
        <button
          onClick={() => {
            handleBeta();
          }}
          className="add-button"
        >
          Beta Config
        </button>
        <button
          onClick={() => {
            handleTest();
          }}
          className="add-button"
        >
          Test Config
        </button>
      </div>
      <div className="instance-config">
        <>
          <SliderComp min={3} max={100} initialDuration={3} label="Instances" />

          <div className="akash-sliders">
            <div className="sliders-flux">
              {" "}
              <NoBorderSlider
                label="CPU"
                initialDuration={cpu}
                min={0.1}
                max={15}
                step={0.1}
                onChange={setCpu}
                customize={customize}
              />
              <NoBorderSlider
                label="RAM"
                initialDuration={ram}
                min={100}
                max={59000}
                step={100}
                onChange={setRam}
                customize={customize}
              />
              <NoBorderSlider
                label="SSD"
                initialDuration={hdd}
                min={1}
                max={820}
                step={1}
                onChange={setHdd}
                customize={customize}
              />
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default AddComponent;

{
  /* <div className={`add-component ${darkMode ? "dark" : "light"}`}>
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
        </div> */
}
