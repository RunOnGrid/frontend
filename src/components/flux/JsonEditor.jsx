import Spinner from "@/commons/Spinner";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";

const JsonEditor = ({ image, existingNames }) => {
  const [existingNames2, setExistingNames2] = existingNames;
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isNameTaken, setIsNameTaken] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [jsonData, setJsonData] = useState({
    name: "",
    description: "",
    compose: [
      {
        name: "",
        description: "",
        repotag: image,
        domains: [""],
        environmentParameters: [],
        commands: [],
        containerPorts: [8080],
        containerData: "/data",
        cpu: 0.1,
        ram: 128,
        hdd: 1,
        tiered: false,
        secrets: "",
        repoauth: "",
      },
    ],
  });
  const router = useRouter();
  const validateName = (name) => {
    if (!/^[a-zA-Z0-9]*$/.test(name)) {
      setError("El nombre solo puede contener letras y números.");
      return false;
    }
    if (existingNames.includes(name.toLowerCase())) {
      setIsNameTaken(true);
      setError("Este nombre ya está en uso. Por favor, elige otro.");
      return false;
    }
    setIsNameTaken(false);
    setError(null);
    return true;
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

  const [jsonString, setJsonString] = useState(
    JSON.stringify(jsonData, null, 2)
  );

  const handleChange = (e) => {
    const newJsonString = e.target.value;
    setJsonString(newJsonString);
    try {
      const updatedJson = JSON.parse(newJsonString);
      if (updatedJson.name !== jsonData.name) {
        if (!validateName(updatedJson.name)) {
          return;
        }
      }
      setJsonData(updatedJson);
    } catch (err) {
      setError("JSON inválido: " + err.message);
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);

    try {
      const deploymentConfig = {
        jsonData,
      };

      const response = await fetch("/api/flux-deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deploymentConfig.jsonData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.name && data.uri) {
        localStorage.setItem("DeploymentName", data.name);
        localStorage.setItem("DeploymentUri", data.uri);
        localStorage.setItem("DeploymentDate", currentDate);
      }

      router.push("/applications");
    } catch (error) {
      console.error("Error durante el despliegue:", error);
    } finally {
      setIsDeploying(false);
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
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      {isNameTaken && <label className="error-text2">Name not available</label>}
      <div className="json-editor">
        <textarea value={jsonString} onChange={handleChange} />
      </div>
      {isNameTaken ? (
        ""
      ) : (
        <>
          {isDeploying ? (
            <Spinner />
          ) : (
            <button onClick={() => handleDeploy()} className="continue2-button">
              {" "}
              Deploy
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default JsonEditor;
