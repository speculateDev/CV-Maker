import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import Pikaday from "pikaday";
import toast from "react-hot-toast";

import FormRow from "./FormRow";
import { useCv } from "../context/CvContext";
import CheckBox from "./CheckBox";

function ExperienceForm() {
  const { handleSubmit, reset, register, setValue, watch } = useForm();
  const { cvState, dispatch } = useCv();
  const [isPresent, setIsPresent] = useState(false);
  const [pickerT, setPickerT] = useState(null);

  const datePickerFRef = useRef(null);
  const dateFieldFRef = useRef(null);

  const datePickerTRef = useRef(null);
  const dateFieldTRef = useRef(null);

  function handleCheckbox(isChecked) {
    setIsPresent(isChecked);
  }

  useEffect(() => {
    if (!datePickerFRef.current) return;

    const pickerF = new Pikaday({
      trigger: datePickerFRef.current,
      field: dateFieldFRef.current,

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
      trigger: datePickerTRef.current,
      field: dateFieldTRef.current,

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
    if (!data.jobTitle && !data.companyName)
      return toast.error("Please provide more data");

    if (isPresent) data.dateTo = "Present";

    if ((dateFrom && !data.dateTo) || (data.dateTo && !dateFrom))
      return toast.error("Provide a valid time interval!");

    if (!isPresent && new Date(dateFrom) > new Date(dateTo)) {
      toast.error("Please provide a valide date interval");
      return reset();
    }

    if (data.id) {
      toast.success(`Successfully ${watch("id") ? "Updated" : "Created"}`);
      dispatch({
        type: "update_experience",
        payload: { ...data, dateTo: isPresent ? "Present" : dateTo },
      });
      return;
    }

    dispatch({
      type: "add_experience",
      payload: {
        ...data,
        id: Date.now().toString() + Math.random().toString(),
        dateTo: isPresent ? "Present" : dateTo,
      },
    });

    toast.success(`Successfully ${watch("id") ? "Updated" : "Created"}`);
    reset();
  }

  function onReset() {
    reset();
    setIsPresent(false);
  }

  function handleFillData(id) {
    const item = cvState.experience.find((item) => item.id === id);

    if (!item) return;
    setValue("id", item.id);
    setValue("companyName", item.companyName);
    setValue("jobTitle", item.jobTitle);
    setValue("city", item.city);
    setValue("roleDescription", item.roleDescription);
    setValue("dateFrom", item.dateFrom);
    setValue("dateTo", item.dateTo);

    // Handle checkbox
    const isPresentValue = item.dateTo === "Present" ? true : false;
    setIsPresent(isPresentValue);

    dateFieldFRef.current.value = new Date(item.dateFrom).toDateString();

    if (!isPresentValue) {
      setTimeout(() => {
        if (dateFieldTRef.current) {
          dateFieldTRef.current.value = new Date(item.dateTo).toDateString();
        }
      }, 100);
    }
  }

  function handleDeleteExp(id) {
    if (confirm("Are you sure you want to delete"))
      dispatch({ type: "remove_experience", payload: id });
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__combo form__extend justify-between">
        <div>
          <FormRow
            className="form__label"
            htmlFor="companyName"
            label="Company Name"
          >
            <input
              type="text"
              id="companyName"
              className="form__inp"
              {...register("companyName")}
            />
          </FormRow>
        </div>
        <div>
          <FormRow className="form__label" htmlFor="jobTitle" label="Job Title">
            <input
              type="text"
              id="jobTitle"
              className="form__inp"
              {...register("jobTitle")}
            />
          </FormRow>
        </div>
      </div>

      <div className="form__extend">
        <FormRow
          className="form__label"
          htmlFor="roleDescription"
          label="Role Description"
        >
          <textarea
            className="form__textarea"
            id="roleDescription"
            {...register("roleDescription")}
          />
        </FormRow>
      </div>

      <div>
        <FormRow htmlFor="ExperienceCity" label="City">
          <input
            className="form__inp"
            id="ExperienceCity"
            type="text"
            {...register("city")}
          />
        </FormRow>
      </div>

      <div className="form__extend">
        <div className="form__combo align-center">
          <div>
            <FormRow label="Date: From" htmlFor="datePickerFExperience">
              <button
                type="button"
                className="btn btn-date flex"
                id="datePickerFExperience"
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
            label="To Present"
            className="mt-3"
            onChange={handleCheckbox}
            isChecked={isPresent}
          />

          {!isPresent && (
            <div>
              <FormRow label="Date: To" htmlFor="datePickerTExperience">
                <button
                  type="button"
                  className="btn btn-date flex"
                  id="datePickerTExperience"
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
      </div>

      <div className="btns-box">
        <button className="btn btn-outline" type="reset" onClick={onReset}>
          reset
        </button>
        <button className="btn btn-primary" type="submit">
          {watch("id") ? "Update" : "Create"}
        </button>
      </div>

      {cvState.experience.length > 0 && (
        <div className="form__list">
          <h3 className="form__list form__list-title">Saved Education</h3>
          <ul className="form__list">
            {cvState.experience.map((exp) => {
              return (
                <li
                  key={exp.id}
                  className="form__list-item"
                  onClick={() => handleFillData(exp.id)}
                >
                  <p className="form__list-item-name">
                    {`${exp.jobTitle?.slice(0, 60)} ${
                      exp.companyName
                        ? " - " + exp.companyName.slice(0, 50)
                        : ""
                    }`}
                  </p>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={(e) => handleDeleteExp(exp.id, e)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </form>
  );
}

export default ExperienceForm;
