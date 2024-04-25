import Image from 'next/image';
import React from 'react';

const OverviewScreen = () => {
  return (
    <div>
      <div className="notification-screen">
        <h3>Pre-deploy job</h3>

        <button className="overview-button">
          {' '}
          + Add a new Pre-Deploy job{' '}
        </button>
        <div style={{ opacity: '0' }}>.</div>
      </div>

      <div className="overview-screen">
        <h3>Application services</h3>
        <div className="overview-subtitle">
          <Image alt="" src="/web.png" height={20} width={20} />
          <span> nippon</span>
          <Image alt="" src="/delete2.png" height={20} width={20} />
        </div>
        <button className="overview-button"> + Add a new service </button>
        <div style={{ opacity: '0' }}>.</div>
      </div>
      <div className="save-button">
        <button>
          {' '}
          <Image alt="" src="/save.png" height={15} width={15} /> Save
        </button>
      </div>
    </div>
  );
};

export default OverviewScreen;
