import Image from "next/image";
import React from "react";

const AppCloudSelect = ({ onNext }) => {
  return (
    <div className="cloudSelect">
      <div style={{ display: "flex" }}>
        <h3>1.</h3>
        <span>Select the cloud of your choice</span>
      </div>
      <div style={{ display: "flex" }}>
        <button onClick={onNext}>
          <Image src="/fluxLanding.svg" alt="" height={25} width={100} />
        </button>
        <button onClick={onNext}>
          <Image src="/akashLanding.svg" alt="" height={25} width={100} />
        </button>
      </div>
    </div>
  );
};

export default AppCloudSelect;
