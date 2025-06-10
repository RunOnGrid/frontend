import Image from "next/image";
import React, { useState } from "react";

const DeleteModal = ({ onClick, darkMode, name, onYes, id }) => {
  

  return (
    <div className={`card4 ${darkMode ? "dark" : "light"}`}>
      <Image
        onClick={() => {
          onClick();
        }}
        alt=""
        src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/6897d36a-e5cf-47c8-8459-5c9d61863300/public"
        width={20}
        height={20}
      />
      <h3>You want to delete {name} deploy? </h3>
      <span></span>
      <div className="botonera-pay-modal">
        <button
          className="no-btn"
          onClick={() => {
            onYes(id);
          }}
        >
          Yes
        </button>
        <button className="neutro-btn" onClick={() => onClick()}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
