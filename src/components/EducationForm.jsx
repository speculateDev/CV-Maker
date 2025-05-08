import { useEffect, useRef, useState } from "react";
import FormRow from "./FormRow";
import { useForm } from "react-hook-form";
import Pikaday from "pikaday";
import { useCv } from "../context/CvContext";
import { Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import CheckBox from "./CheckBox";

function EducationForm() {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [isPresent, setIsPresent] = useState(false);
  const [pickerT, setPickerT] = useState(null);

  const { cvState, dispatch } = useCv();

  const datePickerFRef = useRef(null);
  const datePickerTRef = useRef(null);

  const dateFieldFRef = useRef(null);
  const dateFieldTRef = useRef(null);

  function handleCheckbox(isChecked) {
    setIsPresent(isChecked);
  }

  useEffect(() => {
    if (!datePickerFRef.current) return;

    const pickerF = new Pikaday({
      field: dateFieldFRef.current,
      trigger: datePickerFRef.current,

      onSelect: (date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        setValue("dateFrom", formattedDate);
      },
    });

    return () => {
      pickerF.destroy();
      if (pickerT) pickerT.destroy();
    };
  }, [setValue, pickerT]);

  useEffect(() => {
    if (isPresent || !datePickerTRef.current) return;

    const newPickerT = new Pikaday({
      field: dateFieldTRef.current,
      trigger: datePickerTRef.current,

      onSelect: (date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        setValue("dateTo", formattedDate);
      },
    });

    setPickerT(newPickerT);

    return () => {
      if (newPickerT) newPickerT.destroy();
    };
  }, [isPresent, setValue]);

  function onSubmit(data) {
    const { dateFrom, dateTo } = data;
    if (!data.schoolName && !data.degree)
      return toast.error("Please provide more data");

    if (isPresent) data.dateTo = "Present";

    if ((dateFrom && !data.dateTo) || (data.dateTo && !dateFrom))
      return toast.error("Provide a valid time interval!");

    if (!isPresent && new Date(dateFrom) > new Date(dateTo)) {
      toast.error("Please provide a valid date interval");
      return reset();
    }

    if (data.id) {
      dispatch({
        type: "update_education",
        payload: data,
      });
      toast.success(`Successfully ${watch("id") ? "Updated" : "Created"}`);
      return;
    }

    dispatch({
      type: "add_education",
      payload: {
        ...data,
        id: Date.now().toString() + Math.random().toString(),
      },
    });

    toast.success(`Successfully ${watch("id") ? "Updated" : "Created"}`);
    reset();
  }

  function handleFillData(id) {
    const item = cvState.education.find((item) => item.id === id);

    if (!item) return;
    setValue("id", item.id);
    setValue("schoolName", item.schoolName);
    setValue("city", item.city);
    setValue("degree", item.degree);
    setValue("dateFrom", item.dateFrom);
    setValue("dateTo", item.dateTo);

    const isPresentValue = item.dateTo === "Present" ? true : false;
    setIsPresent(isPresentValue);

    dateFieldFRef.current.value = new Date(item.dateFrom).toDateString();

    if (!isPresentValue) {
      setTimeout(() => {
        if (dateFieldTRef.current)
          dateFieldTRef.current.value = new Date(item.dateTo).toDateString();
      }, 100);
    }
  }

  function handleDeleteEdu(id, e) {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete"))
      dispatch({ type: "remove_education", payload: id });
  }

  function handleReset(e) {
    e.stopPropagation();
    reset();
    setIsPresent(false);
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__combo form__extend justify-between">
        <div>
          <FormRow
            className="form__label"
            htmlFor="schoolName"
            label="School Name"
          >
            <input
              type="text"
              id="schoolName"
              className="form__inp"
              {...register("schoolName")}
            />
          </FormRow>
        </div>

        <div>
          <FormRow className="form__label" htmlFor="educationCity" label="City">
            <input
              type="text"
              id="educationCity"
              className="form__inp"
              {...register("city")}
            />
          </FormRow>
        </div>
      </div>

      <div className="form__extend">
        <FormRow className="form__label" htmlFor="degree" label="Degree">
          <input
            type="text"
            id="degree"
            className="form__inp"
            {...register("degree")}
          />
        </FormRow>
      </div>

      <div className="form__extend form__combo align-center">
        <div>
          <FormRow label="Date: From" htmlFor="datePickerFEducaion">
            <button
              type="button"
              className="btn btn-date flex"
              id="datePickerFEducaion"
              ref={datePickerFRef}
            >
              <Calendar />
              <input
                className="form__inp inp-outline"
                type="text"
                ref={dateFieldFRef}
                readOnly
              />
            </button>
          </FormRow>
        </div>

        <CheckBox
          isChecked={isPresent}
          onChange={handleCheckbox}
          label="To present"
          className="mt-3"
        />

        {!isPresent && (
          <div>
            <FormRow label="Date: To" htmlFor="datePickerTEducation">
              <button
                type="button"
                className="btn btn-date flex"
                id="datePickerTEducation"
                ref={datePickerTRef}
              >
                <Calendar />
                <input
                  className="form__inp inp-outline"
                  type="text"
                  ref={dateFieldTRef}
                  readOnly
                />
              </button>
            </FormRow>
          </div>
        )}
      </div>

      <div className="btns-box">
        <button
          className="btn btn-outline"
          type="reset"
          onClick={(e) => handleReset(e)}
        >
          reset
        </button>
        <button className="btn btn-primary" type="submit">
          {watch("id") ? "Update" : "Create"}
        </button>
      </div>

      {cvState.education.length > 0 && (
        <div className="form__list">
          <h3 className="form__list form__list-title">Saved Education</h3>
          <ul className="form__list">
            {cvState.education.map((edu) => (
              <li
                key={edu.id}
                className="form__list-item"
                onClick={() => handleFillData(edu.id)}
              >
                <p className="form__list-item-name">
                  {`${edu.schoolName?.slice(0, 60)} ${
                    edu.degree ? "- " + edu.degree.slice(0, 50) : ""
                  }`}
                </p>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={(e) => handleDeleteEdu(edu.id, e)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

export default EducationForm;
