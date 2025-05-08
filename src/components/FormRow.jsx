import React from "react";

function FormRow({ label, children, error }) {
  const input = React.Children.toArray(children).find(
    (child) => child.props && child.props.id
  );

  return (
    <>
      {label && (
        <label className="form__label" htmlFor={input?.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="error">{error}</span>}
    </>
  );
}

export default FormRow;
