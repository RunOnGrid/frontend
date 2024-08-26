import Image from 'next/image';
import React from 'react';

const GraphsLanding = () => {
  return (
    <div className="graphs-landing">
      <div style={{ display: "flex" }}>
        <div>
          <h3>SOLUTIONS</h3>
          <h1>A fraction of the cost for real privacy</h1>
        </div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </span>
      </div>
      {/* <div style={{ display: 'flex', margin: 'auto', width: '80%' }}>
        <Image alt="" src="/costos.svg" height={400} width={600} />
        <div className="cpu-container">
          <div className="cpu-buttons">
            <button>2vCPU</button>
            <span>8 GB MEMORY / 100 GB STORAGE</span>
          </div>
          <div className="cpu-buttons">
            <button>4vCPU</button>
            <span>16 GB MEMORY / 100 GB STORAGE</span>
          </div>
          <div className="cpu-buttons">
            <button>8vCPU</button>
            <span>32 GB MEMORY / 100 GB STORAGE</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default GraphsLanding;
