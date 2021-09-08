import React from "react";
import { useState } from "react";
import Column from "../column/Column";
import "./board.css";

const Board = ({ dashboard }) => {
  const [columns, setColumns] = useState([]);
  const handleAddColumn = () => {
    setColumns([...columns, []]);
  };

  return (
    <div className="boardWrapper" title={dashboard.title}>
      <h2 className="boardTitle">{dashboard.title}</h2>

      <div className="columnsWrapper">
        {columns.map((column, index) => {
          return (
            <Column key={index} dashboardId={dashboard.id} column={column} />
          );
        })}
        {columns}
        <button className="addColumnButton" onClick={handleAddColumn}>
          + add column
        </button>
      </div>
    </div>
  );
};

export default Board;
