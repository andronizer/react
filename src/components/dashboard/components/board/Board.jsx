import React from "react";
import { useState } from "react";
import Column from "../column/Column";
import "./board.css";

const Board = ({ title, children, deleteBoard }) => {
  const [columns, setColumns] = useState([]);

  const handleAddColumn = () => {
    setColumns([...columns, []]);
  };

  return (
    <div className="boardWrapper" title={title}>
      <button onClick={deleteBoard}>Delete</button>
      <h2 className="boardTitle">{children}</h2>
      <button onClick={handleAddColumn}>+</button>
      <div className="columnsWrapper">
        {columns.map((item, index) => {
          return <Column key={index}></Column>;
        })}
        {columns}
      </div>
    </div>
  );
};

export default Board;
