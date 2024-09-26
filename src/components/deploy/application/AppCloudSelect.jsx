import Image from "next/image";
import React, { useState } from "react";

const AppCloudSelect = ({ onNext }) => {
  const [selectedCloud, setSelectedCloud] = useState(null);

  const handleCloudSelect = (cloud) => {
    setSelectedCloud(cloud);
    if (selectedCloud) {
      onNext(selectedCloud);
    }
  };

  const handleNext = () => {
    if (selectedCloud) {
      onNext(selectedCloud);
    }
  };

  return (
    <div className="cloudSelect">
      <div style={{ display: "flex" }}>
        <h3>1.</h3>
        <span>Select the cloud of your choice</span>
      </div>
      <div style={{ display: "flex" }}>
        <button
          className={selectedCloud === "flux" ? "fluxSelected" : ""}
          onClick={() => handleCloudSelect("flux")}
        >
          <Image src="/fluxLanding.svg" alt="Flux" height={25} width={100} />
        </button>
        <button
          className={selectedCloud === "akash" ? "akashSelected" : ""}
          onClick={() => handleCloudSelect("akash")}
        >
          <Image src="/akashLanding.svg" alt="Akash" height={25} width={100} />
        </button>
      </div>
    </div>
  );
};

export default AppCloudSelect;