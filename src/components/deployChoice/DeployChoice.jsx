import React from 'react';
import DeployOption from './DeployOption';

const DeployChoice = () => {
  return (
    <div className="deploy-choice">
      <h1>Deploy on the cloud of your choice</h1>
      <span>Access computing with the best providers </span>
      <div style={{ display: 'flex' }}>
        <DeployOption
          image="/fluxLanding.svg"
          title="The largest descentralized computing network"
          text="Discover the freedom of managing a cloud without the need of
            expertise or DevOps. Even if youre unfamiliar with new decentralized
            technologies, we make hosting stress-free and accessible for
            everyone, offering a straightforward and dependable experience in
            the realm of decentralization."
        />
        <DeployOption
          image="/akashLanding.svg"
          title="Supercloud"
          text="Discover the freedom of managing a cloud without the need of
            expertise or DevOps. Even if youre unfamiliar with new decentralized
            technologies, we make hosting stress-free and accessible for
            everyone, offering a straightforward and dependable experience in
            the realm of decentralization."
        />
      </div>
    </div>
  );
};

export default DeployChoice;
