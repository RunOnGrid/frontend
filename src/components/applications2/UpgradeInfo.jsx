import React from "react";

const UpgradeInfo = ({ darkMode }) => {
  return (
    <div className={`main-content ${darkMode ? "dark" : "light"}`}>
      <div className="upgrade-info">
        <h4>Application name</h4>
        <ul>
          <li>
            {" "}
            <span className="status active">
              {" "}
              <div className="circle3"></div>ACTIVE
            </span>
          </li>
          <li>
            <span style={{ display: "flex" }}>
              <h4>STANDARD</h4> 256 MB (RAM) - 0.1 CPU - 1 GB (STORAGE) - 3
              INSTANCES
            </span>
          </li>
        </ul>
        <div>
          <button>Upgrade</button>
          <button>Renew</button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeInfo;
