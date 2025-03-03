import Image from "next/image";
import Link from "next/link";
import React from "react";

const InstallTemplates = ({onNext, darkMode}) => {
  return (
    <div>
      <button onClick={onNext} className="add-button4">
        Continue
      </button>
    </div>
  );
};

export default InstallTemplates;
