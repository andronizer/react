import React from "react";
import "./column.css";
import { useState } from "react";
import apiService from "../../../../services/apiService";

const Column = ({ dashboardId }) => {
  const [inputValue, setInputValue] = useState("");

  const onSubmitHandler = () => {
    apiService
      .post(`/api/dashboard/${dashboardId}/column`, { title: inputValue })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="columnWrapper">
      <input
        className="columnInput"
        type="text"
        name="title"
        placeholder="enter column title"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button
        className="columnTitleButton"
        type="submit"
        onClick={onSubmitHandler}
      >
        +
      </button>
    </div>
  );
};

export default Column;
