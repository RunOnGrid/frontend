import React, { useState } from "react";
import yaml from "js-yaml";

const YamlEditor = () => {
  const initialYaml = `
version: "2.0"
services:
  web:
    image: gridcloud/hello-app:2.0
    expose:
      - port: 8080
        as: 80
        to:
          - global: true
profiles:
  compute:
    web:
      resources:
        cpu:
          units: 1.0
        memory:
          size: 256Mi
        storage:
          size: 256Mi
  placement:
    dcloud:
      pricing:
        web:
          denom: uakt
          amount: 1000
deployment:
  web:
    dcloud:
      profile: web
      count: 1
`;

  const [yamlText, setYamlText] = useState(initialYaml);
  const [error, setError] = useState(null);

  const handleYamlChange = (e) => {
    setYamlText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const jsonData = yaml.load(yamlText);
      // Convert JSON back to YAML for sending
      const yamlString = yaml.dump(jsonData);
      // Parse YAML to JSON to validate it

      // Send the YAML string in a POST request
      const response = await fetch("http://localhost:3000/akash/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain", // Optional, specify the content type
        },
        body: yamlString,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      alert("YAML enviado exitosamente: " + JSON.stringify(result));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Editor YAML</h2>
      <textarea
        rows="20"
        cols="80"
        value={yamlText}
        onChange={handleYamlChange}
        style={{ fontFamily: "monospace", width: "100%" }}
      />
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <button onClick={handleSubmit}>Enviar YAML</button>
    </div>
  );
};

export default YamlEditor;
