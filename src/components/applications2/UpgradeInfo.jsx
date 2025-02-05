import React from "react";

const UpgradeInfo = ({ darkMode }) => {
  return (
    <div className={`main-content2 ${darkMode ? "dark" : "light"}`}>
      <div className="upgrade-info">
        <h4>Application name</h4>
        <div className="upgrade-container">
          <div className={`upgradeDiv ${darkMode ? "dark" : "light"}`}>
            <ul>
              <li>
                {" "}
                <span className="status active">
                  {" "}
                  <div className="circle3"></div>ACTIVE
                </span>
              </li>
              <li>
                <div style={{ display: "flex" }}>
                  <h4>STANDARD</h4>{" "}
                  <p>256 MB (RAM) - 0.1 CPU - 1 GB (STORAGE) - 3 INSTANCES</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div className="noti-buttons2">
              <button className="noti-button2">Upgrade</button>
              <button className="noti-button1">Renew</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeInfo;
