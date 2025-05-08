import { useForm } from "react-hook-form";
import { useCv } from "../context/CvContext";
import FormRow from "./FormRow";
import Tag from "./Tag";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

function CustomForm({ sectionData, section_id }) {
  console.log(sectionData);

  const { dispatch, cvState } = useCv();

  const [tags, setTags] = useState(
    sectionData.inpType === "tags" ? sectionData.items : []
  );
  const [tagInp, setTagInp] = useState("");
  const inputRef = useRef(null);
  const { handleSubmit, register, reset, watch, setValue } = useForm();

  const section = cvState.customSections.find(
    (section) => section.id === section_id
  );

  const { inpValues, inpType } = sectionData;

  function onSubmit(data) {
    if (Object.values(data).length <= 0)
      return toast.error("Please provide more data");

    if (!data.id) {
      dispatch({
        type: "add_section_item",
        payload: {
          sectionId: section.id,
          item: {
            ...data,
            id: Date.now().toString() + Math.random().toString(),
          },
        },
      });

      return toast.success("Section item created");
    }

    dispatch({
      type: "update_section_item",
      payload: { sectionId: section_id, itemId: data.id, item: data },
    });

    toast.success("Section item updated");
    reset();
  }

  function addTag(tag) {
    if (tag.length > 20) {
      toast.error("Tags must be under 20 characters");
      return;
    }
    if (!tagInp || tags.includes(tag)) {
      setTagInp("");
      return;
    }
    setTags((tags) => [...tags, tag]);
    setTagInp("");
    setValue("tags", [...tags, tag]);
  }

  function deleteTag(tag) {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    setValue("tags", newTags);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      e.stopPropagation();
      addTag(tagInp.trim());
    }
  }

  function handleFillData(id) {
    const section = cvState.customSections.find(
      (section) => section.id === section_id
    );

    const item = section.items.find((item) => item.id === id);

    Object.entries(item).forEach(([key, value]) => setValue(key, value));

    setTags(item.tags);
  }

  function handleDeleteItem(id, e) {
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete ?")) return;
    dispatch({
      type: "remove_section_item",
      payload: { sectionId: section_id, itemId: id },
    });
  }

  function onReset(e) {
    e.stopPropagation();
    reset();
    setTags([]);
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {inpType === "single" && Object.keys(inpValues).length > 0 && (
        <div className="form__extend">
          <FormRow label={inpValues.single}>
            <input
              type="text"
              className="form__inp"
              {...register(inpValues.single)}
            />
          </FormRow>
        </div>
      )}

      {inpType === "tags" && Object.keys(inpValues).length > 0 && (
        <div>
          <FormRow label={inpValues.tagsName}>
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag) => (
                <Tag key={tag} tag={tag} onDelete={() => deleteTag(tag)} />
              ))}
              <input
                type="text"
                ref={inputRef}
                className="form__inp"
                onKeyDown={handleKeyDown}
                value={tagInp}
                onChange={(e) => setTagInp(e.target.value)}
                placeholder="Add tags (press Enter)"
              />
            </div>
          </FormRow>
        </div>
      )}

      {inpType === "combo" && Object.keys(inpValues).length > 0 && (
        <div className="form__combo form__extend justify-between">
          <div>
            <FormRow label={inpValues.name1}>
              <input
                type="text"
                className="form__inp"
                {...register(inpValues.name1)}
              />
            </FormRow>
          </div>

          <div>
            <FormRow label={inpValues.name2}>
              <input
                type="text"
                className="form__inp"
                {...register(inpValues.name2)}
              />
            </FormRow>
          </div>
        </div>
      )}

      <div className="btns-box">
        <button
          type="reset"
          className="btn btn-outline"
          onClick={(e) => onReset(e)}
        >
          reset
        </button>
        <button className="btn btn-primary" type="submit">
          {inpType === "tags" ? "Update" : watch("id") ? "Update" : "Create"}
        </button>
      </div>

      {section?.items?.length > 0 && inpType !== "tags" && (
        <div className="form__list">
          <h3 className="form__list-title">Saved</h3>

          <ul className="form__list">
            {section?.items?.map((item) => (
              <li
                key={item.id}
                className="form__list-item"
                onClick={() => handleFillData(item.id)}
              >
                <p className="form__list-item-name">
                  {Object.entries(item)
                    .filter(
                      ([key, val]) =>
                        key !== "id" &&
                        typeof val === "string" &&
                        val.trim() !== ""
                    )
                    .map(([_, val]) => val)
                    .slice(0, 2)
                    .join(" - ")}
                </p>

                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={(e) => handleDeleteItem(item.id, e)}
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

export default CustomForm;
