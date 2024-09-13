import { useState } from "react";
import Triangles from "./Triangles";
import Image from "next/image";

const Banner2 = ({ title, subtitle, subtitle2 }) => {
  const [email, setEmail] = useState(""); // Estado para manejar el valor del input
  const [isConfirmed, setIsConfirmed] = useState(false); // Estado para manejar la confirmación

  // Maneja el cambio de valor del input
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Maneja el clic en el botón
  const handleButtonClick = async () => {
    // if (email.trim() !== "") {
    //   setIsConfirmed(true); // Cambia el estado a confirmado si el input no está vacío
    // }
    try {
      await fetch("/api/email-send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="banner-container">
      <div className="textosBanner2">
        <div className="tituloBanner">{title}</div>
        <div className="subtituloBanner">{subtitle}</div>
        <div className="subtituloBanner5">{subtitle2}</div>
        <div className="container-botones2">
          {isConfirmed ? (
            // Muestra el círculo verde con el tick blanco
            <div className="input-circle">
              <Image alt="" src="/check.png" width={30} height={30} />
            </div>
          ) : (
            // Muestra el input y permite escribir
            <input
              type="email"
              placeholder="Email:"
              value={email}
              onChange={handleInputChange}
              className="input-email"
            />
          )}
          <button className="button-landing-5" onClick={handleButtonClick}>
            {isConfirmed ? "THANK YOU" : "GET EARLY ACCESS"}
          </button>
        </div>
      </div>
      <Triangles />
    </div>
  );
};

export default Banner2;
