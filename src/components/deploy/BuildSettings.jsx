import Select from "@/commons/Select";
import Image from "next/image";
import React, { useState } from "react";

const BuildSettings = ({ darkMode, value, onClick }) => {
  const [build, setBuild] = useState(false);
  return (
    <div>
      <div className={`add-buildpack ${darkMode ? "dark" : "light"}`}>
        <div className="databaseSelect-title">
          <span>Repository Settings</span>
          <p>Specify your GitHub repository.</p>
        </div>

        <div className="buildpack-selects">
          <div className="buildpack-single">
            <span> User</span>
            <span className="buildpack-item">
              <div>
                <Image alt="" src="/githubLogin.png" height={15} width={15} />
                Grid-Client
              </div>
            </span>
          </div>
          <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
            <span> GitHub repository</span>
            <Select
              options={[
                "repository-01/Grid-Client",
                "repository-02/Grid-Client",
                "repository-03/Grid-Client",
              ]}
            />
          </div>
        </div>
        <div className="buildpack-selects">
          <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
            <span> GitHub branch</span>
            <Select options={["Main", "Develop", "Production"]} />
          </div>
          <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
            <span> Application root path</span>

            <div className={`input-container3 ${darkMode ? "dark" : "light"}`}>
              <input
                type="text"
                className={`custom-input ${darkMode ? "dark" : "light"}`}
                placeholder="./"
              />
              <button
                className={`custom-button ${darkMode ? "dark" : "light"}`}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button onClick={onClick} className="add-button2">
          Continue
        </button>
      </div>
    </div>
  );
};

export default BuildSettings;
