import { useState, useEffect, useRef } from "react";

export default function CustomSelect({ options, title, onOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(title);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Add event listener to handle clicks outside the dropdown
    function closeAllSelect(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeAllSelect);
    return () => {
      document.removeEventListener("mousedown", closeAllSelect);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const selectOption = (index) => {
    setSelectedOption(options[index].label);
    setSelectedIndex(index);
    setIsOpen(false);
    onOption(options[index].value);
  };

  return (
    <div
      className="custom-select mt-3 mb-3"
      style={{ width: "250px" }}
      ref={dropdownRef}
    >
      {/* Hidden original select element */}
      <select>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom select header */}
      <div
        className={`select-selected ${isOpen ? "select-arrow-active" : ""}`}
        onClick={toggleDropdown}
      >
        {selectedOption}
      </div>

      {/* Dropdown items */}
      <div className={`select-items ${!isOpen ? "select-hide" : ""}`}>
        {options.map((option, index) => (
          <div
            key={option.value}
            className={selectedIndex === index ? "same-as-selected" : ""}
            onClick={() => selectOption(index)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
