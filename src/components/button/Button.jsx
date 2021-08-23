import React from "react";
import "./button.css";

const Button = ({ className, children, onClick, type }) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
