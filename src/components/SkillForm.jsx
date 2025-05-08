import { X } from "lucide-react";
import { useCv } from "../context/CvContext";
import { useEffect, useRef, useState } from "react";
import Tag from "./Tag";

function SkillForm() {
  const { cvState, dispatch } = useCv();
  const { skills } = cvState;
  const inputRef = useRef(null);

  const [tags, setTags] = useState(skills);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleInpChange(e) {
    setTagInput(e.target.value);
  }

  function handleKeyDown(e) {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim("")) {
      e.preventDefault();

      addTag(tagInput.trim());
    }
  }

  function addTag(tag) {
    if (!tag || tags.includes(tag)) {
      setTagInput("");
      return;
    }

    setTags((tags) => [...tags, tag]);
    setTagInput("");
  }

  function handleDelete(tag) {
    setTags((tags) => {
      const newTags = tags.filter((t) => t !== tag);
      dispatch({ type: "update_skills", payload: newTags });
      return newTags;
    });
  }

  function handleSubmit(e) {
    if (e?.target.value) addTag(e.target.value);

    // Update the context
    dispatch({ type: "update_skills", payload: tags });
  }

  return (
    <div className="tags__wrapper">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} onDelete={() => handleDelete(tag)} />
      ))}

      <input
        ref={inputRef}
        type="text"
        className="tags__inp"
        value={tagInput}
        onChange={handleInpChange}
        onKeyDown={handleKeyDown}
        onBlur={handleSubmit}
      />
    </div>
  );
}

export default SkillForm;
