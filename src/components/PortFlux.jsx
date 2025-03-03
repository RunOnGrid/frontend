import React, { useState } from "react";

const PortFlux = ({ onSave, onCancel, initialPort, darkMode }) => {
  const [port, setPort] = useState(initialPort?.port);
  const [as, setAs] = useState(initialPort?.as);
  const [accept, setAccept] = useState(initialPort?.accept || []);

  const [contPort, setContPort] = useState(initialPort?.contPorts || "[]");
  const [newAccept, setNewAccept] = useState("");

  const handleSave = () => {
    if (port) {
      onSave({
        port: Number(port),
        accept,
        contPorts: contPort,
      });
    }
  };

  const handleContPort = (e) => {
    e.preventDefault();
    const value = e.target.value;

    // Solo permite números en el input
    if (/^\d*$/.test(value)) {
      setContPort([Number(value)]);
    }
  };
  const handleAddAccept = () => {
    if (newAccept && !accept.includes(newAccept)) {
      setAccept([...accept, newAccept]);
      setNewAccept("");
    }
  };

  const handleDeleteAccept = (index) => {
    setAccept(accept.filter((_, i) => i !== index));
  };

  return (
    <div className={`card2 ${darkMode ? "dark" : "light"}`}>
      <h3>Port Configuration</h3>
      <div className="portInputs">
        <div className="comm-inputs">
          <div className="modal-input">
            <label>Container Ports</label>
            <input value={contPort} onChange={(e) => handleContPort(e)} />
          </div>
        </div>
      </div>
      {/* 
      <div className="accept-ports">
        {accept.map((domain, index) => (
          <div className="urls-cont" key={index}>
            <h4>{domain}</h4>
            <button onClick={() => handleDeleteAccept(index)}>Delete</button>
          </div>
        ))}
        <h3>Accept Domains</h3>
        <div className="add-domains">
          <input
            className="input-url"
            placeholder="example.com"
            value={newAccept}
            onChange={(e) => setNewAccept(e.target.value)}
          />
          <button onClick={handleAddAccept}>+</button>
        </div>
      </div> */}

      <div className="botonera-port-modal">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default PortFlux;
