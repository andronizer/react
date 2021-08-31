import React from "react";
import { Input } from "../../../input/Input";
import Title from "../../../title/Title";

import "./boardTitle.css";

export const BoardTitle = ({ value, handleChange, isFormSubmited }) => {
  return (
    <>
      {isFormSubmited ? (
        <Title className={"small-text"}>{value}</Title>
      ) : (
        <Input
          className={"titleInput"}
          value={value}
          onChange={handleChange}
          id={"title"}
          name={"title"}
          type={"text"}
          placeholder={"Dashboard Title"}
        />
      )}
    </>
  );
};
