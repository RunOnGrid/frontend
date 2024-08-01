import React, { useState } from "react";

const AddComponent = ({ darkMode }) => {
  const [serviceName, setServiceName] = useState("");
  const [instances, setInstances] = useState(3);
  const [cpu, setCpu] = useState(48);
  const [ram, setRam] = useState(3);
  const [ssd, setSsd] = useState(3);
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("GENERAL");

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  return (
    <div style={{ display: "flex" }}>
      <div className={`add-component ${darkMode ? "dark" : "light"}`}>
        <div className="form">
          <h2>Add a component</h2>
          <div className="service-type">
            <button
              className={`service-button ${
                selectedService === "Web" ? "active" : ""
              }`}
              onClick={() => handleServiceSelection("Web")}
            >
              Web
            </button>
            <button
              className={`service-button ${
                selectedService === "Service1" ? "active" : ""
              }`}
              onClick={() => handleServiceSelection("Service1")}
            >
              Service type
            </button>
            <button
              className={`service-button ${
                selectedService === "Service2" ? "active" : ""
              }`}
              onClick={() => handleServiceSelection("Service2")}
            >
              Service type
            </button>
          </div>
          <div className="tabs-container">
            {selectedService && (
              <div className="tabs">
                <button
                  className={`tab-button ${
                    activeTab === "GENERAL" ? "active2" : ""
                  }`}
                  onClick={() => setActiveTab("GENERAL")}
                >
                  GENERAL
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "ADVANCED" ? "active2" : ""
                  }`}
                  onClick={() => setActiveTab("ADVANCED")}
                >
                  ADVANCED
                </button>
              </div>
            )}
            {selectedService && activeTab === "GENERAL" && (
              <>
                <label>Start command</label>
                <div
                  className={`input-container3 ${darkMode ? "dark" : "light"}`}
                >
                  <input
                    type="text"
                    className={`custom-input ${darkMode ? "dark" : "light"}`}
                  />
                </div>
                <label>Ports</label>
                <div
                  className={`input-container3 ${darkMode ? "dark" : "light"}`}
                >
                  <input
                    type="text"
                    className={`custom-input ${darkMode ? "dark" : "light"}`}
                  />
                </div>
              </>
            )}
          </div>

          <label> Name this service</label>
          <div className={`input-container3 ${darkMode ? "dark" : "light"}`}>
            <input
              type="text"
              className={`custom-input ${darkMode ? "dark" : "light"}`}
            />
          </div>
          <button className="add-button">+ Add</button>
        </div>
      </div>
      <div className="instance-config">
        <h4>INSTANCE</h4>
        <div className="instance-buttons">
          <button className="customize-button">Customize</button>
          <button className="customize-button">
            Use recommended configuration
          </button>
        </div>
        <h4>INSTANCES: 3 </h4>
        <div className="ranges3">
          <input type="range" name="range1" min="100" max="1000" step="50" />
        </div>
        <h4>RESOURCES:</h4>
        <div className="ranges3">
          <label>
            CPU: <p>100</p>
          </label>
          <input type="range" name="range1" min="100" max="1000" step="50" />
        </div>
        <div className="ranges3">
          <label>
            RAM: <p>100</p>
          </label>
          <input type="range" name="range1" min="100" max="1000" step="50" />
        </div>
        <div className="ranges3">
          <label>
            SSD: <p>100</p>
          </label>
          <input type="range" name="range1" min="100" max="1000" step="50" />
        </div>
        <div className="slider">
          <label>SSD: {ssd}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={ssd}
            onChange={(e) => setSsd(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
