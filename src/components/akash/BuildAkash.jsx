import Select from "@/commons/Select";
import React, { useState } from "react";
import yaml from "js-yaml"; // Asegúrate de que 'js-yaml' esté instalado
import { useRouter } from "next/router";
import Spinner from "@/commons/Spinner";

export default function BuildAkash({ darkMode }) {
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
  const router = useRouter();

  const handleContinue = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/akash-deploy", {
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
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      router.push("/profile/applications");
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
      <div className="buildpack-selects">
        <div className="buildpack-single">
          <h3> Deployment name (optional)</h3>
          <div className={`input-container5 ${darkMode ? "dark" : "light"}`}>
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
          <div className={`input-container5 ${darkMode ? "dark" : "light"}`}>
            <input
              type="text"
              className={`custom-input ${darkMode ? "dark" : "light"}`}
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
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
              onChange={(e) => setEphemeralStorage(parseInt(e.target.value))}
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
            <div className={`input-container5 ${darkMode ? "dark" : "light"}`}>
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
              onChange={(e) => setPersistentStorage(parseInt(e.target.value))}
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
            <div className={`input-container5 ${darkMode ? "dark" : "light"}`}>
              <input
                type="text"
                className={`custom-input ${darkMode ? "dark" : "light"}`}
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                required
                placeholder="Deployment name"
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="buildpack-single">
              <h3> Type</h3>
              <Select
                options={["Buildpack-01", "Buildpack-02", "Buildpack-03"]}
              />
            </div>

            <div className="buildpack-single">
              <h3> Mount</h3>
              <div
                className={`input-container5 ${darkMode ? "dark" : "light"}`}
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
