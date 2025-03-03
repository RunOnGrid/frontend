import React from "react";
import AppActive from "./AppActive";

const AppContainer = ({ darkMode, type }) => {
  return (
    <div className={`applications-section2 ${darkMode ? "dark" : "light"}`}>
      <div className="section-header">
        <h3>{type}</h3>
        <button>View all</button>
      </div>
      <div className="apps-flex">
        <AppActive
          title="App 1"
          state="Active"
          type="Database"
          date="27/06/2024"
          mode={darkMode}
        />
        <AppActive
          title="App 2"
          state="Inactive"
          type="Database"
          date="27/06/2024"
          mode={darkMode}
        />
        <AppActive
          title="App 3"
          state="Renew"
          type="Database"
          date="27/06/2024"
          mode={darkMode}
        />
        <AppActive
          title="App 4"
          state="Active"
          type="Database"
          date="27/06/2024"
          mode={darkMode}
        />
      </div>
    </div>
  );
};

export default AppContainer;
