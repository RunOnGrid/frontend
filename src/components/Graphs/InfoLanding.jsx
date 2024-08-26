import Image from 'next/image';
import React, { useEffect } from 'react';

const InfoLanding = () => {
  useEffect(() => {
    const handleScroll = () => {
      const leftCard = document.querySelector('.scroll2-in-left');
      const rightCard = document.querySelector('.scroll2-in-right');
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
    <div className="graphs-landing">
      <div className="scroll2-in-left" style={{ display: "flex" }}>
        <div>
          <h1>Seamlessly transition from any cloud provider</h1>
        </div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui offcia
        </span>
      </div>
      <div className="scroll2-in-right" style={{ display: "flex" }}>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
        <div>
          <h2>Anything that runs on the cloud can be run on Grid</h2>
        </div>
      </div>
      <div className="logos-landing">
        <Image alt="" src="/pythonLogo.png" height={70} width={170} />
        <Image alt="" src="/javascriptLogo.png" height={70} width={80} />
        <Image alt="" src="/mysqlLogo.png" height={70} width={150} />
        <Image alt="" src="/dockerLogo.png" height={70} width={180} />
        <Image alt="" src="/rustLogo.png" height={70} width={160} />
      </div>
    </div>
  );
};

export default InfoLanding;
