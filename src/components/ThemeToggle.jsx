import { useTheme } from "@/ThemeContext";
import React from "react";
// Ajusta la ruta según la ubicación de tu archivo ThemeContext

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="toggle-mode">
      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
