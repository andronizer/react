import React from "react";
import TodoItem from "../todo-item/TodoItem";
import "./todoList.css";

const TodoList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id}>
        <TodoItem {...itemProps} />
      </li>
    );
  });

  return <ul className="todoList">{elements}</ul>;
};

export default TodoList;
