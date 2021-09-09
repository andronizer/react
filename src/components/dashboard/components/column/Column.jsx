import React, { useCallback, useEffect } from "react";
import "./column.css";
import { useState } from "react";
import apiService from "../../../../services/apiService";

const Column = ({ dashboardId, column, columnId }) => {
  const [inputValue, setInputValue] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [titleFormSubmit, setTitleFormSubmit] = useState(false);

  const AddTodo = useCallback(() => {
    apiService
      .post(`/api/${columnId}/task`, {
        title: taskInput,
      })
      .then((response) => {
        console.log(response);
        const newList = tasks;
        newList.unshift(response.title);
        setTasks([...newList]);
        setTaskInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [taskInput]);

  const fetchData = useCallback(() => {
    apiService.get(`/api/${columnId}/task`).then((res) => {
      setTasks(res);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitHandler = useCallback(() => {
    apiService
      .post(`/api/dashboard/${dashboardId}/column`, { title: inputValue })
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
            <button
              className="columnButton"
              type="submit"
              onClick={onSubmitHandler}
            >
              +
            </button>
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
        <button onClick={AddTodo} className="columnButton" type={"submit"}>
          +
        </button>
      </div>
      {tasks.map((task, index) => {
        return (
          <div className="item" key={index}>
            {task.title}
          </div>
        );
      })}
    </div>
  );
};

export default Column;
