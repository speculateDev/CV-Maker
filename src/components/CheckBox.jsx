import { Check } from "lucide-react";
import { useState } from "react";

function CheckBox({ isChecked = false, onChange, label, className = "" }) {
  function toggleCheck() {
    const newValue = !isChecked;
    onChange?.(newValue);
  }

  return (
    <div className={`flex align-end ${className}`}>
      {label && (
        <label
          onClick={toggleCheck}
          className="form__label form__label-nm block"
        >
          {label}
        </label>
      )}

      <input
        checked={isChecked}
        onChange={toggleCheck}
        type="checkbox"
        hidden
      />

      <button
        className="btn btn-checkbox"
        onClick={toggleCheck}
        aria-pressed={isChecked}
        type="button"
      >
        <Check size="16" className={isChecked ? "" : "icon-hidden"} />
      </button>
    </div>
  );
}

export default CheckBox;
