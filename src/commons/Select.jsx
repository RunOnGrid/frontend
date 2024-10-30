import Image from "next/image";
import React, { useState } from "react";

const Select = ({ options, onSelect, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="dropdown-container">
      <div
        className={`dropdown-header ${isOpen ? "openHeader" : ""} ${
          darkMode ? "dark" : "light"
        }`}
        onClick={toggleDropdown}
      >
        {selectedOption}
        <Image alt="" src="/downLigth.png" height={15} width={15} />
      </div>
      {isOpen && (
        <ul className={`dropdown-list ${darkMode ? "dark" : "light"}`}>
          {options.map((option, index) => (
            <li key={index} onClick={() => selectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;