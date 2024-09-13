import Select from "@/commons/Select";
import Image from "next/image";
import React, { useState } from "react";

const Buildpack = ({ darkMode, value, onClick }) => {
  const [build, setBuild] = useState(false);
  return (
    <div>
      <div className={`add-buildpack ${darkMode ? "dark" : "light"}`}>
        <div className="databaseSelect-title">
          <span>Buildpacks</span>
          <p>Configure buildpack settings.</p>
        </div>

        <div className="buildpack-selects">
          <div className="buildpack-single">
            <span> Build method</span>
            <Select
              options={["Buildpack-01", "Buildpack-02", "Buildpack-03"]}
            />
          </div>
          <div className="buildpack-single">
            <span> Builder</span>
            <Select
              options={["Elixir", "Go", "Node", "Python3", "Ruby", "Rust"]}
            />
          </div>
        </div>
        <h4>Buildpack configuration</h4>
        <span>
          The following buildpacks were detected at your applications root path.
          You can also manually add, remove or re-order buildpacks here
        </span>
        <h4>Selected buildpacks:</h4>
        <div style={{ display: "flex" }}>
          <span className="buildpack-item">
            <div>
              <Image alt="" src="/node-js.png" height={15} width={15} />
              NodeJS
            </div>
            <div>
              <Image alt="" src="/deleteL.png" height={20} width={20} />
            </div>
          </span>
          <button onClick={() => setBuild(!build)} className="add-button">
            {" "}
            + Add buildpacks
          </button>
        </div>
        {build ? (
          <>
            {" "}
            <div className="buildpack-new">
              <div className="buildpacks-available">
                <span>Available buildpacks:</span>
                <span className="buildpack-item2">
                  <div>
                    <Image alt="" src="/node-js.png" height={15} width={15} />
                    NodeJS
                  </div>
                  <div>
                    <Image alt="" src="/plus.png" height={15} width={15} />
                  </div>
                </span>
                <span className="buildpack-item2">
                  <div>
                    <Image alt="" src="/node-js.png" height={15} width={15} />
                    NodeJS
                  </div>
                  <div>
                    <Image alt="" src="/plus.png" height={15} width={15} />
                  </div>
                </span>{" "}
                <span className="buildpack-item2">
                  <div>
                    <Image alt="" src="/node-js.png" height={15} width={15} />
                    NodeJS
                  </div>
                  <div>
                    <Image alt="" src="/plus.png" height={15} width={15} />
                  </div>
                </span>{" "}
                <span className="buildpack-item2">
                  <div>
                    <Image alt="" src="/node-js.png" height={15} width={15} />
                    NodeJS
                  </div>
                  <div>
                    <Image alt="" src="/plus.png" height={15} width={15} />
                  </div>
                </span>
              </div>
              <div className="custom-buildpacks">
                <span>Custom buildpacks:</span>
                <p>
                  You may also add buildpacks by directly providing their Github
                  links or links to ZIP files that contain the buildpack source
                  code.
                </p>
                <span style={{ marginTop: "30px" }}>GitHub or ZIP URL</span>
                <div
                  className={`input-container3 ${darkMode ? "dark" : "light"}`}
                >
                  <input
                    type="text"
                    className={`custom-input ${darkMode ? "dark" : "light"}`}
                    value={value}
                  />
                  <button
                    className={`custom-button ${darkMode ? "dark" : "light"}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <button onClick={onClick} className="add-button2">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Buildpack;
