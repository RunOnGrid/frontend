import React from "react";

const WebToggle = ({ web3, onChange }) => {
  return (
    <div className="web-toggle">
      <p> Web 2</p>
      <div className="toggle-mode">
        <label className="switch">
          <input type="checkbox" checked={web3} onChange={onChange} />
          <span className="slider round"></span>
        </label>
      </div>
      <p style={{ marginLeft: "0px" }}> Web 3</p>
    </div>
  );
};

export default WebToggle;
