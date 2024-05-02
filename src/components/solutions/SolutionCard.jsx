import Image from 'next/image';
import React, { useState } from 'react';

const SolutionCard = () => {
  const [selected, setSelected] = useState(0);
  const toggle = (i) => {
    return setSelected(i);
  };
  return (
    <>
      {selected === 0 ? (
        <>
          <div className="solutionCard">
            <div className="solution-texts">
              <h2> Seamlessly transition from any cloud provider </h2>
              <span>
                {' '}
                Grid is designed for businesses that are looking for
                cost-effective cloud solutions and may not have the budget for
                super-scale providers. It offers the simplest path to migrate to
                a decentralized cloud environment
              </span>
            </div>
            <button style={{ marginTop: '28px' }}> Start migrating </button>
            <div className="clickeables-solutions">
              <div
                onClick={() => toggle(0)}
                className={`${selected === 0 ? 'selectedClick' : ''}`}></div>
              <div
                onClick={() => toggle(1)}
                className={`${selected === 1 ? 'selectedClick' : ''}`}></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="solutionCard2">
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2> Anything that runs on the cloud can be run on Grid </h2>
                <span>
                  {' '}
                  Deploy in seconds to runonflux cloud from a Git repo using
                  buildpacks or a dockerfile
                </span>

                <button> Start migrating </button>
              </div>

              <div className="fotos-solutions">
                <Image alt="" src="/dockerLogo.png" width={100} height={45} />
                <Image
                  alt=""
                  src="/javascriptLogo.png"
                  width={100}
                  height={70}
                />
                <Image alt="" src="/mysqlLogo.png" width={100} height={45} />
                <Image alt="" src="/pythonLogo.png" width={100} height={45} />
                <Image alt="" src="/rustLogo.png" width={100} height={45} />
                <Image alt="" src="/solidityLogo.png" width={100} height={45} />
              </div>
            </div>
            <div className="clickeables-solutions">
              <div
                onClick={() => toggle(0)}
                className={`${selected === 0 ? 'selectedClick' : ''}`}></div>
              <div
                onClick={() => toggle(1)}
                className={`${selected === 1 ? 'selectedClick' : ''}`}></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SolutionCard;
