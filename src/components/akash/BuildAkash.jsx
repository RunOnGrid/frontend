import Select from "@/commons/Select";
import React, { useState } from "react";

import { useRouter } from "next/router";
import Spinner from "@/commons/Spinner";
import { v4 as uuidv4 } from "uuid";
import YamlEditor from "./YamlEditor";

export default function BuildAkash({ darkMode, image }) {
  const [deploymentName, setDeploymentName] = useState("");
  const [serviceName, setServiceName] = useState("");
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
  const [builder, setBuilder] = useState(true);
  const [yaml, setYaml] = useState(`
    version: "2.0"
    services:
      service-1:
        image: ""
        expose:
          - port: 8080
            as: 80
            to:
              - global: true
    profiles:
      compute:
        service-1:
          resources:
            cpu:
              units: 0.1
            memory:
              size: 256Mi
            storage:
              size: 256Mi
      placement:
        dcloud:
          pricing:
            service-1:
              denom: uakt
              amount: 10000
    deployment:
      service-1:
        dcloud:
          profile: service-1
          count: 1`);

  const handleYamlChange = (newYaml) => {
    setYaml(newYaml);
  };
  const router = useRouter();

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setServiceName(`${newName}-${uuidv4()}`);
  };

  const handleContinue = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (activeTab === "builder") {
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
      }
      router.push("/applications");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="deployment-config">
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
                <span>{memory} Mi</span>
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
                <span>{ephemeralStorage} Mi</span>
              </div>
            </div>
            <div className="sections-akash">
              <div className="section">
                <div>
                  <h3>Environment Variables</h3>
                  <p>None</p>
                </div>
                <span className="edit-button">Edit</span>
              </div>

              <div className="section">
                <div>
                  <h3>Commands</h3>
                  <p>None</p>
                </div>
                <span className="edit-button">Edit</span>
              </div>
            </div>
          </div>
          <div className="second-akash">
            <div className="akash-expose">
              <div className="section2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3>Expose</h3>
                  <p>Port: 3000 : 80 (http)</p>
                  <p>Global: True</p>
                  <p>Accept: None</p>
                </div>
                <span className="edit-button">Edit</span>
              </div>
              <div className="buildpack-single">
                <h3> Service count</h3>
                <div
                  className={`input-container5 ${darkMode ? "dark" : "light"}`}
                >
                  <input
                    type="text"
                    className={`custom-input ${darkMode ? "dark" : "light"}`}
                    value={serviceCount}
                    onChange={(e) => setServiceCount(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="akash-persistent">
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
                <span>{persistentStorage} Gi</span>
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
                <h3> Name</h3>
                <div
                  className={`input-container5 ${darkMode ? "dark" : "light"}`}
                >
                  <input
                    type="text"
                    className={`custom-input ${darkMode ? "dark" : "light"}`}
                    value={serviceName}
                    onChange={handleNameChange}
                    required
                    placeholder="Deployment name"
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="buildpack-single">
                  <h3> Type</h3>
                  <Select options={["Select"]} />
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
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      required
                      placeholder="Example: /mnt/data"
                    />
                  </div>
                </div>
              </div>
            </div>
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
          onClick={handleContinue}
          disabled={isLoading}
        >
          Continue
        </button>
      )}
    </div>
  );
}
