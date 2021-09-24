import React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Column from "../column/Column";
import apiService from "../../../../services/apiService";
import "./board.css";
import { updateDashboard } from "../../../../store/reducers/appSlice";

const Board = ({ dashboard, circleHandle }) => {
  const dispatch = useDispatch();
  const { columns, id, title, isOwner, joined } = dashboard;

  const handleAddColumn = () => {
    apiService
      .post(`/api/dashboard/${id}/column`, { title: "new column" })
      .then((res) => {
        dispatch(
          updateDashboard({
            ...dashboard,
            columns: [...columns, res],
          })
        );
      })
      .catch();
  };

  const joinToDashboard = useCallback(() => {
    apiService.post(`/api/dashboard/${id}/user`).then((res) => {
      console.log(res);
      circleHandle(id);
    });
  }, []);

  const unjoinFromDashboard = useCallback(() => {
    apiService
      .delete(`/api/dashboard/${id}/user`, {
        DashboardId: id,
      })
      .then((res) => {
        console.log(res);
        circleHandle(id, false);
      });
  }, []);

  return (
    <div className="boardWrapper" title={title}>
      <div className="boardHeader">
        <h2 className="boardTitle">{title}</h2>
        {!isOwner ? (
          <div>
            {joined ? null : (
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
        {joined === false ? null : (
          <button className="addColumnButton" onClick={handleAddColumn}>
            + add column
          </button>
        )}
      </div>
    </div>
  );
};

export default Board;
