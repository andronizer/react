import React from "react";
import { Input } from "../input/Input";
import "./board.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "../button/Button";
import "../app/service";
import DeleteIcon from "../../img/delete.svg";
import DoneIcon from "../../img/done.svg";
// import Status from "../status-filter/Status";

const Board = () => {
  const [currentInput, setCurrentInput] = React.useState("");
  const [list, setList] = React.useState([]);

  const AddTodo = (event) => {
    event.preventDefault();
    const newList = list;
    newList.unshift({ content: currentInput, isCompleted: false });
    setList([...newList]);
    setCurrentInput("");
  };

  const deleteTodo = (index) => {
    let newList = list;
    newList.splice(index, 1);
    setList([...newList]);
  };

  const completedTask = (index) => {
    let newList = list;
    newList[index].isCompleted = !newList[index].isCompleted;
    setList([...newList]);
  };

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
        <div className="addTaskWrapper">
          <input
            className={"addTask"}
            placeholder={"add your task"}
            onChange={(event) => {
              setCurrentInput(event.target.value);
            }}
            value={currentInput}
          />
          <Button onClick={AddTodo} className={"addButton"}>
            Add
          </Button>
        </div>
        {list.map(({ content, isCompleted }, index) => {
          return (
            <div className={"item"}>
              <div
                style={{
                  textDecoration: isCompleted ? "line-through" : "none",
                }}
              >
                {content}
              </div>
              <span className="buttonsWrapper">
                <button
                  className={"buttonDeleteDone"}
                  onClick={() => {
                    completedTask(index);
                  }}
                >
                  <img src={DoneIcon} className={"icon"} />
                </button>
                <button
                  className={"buttonDeleteDone"}
                  onClick={() => deleteTodo(index)}
                >
                  <img src={DeleteIcon} className={"icon"} />
                </button>
              </span>
            </div>
          );
        })}
        <Button className={"boardButton"} type={"submit"}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default Board;
