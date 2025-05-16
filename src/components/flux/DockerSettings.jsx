import Select4 from "@/commons/Select4";
import React, { useState } from "react";

const DockerSettings = ({
  darkMode,
  setName,
  name,
  repoTag,
  setRepoTag,
  pat,
  setPat,
  owner,
  setOwner,
  priv,
  setPriv,
  errorMessage2,
  errorMessage,
  errorMessage3,
  setHost,
  setTiered,
  tiered,
}) => {
  // Estados para los diferentes campos del formulario
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [branch, setBranch] = useState("Github Container Registry - ghcr.io");

  // Manejadores de eventos para los cambios en los inputs
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setRepoTag(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setOwner(e.target.value);
  };

  const handleTokenChange = (e) => {
    setPat(e.target.value);
  };

  const handleBranch = (selected) => {
    setBranch(selected);
    setPat("");
    setOwner("");
    if (selected === "Github Container Registry - ghcr.io") {
      setHost("ghcr.io");
    } else {
      setHost("docker.io");
    }
  };

  const handlePriv = () => {
    setPriv(!priv);
    setTiered(!tiered);
    setPat("");
    setOwner("");
  };

  // Determina qué título mostrar para el segundo campo (PAT o Password)
  const getSecondFieldTitle = () => {
    return branch === "Github Container Registry - ghcr.io"
      ? "Personal Access Token"
      : "Password";
  };

  return (
    <div className={`sub-component-container ${darkMode ? "dark" : "light"}`}>
      <div className="buildpack-selects">
        <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
          <h3>Service name</h3>
          {errorMessage2 && (
            <h3 className="error-message">{errorMessage2}</h3>
          )}{" "}
          <div className={`input-container5 ${darkMode ? "dark" : "light"}`}>
            <input
              type="text"
              className={`custom-input ${darkMode ? "dark" : "light"}`}
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
        </div>
        <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
          <div style={{ display: "flex" }}>
            <h3>Docker Image / OS</h3>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="readonly"
                onChange={() => handlePriv()}
              />
              <h3 htmlFor="readonly">Private</h3>
            </div>
          </div>
          {errorMessage3 && <h3 className="error-message">{errorMessage3}</h3>}{" "}
          <div className={`input-container5 ${darkMode ? "dark" : "light"}`}>
            <input
              type="text"
              className={`custom-input ${darkMode ? "dark" : "light"}`}
              value={repoTag}
              onChange={handleImageChange}
              required
            />
          </div>
          {priv ? (
            <>
              <div
                className={`buildpack-single ${darkMode ? "dark" : "light"}`}
              >
                <h3>Host</h3>
                <Select4
                  options={[
                    "Github Container Registry - ghcr.io",
                    "Docker Hub - docker.io",
                  ]}
                  onSelect={handleBranch}
                />
              </div>
              <div
                className={`buildpack-single ${darkMode ? "dark" : "light"}`}
              >
                <h3>Username</h3>
                {errorMessage && (
                  <h3 className="error-message">{errorMessage}</h3>
                )}
                <div
                  className={`input-container5 ${darkMode ? "dark" : "light"}`}
                >
                  <input
                    type="text"
                    className={`custom-input ${darkMode ? "dark" : "light"}`}
                    value={owner}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div
                  className={`buildpack-single ${darkMode ? "dark" : "light"}`}
                >
                  <h3>{getSecondFieldTitle()}</h3>
                  {errorMessage2 && (
                    <h3 className="error-message">{errorMessage2}</h3>
                  )}{" "}
                  <div
                    className={`input-container5 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={pat}
                      onChange={handleTokenChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default DockerSettings;