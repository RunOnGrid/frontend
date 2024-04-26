import Image from 'next/image';
import React from 'react';

const ActivityScreen = () => {
  return (
    <div className="activity-section">
      <div className="activity-ul">
        <div className="circle2"> </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span> Feb 21 </span>
          <span> 4:35 PM </span>
        </div>
      </div>

      <div className="activity-box">
        <div className="activity-titles">
          <Image alt="" src="/cloud.png" height={15} width={15} />
          <p> Application deploy </p>
          <span>
            {' '}
            <Image alt="" src="/clock2.png" height={12} width={12} /> 11s{' '}
          </span>
        </div>

        <div className="activity-status">
          <Image alt="" src="/verify.png" height={12} width={12} />
          <span> Deployed version 1 to 1 service </span>
          <button>
            {' '}
            <Image
              style={{ marginRight: '5px' }}
              alt=""
              src="/rewind.png"
              height={12}
              width={12}
            />{' '}
            Revert to version 1{' '}
          </button>
        </div>

        <div className="activity-details">
          <Image alt="" src="/web.png" height={15} width={15} />
          <span>nippon</span>
          <Image alt="" src="/verify.png" height={12} width={12} />
          <p> DEPLOYED </p>
          <button>
            {' '}
            <Image alt="" src="/webIcon.png" height={10} width={10} /> Logs{' '}
          </button>
          <button>
            {' '}
            <Image
              alt=""
              src="/metric.png"
              height={10}
              width={10}
            /> Metrics{' '}
          </button>
          <button>
            {' '}
            <Image alt="" src="/external.png" height={10} width={10} /> External
            Link{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityScreen;
