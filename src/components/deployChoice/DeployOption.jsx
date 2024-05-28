import Image from 'next/image';
import React from 'react';

const DeployOption = ({ image, title, text, className }) => {
  return (
    <div className={`deploy-option ${className}`}>
      <Image alt="" src={image} width={350} height={200} />
      <h2>{title}</h2>
      <span>{text}</span>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="deploy-data">
          <h4>Total Nodes</h4>
          <p>12,767</p>
        </div>
        <div className="deploy-data">
          <h4>Total RAM</h4>
          <p>258.27 TB</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="deploy-data">
          <h4>Total Cores</h4>
          <p>101,312</p>
        </div>
        <div className="deploy-data">
          <h4>Total SSD</h4>
          <p>6,746 PT</p>
        </div>
      </div>
      <h5>Countries : 78</h5>
      <button className="button-landing-3">DEPLOY NOW</button>
    </div>
  );
};

export default DeployOption;
