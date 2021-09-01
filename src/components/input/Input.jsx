import React from "react";
import "./input.css";

export const Input = (props) => {
  const { name, value, type, placeholder, onChange, onBlur, errors, touched } =
    props;
  const errorMessage = errors[name];
  const isTouched = !!touched[name];
  return (
    <div>
      <input
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isTouched && errorMessage && (
        <div className="requiredStyle">{errorMessage}</div>
      )}
    </div>
  );
};
