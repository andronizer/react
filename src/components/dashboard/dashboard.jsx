import React, { useState } from "react";
import Board from "../board/Board";
import withAuth from "../../features/auth/withAuth";
import { Header } from "./components/header/Header";
import "./dashboard.css";

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const handleAddBoard = () => {
    setBoards([...boards, {}]);
  };

  const handleDeleteBoard = (index) => {
    const newList = boards;
    newList.splice(index, 1);
    setBoards([...newList]);
  };

  return (
    <div className="mainWrapper">
      <Header handleAddBoard={handleAddBoard} />
      <div className="boardsWrapper">
        {boards.map((index) => {
          return (
            <Board
              key={index}
              handleDeleteBoard={() => {
                handleDeleteBoard(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
