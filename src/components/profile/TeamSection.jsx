import React from "react";
import TeamActive from "./TeamActive";
import NewTeam from "./NewTeam";

const TeamSection = ({ darkMode }) => {
  return (
    <div className={`teams-section ${darkMode ? "dark" : "light"}`}>
      <div className="section-header">
        <h3> Teams</h3>
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
        <TeamActive name="TEAM 1" mode={darkMode} />
        <TeamActive name="TEAM 2" mode={darkMode} />
        <NewTeam name="TEAM 3" />
      </div>
    </div>
  );
};

export default TeamSection;
