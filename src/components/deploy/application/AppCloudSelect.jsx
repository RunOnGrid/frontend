import Image from "next/image";
import React, { useEffect, useState } from "react";


const AppCloudSelect = ({ onNext, methodReset }) => {
  const [selectedCloud, setSelectedCloud] = useState(null);

  const handleCloudSelect = (cloud) => {
    setSelectedCloud(cloud);
    methodReset();
    if (selectedCloud) {
      onNext(selectedCloud);
    }
  };

  useEffect(() => {
    if (selectedCloud) {
      onNext(selectedCloud);
    }
  }, [selectedCloud]);

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
          <img
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/9057b281-70b7-446b-253e-38a2d7dabf00/public"
            alt="Flux"
            height={25}
            width={100}
          />
        </button>
        <button
          className={selectedCloud === "akash" ? "akashSelected" : ""}
          onClick={() => handleCloudSelect("akash")}
        >
          <img
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/a1957f28-d510-41b8-254a-2188ea92de00/public"
            alt="Akash"
            height={25}
            width={100}
          />
        </button>
      </div>
    </div>
  );
};

export default AppCloudSelect;