import React, { useState, useCallback } from "react";
import "./column.css";
import apiService from "../../../../services/apiService";
import { updateDashboard } from "../../../../store/reducers/appSlice";
import { useDispatch } from "react-redux";

const Column = ({ dashboard, column }) => {
  const [inputValue, setInputValue] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState(column.tasks || []);
  const [titleFormSubmit, setTitleFormSubmit] = useState(false);
  const dispatch = useDispatch();
  const { id, columns, joined } = dashboard;

  const AddTodo = useCallback(() => {
    apiService
      .post(`/api/${column.id}/task`, {
        title: taskInput,
      })
      .then((response) => {
        console.log(response);
        setTasks([...tasks, response]);
        setTaskInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [taskInput]);

  const onSubmitHandler = useCallback(() => {
    apiService
      .put(`/api/dashboard/${id}/column/${column.id}`, {
        title: inputValue,
      })
      .then((response) => {
        dispatch(
          updateDashboard({
            ...dashboard,
            columns: columns.map((e) => {
              if (e.id === response.id) {
                return response;
              }
              return e;
            }),
          })
        );
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
        {titleFormSubmit || column.title !== "new column" ? (
          <h2 className="columnTitle">{column.title}</h2>
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
            {joined === false ? null : (
              <button
                className="columnButton"
                type="submit"
                onClick={() => {
                  onSubmitHandler();
                }}
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
        {joined === false ? null : (
          <button onClick={AddTodo} className="columnButton" type={"submit"}>
            +
          </button>
        )}
      </div>
      {tasks &&
        tasks.map((task) => {
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
