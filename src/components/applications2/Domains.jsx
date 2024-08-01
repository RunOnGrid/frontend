import React from "react";

const Domains = ({ darkMode }) => {
  return (
    <div className={`main-content ${darkMode ? "dark" : "light"}`}>
      <div className="custom-domain">
        <h3>Custom domains</h3>
        <span>A unique name for your application</span>
        <span>A unique name for your application</span>
        <button>+ Add custom domain</button>
      </div>
    </div>
  );
};

export default Domains;
