import Image from "next/image";
import React, { useState } from "react";

const DeleteModal = ({ onClick, darkMode, name, onYes, id }) => {
  const handleSave = () => {};

  return (
    <div className={`card3 ${darkMode ? "dark" : "light"}`}>
      <Image
        onClick={() => {
          onClick();
        }}
        alt=""
        src="/close.png"
        width={20}
        height={20}
      />
      <h3>You want to delete {name} deploy? </h3>
      <span></span>
      <div className="botonera-pay-modal">
        <button
          onClick={() => {
            onYes(id);
          }}
        >
          Yes
        </button>
        <button className="no-btn" onClick={() => onClick()}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
