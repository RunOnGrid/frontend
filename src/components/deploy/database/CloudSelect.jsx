import Image from "next/image";
import React from "react";

const CloudSelect = () => {
  return (
    <div className="cloudSelect">
      <div style={{ display: "flex" }}>
        <h3>1.</h3>
        <span>Cloud</span>
      </div>
      <button>
        <Image src="/fluxLanding.svg" alt="" height={25} width={100} />
      </button>
    </div>
  );
};

export default CloudSelect;
