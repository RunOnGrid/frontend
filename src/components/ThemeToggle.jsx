import { useTheme } from "@/ThemeContext";
import Image from "next/image";
import React from "react";
// Ajusta la ruta según la ubicación de tu archivo ThemeContext

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="theme-container">
      <div className="toggle-mode">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
      <Image
        alt=""
        src={
          darkMode
            ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/4199e734-82a5-46a5-4c31-2db16fa2bb00/public"
            : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/b74855c2-2b12-4a84-3e53-456f04887b00/public"
        }
        width={22}
        height={22}
      />
    </div>
  );
};

export default ThemeToggle;
