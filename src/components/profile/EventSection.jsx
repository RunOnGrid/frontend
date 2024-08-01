import React from "react";

const EventSection = ({ darkMode }) => {
  return (
    <div className={`events-section ${darkMode ? "dark" : "light"}`}>
      <div className="section-header">
        <h3>Events</h3>
        <button>View all</button>
      </div>
      <table className={`events-table ${darkMode ? "dark" : "light"}`}>
        <thead>
          <tr>
            <th>Integration</th>
            <th>Action</th>
            <th>Date/Time</th>
            <th>By</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="githubLogoDark.svg"
                alt=""
                className="integration-logo"
              />{" "}
              GITHUB
            </td>
            <td>Commit - Main Branch</td>
            <td>12/03/2025 17:30</td>
            <td>Benjamin Aguirre (Admin)</td>
          </tr>
          <tr>
            <td>
              <img src="fluxLogoDark.svg" alt="" className="integration-logo" />{" "}
              FLUX
            </td>
            <td>Commit - Main Branch</td>
            <td>12/03/2025 17:30</td>
            <td>Infrastructure</td>
          </tr>
          <tr>
            <td>
              <img
                src="akashLogoDark.svg"
                alt=""
                className="integration-logo"
              />{" "}
              AKASH
            </td>
            <td>Commit - Main Branch</td>
            <td>12/03/2025 17:30</td>
            <td>Infrastructure</td>
          </tr>
          <tr>
            <td>
              <img
                src="githubLogoDark.svg"
                alt=""
                className="integration-logo"
              />{" "}
              GITHUB
            </td>
            <td>Commit - Main Branch</td>
            <td>12/03/2025 17:30</td>
            <td>Benjamin Aguirre (Admin)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventSection;
