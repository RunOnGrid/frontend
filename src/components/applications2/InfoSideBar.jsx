import React from "react";

const InfoSideBar = ({ darkMode }) => {
  return (
    <div className={`sidebar ${darkMode ? "dark" : "light"}`}>
      <ul>
        <li>Information</li>
        <li>Events</li>
        <li>Logs</li>
        <li>Team</li>
        <li>Environment</li>
        <li>Metrics</li>
        <li>Update/Renew</li>
      </ul>
    </div>
  );
};

export default InfoSideBar;
