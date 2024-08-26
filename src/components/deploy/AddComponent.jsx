import React, { useState } from "react";

const AddComponent = ({ darkMode, onNext }) => {
  const [serviceName, setServiceName] = useState("");
  const [instances, setInstances] = useState(3);
  const [cpu, setCpu] = useState(0.1);
  const [ram, setRam] = useState(100);
  const [ssd, setSsd] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [ports, setPorts] = useState("");

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: serviceName,
      description: serviceName, // You might want to add a separate description field
      owner: "1NFtogBvh3e9HdvyLbKxkpxXcskTTGXVyS", // This should probably come from somewhere else
      compose: [
        {
          name: serviceName,
          description: serviceName,
          repotag: "gridcloud/hello-app:2.0", // This should probably be configurable
          ports: ports.split(",").map((port) => parseInt(port.trim())),
          domains: [""],
          environmentParameters: [],
          commands: [],
          containerPorts: [8080], // This should probably be configurable
          containerData: "/data",
          cpu: cpu,
          ram: ram,
          hdd: ssd,
          tiered: false,
          secrets: "",
          repoauth: "",
        },
      ],
    };

    try {
      const response = await fetch("/api/your-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Service added successfully");
        // Handle success (e.g., show a success message, reset form, etc.)
      } else {
        console.error("Failed to add service");
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === "" || isNaN(value)) return;
    setter(parseFloat(value));
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  return (
    <div style={{ display: "flex" }}>
      <div className={`add-component ${darkMode ? "dark" : "light"}`}>
        <form onSubmit={handleSubmit} className="form">
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

            <label>Name this service</label>
            <div className={`input-container3 ${darkMode ? "dark" : "light"}`}>
              <input
                type="text"
                className={`custom-input ${darkMode ? "dark" : "light"}`}
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                required
              />
            </div>
            {activeTab === "GENERAL" && (
              <>
                <label>Ports (comma-separated)</label>
                <div
                  className={`input-container3 ${darkMode ? "dark" : "light"}`}
                >
                  <input
                    type="text"
                    className={`custom-input ${darkMode ? "dark" : "light"}`}
                    value={ports}
                    onChange={(e) => setPorts(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <button className="add-button">+ Add</button>
        </form>
      </div>
      <div className="instance-config">
        <h4>INSTANCE</h4>
        <div className="instance-buttons">
          <button className="customize-button">Customize</button>
          <button className="customize-button">
            Use recommended configuration
          </button>
        </div>
        <h4>
          INSTANCES:{" "}
          <input
            className="number-input"
            type="number"
            value={instances}
            onChange={handleInputChange(setInstances)}
            min="0"
            max="10"
          />{" "}
        </h4>

        <div className="ranges3">
          <input
            type="range"
            min="0"
            max="10"
            value={instances}
            onChange={(e) => setInstances(parseInt(e.target.value))}
          />
        </div>
        <h4>RESOURCES:</h4>
        <label>CPU: </label>
        <input
          className="number-input"
          type="number"
          value={cpu}
          onChange={handleInputChange(setCpu)}
          step="0.1"
          min="0.1"
          max="1"
        />
        <div className="ranges3">
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={cpu}
            onChange={(e) => setCpu(parseFloat(e.target.value))}
          />
        </div>
        <label>RAM: </label>
        <input
          className="number-input"
          type="number"
          value={ram}
          onChange={handleInputChange(setRam)}
          step="100"
          min="100"
          max="1000"
        />
        <div className="ranges3">
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={ram}
            onChange={(e) => setRam(parseInt(e.target.value))}
          />
        </div>
        <label>SSD: </label>
        <input
          className="number-input"
          type="number"
          value={ssd}
          onChange={handleInputChange(setSsd)}
          min="1"
          max="10"
        />
        <div className="ranges3">
          <input
            type="range"
            min="1"
            max="10"
            value={ssd}
            onChange={(e) => setSsd(parseInt(e.target.value))}
          />
        </div>
        <button className="add-button" onClick={onNext}>
          Done
        </button>
      </div>
    </div>
  );
};

export default AddComponent;
