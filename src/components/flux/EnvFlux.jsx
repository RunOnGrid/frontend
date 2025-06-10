import Image from "next/image";
import React, { useState } from "react";

const EnvFlux = ({
  darkMode,
  envs,
  setEnvs
}) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
 

  const handleAddVariable = () => {
    if (key.trim() && value.trim()) {
      // Formato "value=key" como solicitado
      setEnvs([...envs, `${value}=${key}`]);
      // Clear the inputs after adding
      setKey("");
      setValue("");
    }
  };

  const handleDeleteVariable = (index) => {
    const updatedVariables = [...envs];
    updatedVariables.splice(index, 1);
    setEnvs(updatedVariables);
  };

  return (
    <div className="sections-akash">
      <h3>Environment Variables</h3>
      <div className={`section ${darkMode ? "dark" : "light"}`}>
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
              <button className="add-button3" onClick={handleAddVariable}>Add +</button>
            </div>
          </div>
          
          {/* List of saved environment variables */}
        </div>
      </div>
      <div className="env-variables-list">
        {envs.map((envStr, index) => {
          // Separamos la cadena para mostrar
          const [envValue, envKey] = envStr.split('=');
          
          return (
            <div
              key={index}
              className={`env-variable-item ${darkMode ? "dark" : "light"}`}
            >
              <div className="env-variable-content">
                <span>
                  {envKey} = {envValue}
                </span>
              </div>
              <div className="env-variable-actions">
                <Image
                  onClick={() => handleDeleteVariable(index)}
                  alt=""
                  height={18}
                  width={18}
                  src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/46d8f987-0d7b-4e53-775d-8191152ad700/public"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnvFlux;



 {/* <div className={`section ${darkMode ? "dark" : "light"}`}>
        <div>
          <h3>Commands</h3>
          {commands.length === 0 ? (
            <p>None</p>
          ) : (
            commands.map((cmd, index) => (
              <div key={index}>
                <h5>
                  {cmd}
                  <button
                    className="add-button3"
                    onClick={() => handleDeleteCommand(index)}
                  >
                    Delete
                  </button>
                </h5>
              </div>
            ))
          )}
          {args.length === 0
            ? ""
            : args.map((cmd, index) => (
                <div key={index}>
                  <p>
                    {cmd}
                    <button
                      className="add-button3"
                      onClick={() => handleDeleteArgs(index)}
                    >
                      Delete
                    </button>
                  </p>
                </div>
              ))}
        </div>
        <span onClick={() => setShowComm(true)} className="edit-button">
          Edit
        </span>
      </div> */}