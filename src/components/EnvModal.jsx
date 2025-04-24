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
      <div className="envInputs">
        <div className="modal-input">
          <label>Key</label>
          <input value={key} onChange={(e) => setKey(e.target.value)} />
        </div>

        <div className="modal-input">
          <label>Value</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className="modal-input2">
          <button className="add-button2"> Add +</button>
        </div>
      </div>
    </div>
  );
};

export default EnvModal;