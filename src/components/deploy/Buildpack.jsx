import Select from "@/commons/Select";
import Image from "next/image";
import React, { forwardRef, useState } from "react";

const Buildpack = forwardRef(({ onNext, darkMode }, ref) => {
  const [build, setBuild] = useState(false);
  return (
    <div ref={ref}>
      <div className={`add-buildpack ${darkMode ? "dark" : "light"}`}>
        <div className="databaseSelect-title">
          <h2>Buildpacks</h2>
          <p>Configure buildpack settings.</p>
        </div>

        <div className="buildpack-selects">
          <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
            <h3> Build method</h3>
            <Select
              options={["Buildpack-01", "Buildpack-02", "Buildpack-03"]}
            />
          </div>
          <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
            <h3> Builder</h3>
            <Select
              options={["Elixir", "Go", "Node", "Python3", "Ruby", "Rust"]}
            />
          </div>
        </div>
        <h2>Buildpack configuration</h2>
        <p>
          The following buildpacks were detected at your applications root path.
          You can also manually add, remove or re-order buildpacks here
        </p>
        <h2>Selected buildpacks:</h2>
        <div style={{ display: "flex", marginBottom: "20px" }}>
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
                <h2>Available buildpacks:</h2>
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
                <h2>Custom buildpacks:</h2>
                <p>
                  You may also add buildpacks by directly providing their Github
                  links or links to ZIP files that contain the buildpack source
                  code.
                </p>
                <div className="items-custom-build">
                  <h2>GitHub or ZIP URL</h2>
                  <div
                    className={`input-container3 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      // value={value}
                    />
                    <button
                      className={`add-button ${darkMode ? "dark" : "light"}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <button onClick={onNext} className="add-button2">
          Continue
        </button>
      </div>
    </div>
  );
});

Buildpack.displayName = "Buildpack";
export default Buildpack;
