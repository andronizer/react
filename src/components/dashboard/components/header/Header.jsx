import React from "react";
import Title from "../../../title/Title";
import Button from "../../../button/Button";
// import Board from "../../../board/Board";

import "./header.css";

export const Header = ({ handleAddBoard }) => {
  return (
    <div className="headerWrapper">
      <Title>Todooster</Title>
      <Button className="headerButton" onClick={handleAddBoard}>
        Add Board
      </Button>
    </div>
  );
};
