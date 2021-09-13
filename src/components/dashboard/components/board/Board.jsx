import React from "react";
import { useState, useEffect, useCallback } from "react";
import Column from "../column/Column";
import "./board.css";
import apiService from "../../../../services/apiService";

const Board = ({ dashboard }) => {
  const [columns, setColumns] = useState([]);

  const handleAddColumn = () => {
    apiService
      .post("/api/verifyJoinedUser", {
        DashboardId: dashboard.id,
        DashboardOwnerId: dashboard.ownerId,
      })
      .then((res) => {
        console.log(res);
        if (res) {
          setColumns([...columns, []]);
        } else {
          console.log(
            "You need to be an owner or joined to the board to edit it!"
          );
        }
      });
  };

  const joinToDashboard = useCallback(() => {
    apiService
      .post(`/api/joinedUsers`, { DashboardId: dashboard.id })
      .then((res) => {
        console.log(res);
      });
  }, []);

  const unjoinFromDashboard = useCallback(() => {
    apiService
      .delete("/api/unjoinUser", { DashboardId: dashboard.id })
      .then((res) => {
        console.log(res);
      });
  }, []);

  const fetchData = useCallback(() => {
    apiService.get(`/api/dashboard/${dashboard.id}/column`).then((res) => {
      setColumns(res);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="boardWrapper" title={dashboard.title}>
      <div className="boardHeader">
        <h2 className="boardTitle">{dashboard.title}</h2>
        <div>
          <button className="joinButton" onClick={joinToDashboard}>
            join
          </button>
          <button className="joinButton" onClick={unjoinFromDashboard}>
            unjoin
          </button>
        </div>
      </div>

      <div className="columnsWrapper">
        {columns.map((column, index) => {
          return (
            <Column
              key={index}
              dashboardId={dashboard.id}
              column={column}
              columnId={column.id}
              DashboardOwnerId={dashboard.ownerId}
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
