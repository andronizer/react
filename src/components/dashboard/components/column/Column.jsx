import React, { useCallback, useEffect } from "react";
import "./column.css";
import { useState } from "react";
import apiService from "../../../../services/apiService";

const Column = ({ dashboard, column }) => {
  const [inputValue, setInputValue] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState(column.tasks);
  const [titleFormSubmit, setTitleFormSubmit] = useState(false);

  const AddTodo = useCallback(() => {
    apiService
      .post(`/api/${column.id}/task`, {
        title: taskInput,
      })
      .then((response) => {
        console.log(response);
        const newList = tasks;
        newList.unshift(response);
        setTasks([...newList]);
        setTaskInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [taskInput]);

  const onSubmitHandler = useCallback(() => {
    apiService
      .post(`/api/dashboard/${dashboard.id}/column`, { title: inputValue })
      .then((response) => {
        console.log(response);
        setTitleFormSubmit(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [inputValue]);

  return (
    <div className="columnWrapper">
      <div className="setColumnTitle">
        {titleFormSubmit ? (
          <h2 className="columnTitle">{inputValue}</h2>
        ) : (
          <div>
            <input
              className="columnInput"
              type="text"
              name="title"
              placeholder="enter column title"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            {dashboard.joined === false ? null : (
              <button
                className="columnButton"
                type="submit"
                onClick={onSubmitHandler}
              >
                +
              </button>
            )}
          </div>
        )}
      </div>
      <div className="addTaskWrapper">
        <input
          className="columnInput"
          placeholder={"add your task"}
          onChange={(event) => {
            setTaskInput(event.target.value);
          }}
          value={taskInput}
        />
        {dashboard.joined === false ? null : (
          <button onClick={AddTodo} className="columnButton" type={"submit"}>
            +
          </button>
        )}
      </div>
      {tasks.map((task) => {
        return (
          <div className="item" key={task.id}>
            {task.title}
          </div>
        );
      })}
    </div>
  );
};

export default Column;
