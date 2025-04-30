import React, { useState, useRef } from "react";

export default function HoverInfo({ text }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    // Limpiar cualquier timeout existente
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsFading(false);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    // Iniciar la animación de fade out
    setIsFading(true);

    // Establecer un timeout para ocultar el tooltip después de 500ms (duración de la animación)
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setIsFading(false);
    }, 500);
  };

  return (
    <div className="hover-circle-container">
      <div
        className={`circleHover ${isVisible ? "hovered" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        i
      </div>
      {isVisible && text && (
        <div
          className={`tooltip ${isFading ? "fade-out" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {text.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
}
