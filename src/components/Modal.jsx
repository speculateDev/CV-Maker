import { useCallback, useEffect, useState } from "react";
import FormRow from "./FormRow";
import ModalRow from "./ModalRow";
import toast from "react-hot-toast";
import { useCv } from "../context/CvContext";

function Modal({ setShowModal }) {
  const [rowsData, setRowsData] = useState({});
  const [sectionName, setSectionName] = useState("");
  const {
    dispatch,
    cvState: { customSections },
  } = useCv();

  function handleSubmit(e) {
    e.preventDefault();

    // Check if section has name // check if any data was provided
    if (!sectionName.trim()) return toast.error("A section must have a name");
    if (!rowsData.inpValues) return toast.error("NO data provided");

    // Check if section already exists
    if (customSections.includes(sectionName.trim().toLowerCase())) {
      return toast.error("Section name already exists");
    }

    // Check if combo has both vals
    if (rowsData.inpType === "combo") {
      const name1 = row.inpValues.name1;
      const name2 = row.inpValues.name2;
      if ((name1 && !name2) || (!name1 && name2)) {
        toast.error("For combo type both values must be provided");
        return;
      }
    }

    // Check if tags type has title
    if (rowsData.inpType === "tags" && !rowsData.inpValues?.tagsName) {
      return toast.error("A tags type must have a title");
    }

    // Creating the custom section
    const id = "custom-sec" + customSections.length;
    dispatch({
      type: "add_section",
      payload: { ...rowsData, id, title: sectionName },
    });

    toast.success("Section created");
    setShowModal(false);
  }

  useEffect(() => {
    const modalEl = document.querySelector(".modal__container");
    const handleClickOutside = (e) => {
      if (e.target.closest(".modal__content")) return;
      setShowModal(false);
    };

    modalEl.addEventListener("click", handleClickOutside);

    return () => {
      modalEl.removeEventListener("click", handleClickOutside);
    };
  }, [setShowModal]);

  const updateRowData = useCallback((data) => {
    setRowsData((prev) => data);
  }, []);

  return (
    <div className="modal__container">
      <form className="modal__content" onSubmit={handleSubmit}>
        <h2 className="modal__header">Add New Section</h2>

        <div className="form__extend">
          <div>
            <FormRow label="Section Title">
              <input
                id="sectionTitle"
                type="text"
                className="form__inp"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value.trim())}
              />
            </FormRow>
          </div>
        </div>

        <ModalRow onUpdate={updateRowData} />

        <div className="btns-box mt-1">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
