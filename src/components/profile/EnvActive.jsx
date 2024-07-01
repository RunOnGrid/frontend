import Image from 'next/image';
import React from 'react';

const EnvActive = ({ name, mode }) => {
  return (
    <div className="EnvActive-container">
      <div className="env-members">
        <div className={`circle-envs ${mode ? 'dark' : 'light'}`}></div>
      </div>
      <span>{name}</span>
    </div>
  );
};

export default EnvActive;
