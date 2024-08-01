import Image from "next/image";
import React from "react";

const AppMethodSelect = ({ darkMode, value, onClick }) => {
  return (
    <div className="databaseSelect">
      <div style={{ display: "flex" }}>
        <h3>2.</h3>
        <div className="databaseSelect-title">
          <span>Select a deployment method</span>
          <p>Deploy from a Git repository or a Docker registry</p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={`deployMethodBox ${darkMode ? "dark" : "light"}`}>
          <div className="deployMethodBox-title">
            <Image alt="" src="/iconGit.png" height={30} width={30} />
            <h4>Git repository</h4>
          </div>
          <p>Deploy using source from a git repo.</p>
        </div>
        <div className={`deployMethodBox ${darkMode ? "dark" : "light"}`}>
          <div className="deployMethodBox-title">
            <Image alt="" src="/dockerIcon.png" height={30} width={30} />
            <h4>Docker repository</h4>
          </div>
          <p>Deploy a container from an image registry.</p>
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default AppMethodSelect;
