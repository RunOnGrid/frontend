import Select from "@/commons/Select";
import React from "react";

const General = ({ darkMode }) => {
  return (
    <div className={`main-content ${darkMode ? "dark" : "light"}`}>
      <div className="general">
        <h3>General</h3>
        <div className="general-item">
          <label>Name</label>
          <input type="text" placeholder="grid-application" />
          <span className="edit-icon">✏️</span>
        </div>
        <div className="general-item">
          <label>Created</label>
          <span>12/03/2025 17:23:54</span>
        </div>
        <div className="general-item">
          <label>Status</label>
          <span className="status pending">
            {" "}
            <div className="circle5"></div>Pending Transaction
          </span>
        </div>
        <div className="general-item">
          <label>Allowed geolocations</label>
          <span>NORTH AMERICA - SOUTH AMERICA - EUROPE</span>
        </div>
        <div className="general-item">
          <label>Forbidden geolocations</label>
          <span>None</span>
        </div>
        <div className="general-item">
          <label>Instance type</label>
          <button style={{ display: "flex" }}>
            <h4>STANDARD</h4> 256 MB (RAM) - 0.1 CPU - 1 GB (STORAGE) - 3
            INSTANCES
          </button>
          <span className="edit-link">Update</span>
        </div>
        <div className="general-item">
          <label>Read Replica</label>
          <span>None</span>
        </div>
        <div className="general-item">
          <label>Build command</label>
          <button>npm run build</button>
          <span className="edit-link">Edit</span>
        </div>
        <div className="general-item">
          <label>Start command</label>
          <button>npm start</button>
          <span className="edit-link">Edit</span>
        </div>
        <div className="general-item">
          <label>Auto-Deploy</label>
          <Select options={["Yes", "No"]} />
        </div>
      </div>
    </div>
  );
};

export default General;
