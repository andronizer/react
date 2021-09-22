import React from "react";
import Title from "../../../title/Title";
import "./sideBar.css";

const Navbar = ({
  onClick,
  onChange,
  value,
  handleOnClickAllBoards,
  handleOnClickMyBoards,
  handleClickLogOut,
}) => {
  return (
    <div>
      <div className="navBar">
        <div className="sidebarButtons">
          <button
            className="sideBarButton"
            onClick={handleOnClickAllBoards}
            type={"submit"}
          >
            all boards
          </button>
          <button
            className="sideBarButton"
            onClick={handleOnClickMyBoards}
            type={"submit"}
          >
            my boards
          </button>
        </div>
        <Title className="headerTitle">Todooster</Title>
        <div className="addBoardWrapper">
          <input
            type="text"
            name="title"
            placeholder="enter dashboard title"
            onChange={onChange}
            value={value}
          />
          <button className="addBoardButton" type="submit" onClick={onClick}>
            Add
          </button>
          <button className="logOutButton" onClick={handleClickLogOut}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
