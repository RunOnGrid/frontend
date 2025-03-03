import React, { useState } from "react";

export default function HoverInfo({ text }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="hover-circle-container">
      <div
        className="circleHover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        i
      </div>
      {isHovered && text && (
        <div className="tooltip">
          {text.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
}
