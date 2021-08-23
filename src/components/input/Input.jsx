import React from "react";
import "./input.css";

export const Input = ({
  className,
  value,
  onChange,
  onBlur,
  id,
  name,
  type,
  placeholder,
}) => {
  return (
    <input
      className={className}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
};
