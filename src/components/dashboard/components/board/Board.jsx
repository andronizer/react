import React from "react";
import { useState, useCallback } from "react";
import Column from "../column/Column";
import "./board.css";
import apiService from "../../../../services/apiService";

const Board = ({ dashboard, circleHandle }) => {
  const [columns, setColumns] = useState(dashboard.columns);

  const handleAddColumn = () => {
    apiService
      .post(`/api/dashboard/${dashboard.id}/column`, { title: "new column" })
      .then((res) => {
        setColumns([...dashboard.columns, res]);
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
    apiService
      .delete(`/api/dashboard/${dashboard.id}/user`, {
        DashboardId: dashboard.id,
      })
      .then((res) => {
        console.log(res);
        circleHandle(dashboard.id, false);
      });
  }, []);

  return (
    <div className="boardWrapper" title={dashboard.title}>
      <div className="boardHeader">
        <h2 className="boardTitle">{dashboard.title}</h2>
        {!dashboard.isOwner ? (
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
        ) : null}
      </div>

      <div className="columnsWrapper">
        {columns &&
          columns.map((column) => {
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
