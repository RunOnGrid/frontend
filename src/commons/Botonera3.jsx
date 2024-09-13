import React, { useState } from "react";

const Botonera3 = ({ titulo }) => {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  return (
    <div className="botonera" style={{ display: "flex" }}>
      <div
        className={`custom-switch ${isOn ? "on" : "off"}`}
        onClick={toggleSwitch}
      >
        <div className="circle"></div>
      </div>
      <span> {titulo} </span>
    </div>
  );
};

export default Botonera3;
