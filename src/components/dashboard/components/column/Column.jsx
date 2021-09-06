import React from "react";
import "./column.css";
import { useState } from "react";
import apiService from "../../../../services/apiService";

const Column = ({ children }) => {
  const [inputValue, setInputValue] = useState("");

  const onSubmitHandler = () => {
    apiService
      .post(`/api/dashboard/7/column`, { title: inputValue })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="columnWrapper">
      <input
        type="text"
        name="title"
        placeholder="enter column title"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button type="submit" onClick={onSubmitHandler}>
        Create
      </button>

      {children}
    </div>
  );
};

export default Column;
