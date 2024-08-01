import React from "react";
import SortDropdown from "./SortDropdown";
import FilterDropdown from "./FilterDropdown";

const AppsFilter = ({ showRecents, showFilters, onClick, onClick2 }) => {
  return (
    <div className="filters-container">
      <button className="filter-button" onClick={onClick}>
        Recents
      </button>
      {showRecents && <SortDropdown />}
      <button className="filter-button" onClick={onClick2}>
        Filters
      </button>
      {showFilters && <FilterDropdown />}
    </div>
  );
};

export default AppsFilter;
