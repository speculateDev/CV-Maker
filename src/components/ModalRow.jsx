import Select from "./Select";
import { options } from "../utils/constants";
import { useEffect, useState } from "react";
import FormRow from "./FormRow";

function ModalRow({ className, onUpdate, index }) {
  const [inpType, setInpType] = useState(null);
  const [inpValues, setInpValues] = useState({});

  function handleInputChange(id, value) {
    setInpValues((prev) => {
      const updatedValues = { ...prev, [id]: value };
      return updatedValues;
    });
  }

  useEffect(() => {
    if (inpType !== null) {
      onUpdate({ inpType, inpValues });
    }
  }, [inpType, onUpdate, inpValues]);

  function onOption(value) {
    setInpType(value);
    setInpValues({});
  }

  return (
    <div className={className}>
      <Select options={options} title="Input type" onOption={onOption} />
      {inpType === "combo" && (
        <div className="form__combo form__extend mt-3">
          <div>
            <FormRow className="form__label" label="Name">
              <input
                type="text"
                id={`name1-${index}`}
                className="form__inp"
                onChange={(e) => handleInputChange(`name1`, e.target.value)}
              />
            </FormRow>
          </div>

          <div>
            <FormRow className="form__label" label="Name">
              <input
                type="text"
                id={`name2-${index}`}
                className="form__inp"
                onChange={(e) => handleInputChange(`name2`, e.target.value)}
              />
            </FormRow>
          </div>
        </div>
      )}

      {inpType === "single" && (
        <div className="form__extend">
          <FormRow className="form__label" label="Name">
            <input
              type="text"
              id={`single-${index}`}
              className="form__inp"
              onChange={(e) => handleInputChange("single", e.target.value)}
            />
          </FormRow>
        </div>
      )}

      {inpType === "tags" && (
        <div>
          <input
            defaultValue="Title"
            type="text"
            id={`tagsName-${index}`}
            className="name-inp mb-1"
            onChange={(e) => handleInputChange("tagsName", e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default ModalRow;
