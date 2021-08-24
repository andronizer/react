import React from "react";
import { Input } from "../input/Input";
import "./board.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "../button/Button";
import "../app/service";
import Status from "../status-filter/Status";
import Search from "../search-panel/Search";
import TodoList from "../todo-list/TodoList";

const Board = () => {
  const todoData = [
    { label: "Drink Tea", important: false, id: 1 },
    { label: "Study Hard", important: false, id: 2 },
    { label: "Sleep Well", important: false, id: 3 },
  ];

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        title: "",
      },
      validationSchema: Yup.object({
        title: Yup.string()
          .max(15, "Title must be shorter than 15 characters")
          .required(),
      }),
      onSubmit: ({ title }) => {
        const token = localStorage.getItem("userDetails");
        const config = {
          headers: { authorization: `Bearer ${token}` },
        };
        let bodyParameters = {
          title: title,
        };
        axios
          .post("http://localhost:8080/api/dashboard", bodyParameters, config)
          .then((response) => {
            console.log(response.status);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    });

  return (
    <div className="newBoard">
      <form className="formStyle" onSubmit={handleSubmit}>
        <Input
          className={"titleInput"}
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          id={"title"}
          name={"title"}
          type={"text"}
          placeholder={"Dashboard Title"}
        />
        {touched.title && errors.title ? (
          <div className={"requiredStyle"}>{errors.title}</div>
        ) : null}
        <div className="searchButtons">
          <Search />
          <Status />
        </div>
        <TodoList todos={todoData} />
        <Button className={"boardButton"} type={"submit"}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default Board;
