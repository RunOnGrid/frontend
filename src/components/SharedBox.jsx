import React from "react";

const SharedBox = ({ mode }) => {
  return (
    <div className={`shared-box ${mode ? "dark" : "light"}`}>
      <span>Project name</span>
      <div>Description</div>
    </div>
  );
};

export default SharedBox;
