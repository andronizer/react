import React, { useState } from "react";
import AppHeader from "../app-header/app-header";
import Button from "../button";
import Board from "../board/Board";
import "./dashboard.css";

const Dashboard = () => {
  const [count, setCount] = useState([<div></div>]);

  return (
    <div className={"mainWrapper"}>
      <div className={"headerWrapper"}>
        <AppHeader className={"headerText"}>Todooster</AppHeader>
        <Button
          className={"headerButton"}
          onClick={() => setCount([count, <Board />])}
        >
          Add Board
        </Button>
      </div>
      <div className="boardsWrapper">{count.map((el) => el)}</div>
    </div>
  );
};

export default Dashboard;
