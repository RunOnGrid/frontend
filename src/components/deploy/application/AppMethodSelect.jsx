import Image from "next/image";
import React, { forwardRef, useState } from "react";
import Buildpack from "../Buildpack";

const AppMethodSelect = forwardRef(
  ({ onNext, darkMode, onClick, value }, ref) => {
    const [build, setBuild] = useState(false);
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
            onClick={() => setBuild(!build)}
            className={`deployMethodBox ${darkMode ? "dark" : "light"}`}
          >
            <Image alt="" src="/iconGit.png" height={50} width={50} />
            <h4>Git repository</h4>
            <p>Deploy using source from a git repo.</p>
          </div>
          <div className={`deployMethodBox ${darkMode ? "dark" : "light"}`}>
            <Image alt="" src="/dockerIcon.png" height={50} width={50} />
            <h4>Docker repository</h4>
            <p>Deploy a container from an image registry.</p>
          </div>
        </div>
        <span style={{ marginTop: "30px" }}>Application root path</span>
        <div className={`input-container2 ${darkMode ? "dark" : "light"}`}>
          <input
            type="text"
            className={`custom-input ${darkMode ? "dark" : "light"}`}
            value={value}
            onChange={(e) => onClick(e.target.value)}
          />
          <button className={`custom-button ${darkMode ? "dark" : "light"}`}>
            Done
          </button>
        </div>
        {build ? (
          <>
            {" "}
            <Buildpack onClick={onNext} darkMode={darkMode} />{" "}
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
);
AppMethodSelect.displayName = "AppMethodSelect";
export default AppMethodSelect;
