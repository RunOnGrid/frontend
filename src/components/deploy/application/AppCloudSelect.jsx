import Image from "next/image";
import React, { useState } from "react";

const AppCloudSelect = ({ onNext }) => {
  const [flux, setFlux] = useState(false);
  const [akash, setAkash] = useState(false);

  const handleFlux = () => {
    setFlux(true);
    setAkash(false);
  };
  const handleAkash = () => {
    setFlux(false);
    setAkash(true);
  };
  return (
    <div className="cloudSelect">
      <div style={{ display: "flex" }}>
        <h3>1.</h3>
        <span>Select the cloud of your choice</span>
      </div>
      <div style={{ display: "flex" }}>
        <button className={flux ? "fluxSelected" : ""} onClick={onNext}>
          <Image
            onClick={() => handleFlux()}
            src="/fluxLanding.svg"
            alt=""
            height={25}
            width={100}
          />
        </button>
        <button className={akash ? "akashSelected" : ""} onClick={onNext}>
          <Image
            onClick={() => handleAkash()}
            src="/akashLanding.svg"
            alt=""
            height={25}
            width={100}
          />
        </button>
      </div>
    </div>
  );
};

export default AppCloudSelect;
