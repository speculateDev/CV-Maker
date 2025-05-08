import { X } from "lucide-react";

function Tag({ tag, onDelete }) {
  return (
    <div className="tags__tag">
      <span>{tag}</span>
      <button
        type="button"
        onClick={() => onDelete(tag)}
        className="btn btn-tag"
      >
        <X size="16" />
      </button>
    </div>
  );
}

export default Tag;
