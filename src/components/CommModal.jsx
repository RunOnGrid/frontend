import React, { useState } from "react";

const CommModal = ({ onSave, onCancel }) => {
  const [command, setCommand] = useState("");
  const [argument, setArgument] = useState("");

  const handleSave = () => {
    if (command && argument) {
      onSave({ command, argument });
      setCommand("");
      setArgument("");
    }
  };

  return (
    <div className="card2">
      <h3>Commands</h3>
      <div className="commInputs">
        <div className="modal-input">
          <label>Command</label>
          <input
            placeholder="Example: bash-c"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
        </div>

        <div className="modal-input">
          <label>Arguments</label>
          <textarea
            placeholder="Example: apt-get update; apt-get install -y --no-install-recommends ssh;"
            value={argument}
            onChange={(e) => setArgument(e.target.value)}
          />
        </div>
      </div>
      <div className="botonera-env-modal">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CommModal;
