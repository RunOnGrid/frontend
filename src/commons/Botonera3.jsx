import React, { useState, useCallback } from "react";

const Botonera3 = ({ titulo, onClick }) => {
  const [isOn, setIsOn] = useState(false);
  const [boolean, setBoolean] = useState(false);

  const toggleSwitch = useCallback(() => {
    setIsOn((prevIsOn) => {
      const newIsOn = !prevIsOn;

      // Use setTimeout to ensure setBoolean runs after setIsOn
      setTimeout(() => {
        setBoolean((prevBoolean) => {
          const newBoolean = !prevBoolean;

          // Use another setTimeout to ensure onClick runs last
          setTimeout(() => {
            onClick(newBoolean);
          }, 0);

          return newBoolean;
        });
      }, 0);

      return newIsOn;
    });
  }, [onClick]);

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
