import Select from "@/commons/Select";
import Image from "next/image";
import React, { forwardRef, useState } from "react";

const Buildpack = forwardRef(({ onNext, darkMode }, ref) => {
  const [build, setBuild] = useState(false);
  return (
    <div className="databaseSelect" ref={ref}>
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
              <Image
                alt=""
                src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/410ecd45-5520-49ea-6e98-41ae1ad3e100/public"
                height={15}
                width={15}
              />
              NodeJS
            </div>
            <div>
              <Image
                alt=""
                src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/46d8f987-0d7b-4e53-775d-8191152ad700/public"
                height={20}
                width={20}
              />
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
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/8899835a-27b7-478e-a65c-ade47edee900/public"
                      height={15}
                      width={15}
                    />
                    NodeJS
                  </div>
                  <div>
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/723a4807-541c-464a-43b2-390e2a86e800/public"
                      height={15}
                      width={15}
                    />
                  </div>
                </span>
                <span className="buildpack-item2">
                  <div>
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/8899835a-27b7-478e-a65c-ade47edee900/public"
                      height={15}
                      width={15}
                    />
                    NodeJS
                  </div>
                  <div>
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/723a4807-541c-464a-43b2-390e2a86e800/public"
                      height={15}
                      width={15}
                    />
                  </div>
                </span>{" "}
                <span className="buildpack-item2">
                  <div>
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/8899835a-27b7-478e-a65c-ade47edee900/public"
                      height={15}
                      width={15}
                    />
                    NodeJS
                  </div>
                  <div>
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/723a4807-541c-464a-43b2-390e2a86e800/public"
                      height={15}
                      width={15}
                    />
                  </div>
                </span>{" "}
                <span className="buildpack-item2">
                  <div>
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/8899835a-27b7-478e-a65c-ade47edee900/public"
                      height={15}
                      width={15}
                    />
                    NodeJS
                  </div>
                  <div>
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/723a4807-541c-464a-43b2-390e2a86e800/public"
                      height={15}
                      width={15}
                    />
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
