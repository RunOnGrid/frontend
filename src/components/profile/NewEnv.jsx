import Image from 'next/image';
import React from 'react';

const NewEnv = ({ name, quantity, mode }) => {
  return <div className={`newEnv-container ${mode ? 'dark' : 'light'}`}>+</div>;
};

export default NewEnv;
