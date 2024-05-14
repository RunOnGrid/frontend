import Image from 'next/image';
import React from 'react';

const InfoLanding = () => {
  return (
    <div className="graphs-landing">
      <div style={{ display: 'flex' }}>
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
      <div style={{ display: 'flex' }}>
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
