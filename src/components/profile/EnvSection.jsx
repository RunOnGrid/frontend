import React from "react";
import EnvActive from "./EnvActive";
import NewEnv from "./NewEnv";

const EnvSection = ({ darkMode }) => {
  return (
    <div className={`envs-section ${darkMode ? "dark" : "light"}`}>
      <div className="section-header">
        <h3> Env Groups</h3>
        <button>Manage</button>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          margin: "auto",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <EnvActive name="GROUP 1" mode={darkMode} />
        <EnvActive name="GROUP 2" mode={darkMode} />
        <EnvActive name="GROUP 3" mode={darkMode} />
        <NewEnv mode={darkMode} />
      </div>
    </div>
  );
};

export default EnvSection;
