import React from "react";
import "./column.css";

const Column = ({ children }) => {
  return <div className="columnWrapper">{children}</div>;
};

export default Column;
