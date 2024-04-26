import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ComponentCard2 = () => {
  return (
    <div className="ComponentCard">
      <Link href="/profile/project/notifications">
        <div className="first">
          <div className="second">
            <Image alt="" src="/iconNewApp2.png" height={20} width={20} />
            <h3> Grid-Cloud </h3>
            <Image alt="" src="/next.png" height={30} width={30} />
          </div>
          <div style={{ display: 'flex' }}>
            <span>Failed</span>
            <div className="circle4"></div>
          </div>
        </div>
        {/* <div className='second'>
            <Image alt='' src='/iconNewApp2.png' height={20} width={20}/>
            <h3> Grid-Cloud </h3>
            <Image alt='' src='/next.png' height={30} width={30}/>
        </div> */}

        <div className="third">
          <span>
            Type: <p> Static Site</p>{' '}
          </span>
          <span>
            Runtime: <p> 100ms</p>{' '}
          </span>
          <span>
            Region: <p> South America</p>{' '}
          </span>
          <span>
            Status: <p> Error</p>{' '}
          </span>
        </div>
        <div className="fourth">
          <span>
            {' '}
            Last deployed: <p> 4 days ago</p>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ComponentCard2;
