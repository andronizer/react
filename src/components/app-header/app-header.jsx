import React from "react";
import "./app-header.css";

const AppHeader = ({ className, children }) => {
  return <h1 className={className}>{children}</h1>;
};

export default AppHeader;
