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
        src={darkMode ? "/moon.png" : "/sun.png"}
        width={22}
        height={22}
      />
    </div>
  );
};

export default ThemeToggle;
