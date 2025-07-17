import Link from "next/link";
import React from "react";

const FluxInputs = ({
  errorMessage2,
  name,
  handleNameChange,
  darkMode,
  errorMessage,
  pat,
  handlePat,
}) => {
  return (
    <>
      <div className="buildpack-selects">
        <div className="buildpack-double">
          <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
            <h3> Service name</h3>
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
            <div className="double-label">
              <h3> Personal Access Token</h3>
              <Link
                href={
                  "https://github.com/settings/tokens/new?description=grid%20(pull%20images)&scopes=read:packages"
                }
                target="_blank"
              >
                <p>Click here to generate it</p>
              </Link>
              {errorMessage && (
                <h3 className="error-message">{errorMessage}</h3>
              )}{" "}
            </div>
            <div className={`input-container5 ${darkMode ? "dark" : "light"}`}>
              <input
                type="text"
                className={`custom-input ${darkMode ? "dark" : "light"}`}
                value={pat}
                onChange={handlePat}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FluxInputs;
