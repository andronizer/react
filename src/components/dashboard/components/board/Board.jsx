import React from "react";
import { useState, useEffect, useCallback } from "react";
import Column from "../column/Column";
import "./board.css";
import apiService from "../../../../services/apiService";

const Board = ({ dashboard, circleHandle, id }) => {
  const [columns, setColumns] = useState([]);
  const [userId, setUserId] = useState("");

  const getCurrentUserId = useCallback(() => {
    apiService
      .get("/api/joinedUser")
      .then((response) => {
        setUserId(response.joinedUser.UserId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCurrentUserId();
  }, []);

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
        circleHandle(id);
      });
  }, []);

  const unjoinFromDashboard = useCallback(() => {
    apiService
      .delete("/api/unjoinUser", { DashboardId: dashboard.id })
      .then((res) => {
        console.log(res);
        circleHandle("");
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
        {!(userId == dashboard.ownerId) ? (
          <div>
            <button className="joinButton" onClick={joinToDashboard}>
              join
            </button>
            <button className="joinButton" onClick={unjoinFromDashboard}>
              unjoin
            </button>
          </div>
        ) : null}
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
