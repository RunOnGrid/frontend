import Image from "next/image";
import React, { useState } from "react";

const PayModal = ({ onClick, pay, darkMode }) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleSave = () => {
    onSave(key, value); // Llamar a la función onSave con la clave y el valor
    setKey(""); // Limpiar los campos después de guardar
    setValue("");
  };

  return (
    <div className={`card2 ${darkMode ? "dark" : "light"}`}>
      <Image
        onClick={() => {
          onClick();
        }}
        alt=""
        src="/close.png"
        width={20}
        height={20}
      />
      <h3>Choose payment method</h3>
      <span>
        Select your preferred payment method to complete the deployment
      </span>
      <div className="botonera-pay-modal">
        <button> Crypto</button>
        <button
          onClick={() => {
            pay();
          }}
        >
          {" "}
          Credit Card
        </button>
      </div>
    </div>
  );
};

export default PayModal;
