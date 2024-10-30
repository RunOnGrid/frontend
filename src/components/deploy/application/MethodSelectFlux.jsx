import Image from "next/image";
import React, { forwardRef, useState } from "react";
import Buildpack from "../Buildpack";
import BuildSettings from "../BuildSettings";
import Select from "@/commons/Select";
import JsonEditor from "@/components/flux/JsonEditor";

const MethodSelectFlux = forwardRef(
  ({ onNext, darkMode, onClick, value, setImage }, ref) => {
    const [build, setBuild] = useState(false);
    const [build2, setBuild2] = useState(false);
    const [grid, setGrid] = useState(false);
    const [docker, setDocker] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const handleGit = () => {
      setSelectedMethod("git");
      setImage(false);
      setGrid(!grid);
      setDocker(false);
    };
    const handleDocker = () => {
      setSelectedMethod("docker");
      setGrid(false);
      setDocker(true);
      setBuild(false);
      setBuild2(false);
    };
    const handleSelect = (option) => {
      setImage(option);
    };

    return (
      <div ref={ref} className="databaseSelect">
        <div style={{ display: "flex" }}>
          <h3>2.</h3>
          <div className="databaseSelect-title">
            <span>Select a deployment method</span>
            <p>Deploy from a Git repository or a Docker registry</p>
          </div>
        </div>
        <div className="deployMethodBox-container">
          <div
            className={`deployMethodBox ${
              darkMode ? "dark" : "light"
            } disabled`}
          >
            <Image alt="" src="/iconGit.png" height={50} width={50} />
            <h4>Git repository</h4>
            <p>Available soon.</p>
          </div>
          <div
            onClick={handleDocker}
            className={`deployMethodBox ${darkMode ? "dark" : "light"} ${
              selectedMethod === "docker" ? "selected" : ""
            } ${selectedMethod === "git" ? "disabled" : ""}`}
          >
            <Image alt="" src="/dockerIcon.png" height={50} width={50} />
            <h4>Docker repository</h4>
            <p>Deploy a container from an image registry.</p>
          </div>
        </div>
        {grid ? (
          <>
            {" "}
            <span> Build settings</span>
            <p className="span-deploy">Specify your GitHub repository.</p>
            <div className="install-github">
              {" "}
              <Image alt="" src="/github3.png" height={15} width={15} />
              <span onClick={() => setBuild(true)}>
                {build ? "Installed" : "Install the Grid GitHub app"}
              </span>
            </div>
          </>
        ) : (
          ""
        )}
        {docker ? (
          <>
            <span> Image settings</span>
            <p className="span-deploy">Select our whitelisted images URL.</p>
            <Select
              darkMode={darkMode}
              options={["gridcloud/aptos-app:v.1", "gridcloud/hello-app:2.0"]}
              onSelect={handleSelect}
            />
            {/* <div className="input-with-image4">
              <input
                onChange={(e) => setImage(e.target.value)}
                placeholder="Default: gridcloud/aptos-app:v.1"
              />
              <Image alt="" src="/searchLigth.png" height={20} width={20} />
            </div> */}
            <button
              onClick={() => {
                onNext();
              }}
              className="add-button2"
            >
              Continue
            </button>
          </>
        ) : (
          ""
        )}
        {/* {build ? (
          <>
            {" "}
            <BuildSettings
              onClick={() => setBuild2(true)}
              value={build2}
              darkMode={darkMode}
            />{" "}
          </>
        ) : (
          ""
        )}

        {build2 ? (
          <>
            {" "}
            <Buildpack onClick={onNext} darkMode={darkMode} />{" "}
          </>
        ) : (
          ""
        )} */}
      </div>
    );
  }
);
MethodSelectFlux.displayName = "MethodSelectFlux";
export default MethodSelectFlux;
