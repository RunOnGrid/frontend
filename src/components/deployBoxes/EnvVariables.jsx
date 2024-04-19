import Image from 'next/image';
import React, { forwardRef, useState } from 'react';
import EnvModal from '../EnvModal';

const EnvVariables = forwardRef(({ onNextStep }, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [envVariables, setEnvVariables] = useState([]);

  const handleAddBuildpackClick = () => {
    setModalVisible(true);
  };

  const handleSaveEnvVariable = (key, value) => {
    // Actualizar el estado con la nueva variable de entorno
    setEnvVariables([...envVariables, { key, value }]);
    setModalVisible(false)
  };

  return (
    <div>
      
    <div ref={ref}>
      <Image
        style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
        alt=""
        width={25}
        height={25}
        src="/dot.png"
      />
      <div className="envVar-container">
        <h3>
          Environment variables <p>(optional) </p>
        </h3>
        <span>Deploy from a Git repository or a Docker registry.</span>
        <button onClick={handleAddBuildpackClick} className="button-newApp"> + Add row</button>
        <div>
        <h3>Environment Variables:</h3>
        
        <ul className='ul-variable' >
          {envVariables.map((variable, index) => (
            <div className='variable-keys' key={index} >

              <div style={{display:'flex',flexDirection:'column'}}>
              <label> Key</label>
              <span>{variable.key} </span>
              </div>

              <div style={{display:'flex',flexDirection:'column'}}>
              <label> Value </label>
              <span> {variable.value}</span>
              </div>

            </div>
          ))}
        </ul>
      </div>
        <button onClick={() => onNextStep()}> Continue</button>
      </div>
      
    </div>
  
    {modalVisible && <EnvModal onSave={handleSaveEnvVariable} onCancel={() => setModalVisible(false)} />}
    
    </div>
  );
});
EnvVariables.displayName = 'EnvVariables';
export default EnvVariables;
