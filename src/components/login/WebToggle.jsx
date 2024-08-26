import { useTheme } from "@/ThemeContext";
import React from "react";
// Ajusta la ruta según la ubicación de tu archivo ThemeContext

const WebToggle = ({ web3, onChange }) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="toggle-mode">
        <label className="switch">
          <input type="checkbox" checked={web3} onChange={onChange} />
          <span className="slider round"></span>
        </label>
      </div>
      <span> {web3 ? "Web 3" : "Web 2"}</span>
    </div>
  );
};

export default WebToggle;
