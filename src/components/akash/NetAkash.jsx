import Select4 from "@/commons/Select4";
import React, { useState } from "react";

const NetAkash = ({
  darkMode,
  setDomain,
  domain,
  port,
  setPort,
  as,
  setAs,
  setProtocol
}) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleBranch = (selected) => {
      setProtocol(selected)
    }
 

  return (
    <div className="sections-akash">
      <h3>Networking</h3>
      <div className={`section ${darkMode ? "dark" : "light"}`}>
        <div className={`card2 ${darkMode ? "dark" : "light"}`}>
          <div className="envInputs">
            <div className="modal-input">
              <label>Protocol</label>
              <Select4
                  options={["http","tcp"]}
                  onSelect={handleBranch}
                />
            </div>

            <div className="modal-input">
              <label>Port</label>
              <input
                type="number"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                disabled={!isEditing}
                style={{ opacity: isEditing ? 1 : 0.5 }}
              />
            </div>
            <div className="modal-input">
              <label>As</label>
              <input
                type="number"
                value={as}
                onChange={(e) => setAs(e.target.value)}
                disabled={!isEditing}
                style={{ opacity: isEditing ? 1 : 0.5 }}
              />
            </div>
            <div className="modal-input">
              <label>Domain</label>
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                disabled={!isEditing}
                style={{ opacity: isEditing ? 1 : 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      <button className="add-button4" onClick={handleToggleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default NetAkash;
