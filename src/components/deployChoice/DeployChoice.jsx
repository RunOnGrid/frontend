import React, { useEffect } from 'react';
import DeployOption from './DeployOption';

const DeployChoice = () => {
  useEffect(() => {
    const handleScroll = () => {
      const leftCard = document.querySelector('.scroll-in-left');
      const rightCard = document.querySelector('.scroll-in-right');
      const triggerBottom = (window.innerHeight / 5) * 4;

      if (leftCard.getBoundingClientRect().top < triggerBottom) {
        leftCard.classList.add('visible');
      }

      if (rightCard.getBoundingClientRect().top < triggerBottom) {
        rightCard.classList.add('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="deploy-choice">
      <h1>Deploy on the cloud of your choice</h1>
      <span>Access computing with the best providers</span>
      <div style={{ display: 'flex' }}>
        <DeployOption
          className="scroll-in-left"
          image="/fluxLanding.svg"
          title="The largest decentralized computing network"
          text="Discover the freedom of managing a cloud without the need of expertise or DevOps. Even if you're unfamiliar with new decentralized technologies, we make hosting stress-free and accessible for everyone, offering a straightforward and dependable experience in the realm of decentralization."
        />
        <DeployOption
          className="scroll-in-right"
          image="/akashLanding.svg"
          title="Supercloud"
          text="Discover the freedom of managing a cloud without the need of expertise or DevOps. Even if you're unfamiliar with new decentralized technologies, we make hosting stress-free and accessible for everyone, offering a straightforward and dependable experience in the realm of decentralization."
        />
      </div>
    </div>
  );
};

export default DeployChoice;
