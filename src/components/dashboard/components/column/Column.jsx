import React, { useCallback } from "react";
import "./column.css";
import { useState } from "react";
import apiService from "../../../../services/apiService";

const Column = ({ dashboardId }) => {
  const [inputValue, setInputValue] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const AddTodo = useCallback(
    (event) => {
      apiService
        .post("/api/task", { title: taskInput })
        .then((response) => {
          console.log(response);
          event.preventDefault();
          const newList = tasks;
          newList.unshift({ content: taskInput });
          setTasks([...newList]);
          setTaskInput("");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [taskInput]
  );

  const onSubmitHandler = useCallback(() => {
    apiService
      .post(`/api/dashboard/${dashboardId}/column`, { title: inputValue })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [inputValue]);

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
      <button className="columnButton" type="submit" onClick={onSubmitHandler}>
        +
      </button>
      <div className="addTaskWrapper">
        <input
          className="columnInput"
          placeholder={"add your task"}
          onChange={(event) => {
            setTaskInput(event.target.value);
          }}
          value={taskInput}
        />
        <button onClick={AddTodo} className="columnButton" type={"submit"}>
          +
        </button>
      </div>
      {tasks.map(({ content }) => {
        return <div className="item">{content}</div>;
      })}
    </div>
  );
};

export default Column;
