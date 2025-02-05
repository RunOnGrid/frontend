import React from "react";
import SortDropdown from "./SortDropdown";
import FilterDropdown from "./FilterDropdown";

const AppsFilter = ({
  showRecents,
  showFilters,
  onClick,
  onClick2,
  darkMode,
}) => {
  return (
    <div className="filters-container">
      <button
        className={`filter-button ${darkMode ? "dark" : "light"} ${
          showRecents ? "open" : ""
        }`}
        onClick={onClick}
      >
        Recents
      </button>
      {showRecents && <SortDropdown darkMode={darkMode} />}

      <button
        className={`filter-button ${darkMode ? "dark" : "light"}`}
        onClick={onClick2}
      >
        Filters
      </button>
      {showFilters && <FilterDropdown darkMode={darkMode} />}
    </div>
  );
};

export default AppsFilter;
