import React from "react";
import { Input } from "../input/Input";
import "./board.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "../button/Button";
import "../app/service";

const Board = () => {
  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        title: "",
        tasks: "",
      },
      validationSchema: Yup.object({
        title: Yup.string()
          .max(15, "Title must be shorter than 15 characters")
          .required(),
        tasks: Yup.string()
          .min(5, "Task should be longer than 5 characters")
          .required(),
      }),
      onSubmit: ({ title, tasks }) => {
        const token = localStorage.getItem("userDetails");
        console.log(token);
        const config = {
          headers: { authorization: `Bearer ${token}` },
        };
        console.log(config);
        let bodyParameters = {
          title: title,
          tasks: tasks,
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
      <form onSubmit={handleSubmit}>
        <Input
          className={"input"}
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

        <Input
          className={"input"}
          value={values.tasks}
          onChange={handleChange}
          onBlur={handleBlur}
          id={"tasks"}
          name={"tasks"}
          type={"text"}
          placeholder={"Dashboard Tasks"}
        />
        {touched.tasks && errors.tasks ? (
          <div className={"requiredStyle"}>{errors.tasks}</div>
        ) : null}
        <Button className={"boardButton"} type={"submit"}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default Board;
