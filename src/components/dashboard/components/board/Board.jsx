import React from "react";
import { useState, useEffect, useCallback } from "react";
import Column from "../column/Column";
import "./board.css";
import apiService from "../../../../services/apiService";

const Board = ({ dashboard, circleHandle }) => {
  const [columns, setColumns] = useState(dashboard.columns);
  console.log(dashboard);

  const handleAddColumn = () => {
    apiService
      .post(`/api/dashboard/${dashboard.id}/column`, { title: "new column" })
      .then((res) => {
        setColumns((values) => [...values, res]);
      })
      .catch();
  };

  const joinToDashboard = useCallback(() => {
    apiService.post(`/api/dashboard/${dashboard.id}/user`).then((res) => {
      console.log(res);
      circleHandle(dashboard.id);
    });
  }, []);

  const unjoinFromDashboard = useCallback(() => {
    console.log(dashboard.id);
    apiService
      .delete(`/api/dashboard/${dashboard.id}/user`, {
        DashboardId: dashboard.id,
      })
      .then((res) => {
        console.log(res);
        circleHandle(dashboard.id, false);
      });
  }, []);

  // useEffect(() => {
  //   apiService.get(`/api/dashboard/${dashboard.id}/column`).then((res) => {
  //     setColumns(res);
  //   });
  // }, []);

  return (
    <div className="boardWrapper" title={dashboard.title}>
      <div className="boardHeader">
        <h2 className="boardTitle">{dashboard.title}</h2>
        <div>
          {dashboard.joined ? null : (
            <button className="joinButton" onClick={joinToDashboard}>
              join
            </button>
          )}
          <button className="joinButton" onClick={unjoinFromDashboard}>
            unjoin
          </button>
        </div>
      </div>

      <div className="columnsWrapper">
        {columns.map((column) => {
          return (
            <Column key={column.id} dashboard={dashboard} column={column} />
          );
        })}
        {dashboard.joined === false ? null : (
          <button className="addColumnButton" onClick={handleAddColumn}>
            + add column
          </button>
        )}
      </div>
    </div>
  );
};

export default Board;
