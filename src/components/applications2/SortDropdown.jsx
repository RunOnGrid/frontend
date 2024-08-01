import React from "react";

const SortDropdown = () => {
  return (
    <div className="dropdown">
      <p>Sort by:</p>
      <ul>
        <li>Recents</li>
        <li>Name</li>
        <li>Date created</li>
        <li>Status</li>
        <li>Type</li>
      </ul>
    </div>
  );
};

export default SortDropdown;
