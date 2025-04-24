import React, { useState } from "react";

const NetFlux = ({ darkMode,setDomain, domain, port, setPort }) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="sections-akash">
      <h3>Networking</h3>
      <div className={`section ${darkMode ? "dark" : "light"}`}>
        <div className={`card2 ${darkMode ? "dark" : "light"}`}>
          <div className="envInputs">
            <div className="modal-input">
              <label>Protocol</label>
              <input 
                placeholder="HTTP" 
                disabled 
                style={{ opacity: isEditing ? 1 : 0.5 }}
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
              <label>Domain</label>
              <input 
                value={domain}
                onChange={(e) => setDomain(e.target.value)} 
                disabled={!isEditing}
                style={{ opacity: isEditing ? 1 : 0.5 }}
              />
            </div>

            <div className="modal-input2">
              <button 
                className="add-button3" 
                onClick={handleToggleEdit}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetFlux;