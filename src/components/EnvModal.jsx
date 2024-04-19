import React, { useState } from 'react';

const EnvModal = ({ onSave, onCancel }) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleSave = () => {
    onSave(key, value); // Llamar a la función onSave con la clave y el valor
    setKey(''); // Limpiar los campos después de guardar
    setValue('');
  };

  return (
    <div className="card2">
      <h3>Environment Variable</h3>
      <div className='envInputs'>
        <div style={{ width: '100%' }}>
          <label> Key</label>
          <input value={key} onChange={(e) => setKey(e.target.value)} />
        </div>

        <div style={{ width: '100%' }}>
          <label>Value</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
      </div>
      <div style={{display:'flex'}}>
      <button onClick={handleSave}> Save</button>
      <button onClick={onCancel}> Cancel</button>
      </div>
    </div>
  );
};

export default EnvModal;