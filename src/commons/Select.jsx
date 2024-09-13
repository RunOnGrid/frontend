import Image from "next/image";
import React, { useState } from "react";

const Select = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div
        className={`dropdown-header ${isOpen ? "openHeader" : ""}`}
        onClick={toggleDropdown}
      >
        {selectedOption}
        <Image alt="" src="/downLigth.png" height={15} width={15} />
      </div>
      {isOpen && (
        <ul className="dropdown-list">
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
