import React from "react";
import "./title.css";

const Title = ({ className, children }) => {
  return <h1 className={`headerText ${className}`}>{children}</h1>;
};

export default Title;
