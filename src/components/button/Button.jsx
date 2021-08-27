import React from "react";
import clsx from "clsx";
import "./button.css";

const Button = ({ children, onClick, type, color = "secondary" }) => {
  return (
    <button
      className={clsx(
        "Button",
        { primary: color === "primary" },
        { secondary: color === "secondary" }
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
