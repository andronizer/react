import React from "react";
import "./board.css";
import Button from "../button/Button";
import "../app/service";
import DeleteIcon from "../../img/delete.svg";
import DoneIcon from "../../img/done.svg";
import { useState } from "react";
import { BoardTitle } from "./components/boardTitle/BoardTitle";

const Board = ({ handleDeleteBoard }) => {
  const [currentInput, setCurrentInput] = useState("");
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState(list);

  const todoFilter = (isCompleted) => {
    if (isCompleted === "all") {
      return setFiltered(list);
    } else {
      let newTodo = [...list].filter(
        (item) => item.isCompleted === isCompleted
      );
      return setFiltered(newTodo);
    }
  };

  const AddTodo = (event) => {
    event.preventDefault();
    const newList = filtered;
    newList.unshift({ content: currentInput, isCompleted: false });
    setList([...newList]);
    setCurrentInput("");
  };

  const deleteTodo = (index) => {
    let newList = filtered;
    newList.splice(index, 1);
    setList([...newList]);
  };

  const completedTask = (index) => {
    let newList = filtered;
    newList[index].isCompleted = !newList[index].isCompleted;
    setList([...newList]);
  };

  const buttons = [
    { onClick: () => todoFilter("all"), value: "All" },
    { onClick: () => todoFilter(true), value: "Completed" },
    { onClick: () => todoFilter(false), value: "Uncompleted" },
  ];

  return (
    <div className="newBoard">
      <button className="closeButton" onClick={handleDeleteBoard}>
        X
      </button>
      <BoardTitle />

      <div className="buttonsGroup">
        {buttons.map((item, index) => {
          const { onClick, value } = item;
          return (
            <button key={index} onClick={onClick} type="button" className="btn">
              {value}
            </button>
          );
        })}
      </div>
      <div className="addTaskWrapper">
        <input
          className="addTask"
          placeholder={"add your task"}
          onChange={(event) => {
            setCurrentInput(event.target.value);
          }}
          value={currentInput}
        />
        <button onClick={AddTodo} className="addItemButton" type={"submit"}>
          Add
        </button>
      </div>
      {filtered.map(({ content, isCompleted }, index) => {
        return (
          <div className="item">
            <div
              style={{
                textDecoration: isCompleted ? "line-through" : "none",
              }}
            >
              {content}
            </div>
            <span className="buttonsWrapper">
              <button
                className="buttonDeleteDone"
                onClick={() => {
                  completedTask(index);
                }}
              >
                <img src={DoneIcon} className="icon" />
              </button>
              <button
                className="buttonDeleteDone"
                onClick={() => deleteTodo(index)}
              >
                <img src={DeleteIcon} className="icon" />
              </button>
            </span>
          </div>
        );
      })}
      <Button className="boardButton" type={"submit"}>
        Create
      </Button>
    </div>
  );
};

export default Board;
