import Image from 'next/image';
import React from 'react';

const IntegrationBox = ({ title, image }) => {
  return (
    <div className="integration-container">
      <div style={{ width: '100%', display: 'flex' }}>
        <Image alt="" src={image} width={60} height={60} />
        <button> Connect </button>
      </div>
      <span>{title}</span>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat numquam
        obcaecati
      </p>
    </div>
  );
};

export default IntegrationBox;
