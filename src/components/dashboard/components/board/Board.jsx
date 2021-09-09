import React from "react";
import { useState, useEffect, useCallback } from "react";
import Column from "../column/Column";
import "./board.css";
import apiService from "../../../../services/apiService";

const Board = ({ dashboard, dashboardId }) => {
  const [columns, setColumns] = useState([]);
  const handleAddColumn = () => {
    setColumns([...columns, []]);
  };

  const fetchData = useCallback(() => {
    apiService.get(`/api/dashboard/${dashboardId}/column`).then((res) => {
      setColumns(res);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="boardWrapper" title={dashboard.title}>
      <h2 className="boardTitle">{dashboard.title}</h2>

      <div className="columnsWrapper">
        {columns.map((column, index) => {
          return (
            <Column
              key={index}
              dashboardId={dashboard.id}
              column={column}
              columnId={column.id}
            />
          );
        })}
        <button className="addColumnButton" onClick={handleAddColumn}>
          + add column
        </button>
      </div>
    </div>
  );
};

export default Board;
