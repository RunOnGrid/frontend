import React, { useState } from "react";

const Botonera2 = ({ titulo }) => {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  return (
    <div className="botonera" style={{ display: "flex" }}>
      <span> {titulo} </span>
      <div
        className={`custom-switch ${isOn ? "on" : "off"}`}
        onClick={toggleSwitch}
      >
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Botonera2;
