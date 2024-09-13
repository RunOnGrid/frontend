import React, { useState } from "react";

const GetAccess = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    // Cambiar el texto de nuevo después de unos segundos (opcional)
    setTimeout(() => {
      setIsClicked(false);
    }, 3000);
  };

  return (
    <button
      className={`access-button ${isClicked ? "thank-you" : ""}`}
      onClick={handleClick}
    >
      {isClicked ? "Thank You" : "Get Early Access"}
    </button>
  );
};

export default GetAccess;
