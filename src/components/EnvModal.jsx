import React, { useState } from 'react';

const EnvModal = ({ onSave, onCancel, darkMode }) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleSave = () => {
    if (key && value) {
      onSave({ [key]: value });
      setKey("");
      setValue("");
    }
  };

  return (
    <div className={`card2 ${darkMode ? "dark" : "light"}`}>
      <h3>Environment Variable</h3>
      <div className="envInputs">
        <div className="modal-input">
          <label>Key</label>
          <input value={key} onChange={(e) => setKey(e.target.value)} />
        </div>

        <div className="modal-input">
          <label>Value</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
      </div>
      <div className="botonera-env-modal">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EnvModal;