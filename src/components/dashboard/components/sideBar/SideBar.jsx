import React, { useCallback, useState } from "react";
import apiService from "../../../../services/apiService";
import Title from "../../../title/Title";
import "./sideBar.css";

const Navbar = ({ onClick, onChange, value }) => {
  const [sidebar, setSidebar] = useState(false);
  const [boards, setBoards] = useState([]);

  const handleOnClickAllBoards = useCallback(() => {
    apiService
      .get("/api/dashboard/all")
      .then((response) => {
        console.log(response);
        setBoards(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleOnClickMyBoards = useCallback(() => {
    apiService
      .get("/api/dashboard")
      .then((response) => {
        console.log(response);
        setBoards(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <div className="navBar">
        <button className="headerButton" onClick={showSidebar}>
          Dashboard
        </button>
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
        </div>
      </div>
      <div className={sidebar ? "navMenu active" : "navMenu"}>
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
          <button className="sideBarButton close" onClick={showSidebar}>
            x
          </button>
        </div>
        <div>
          <ul className="listOfBoards">
            {boards.map((el, index) => (
              <li className="boardItem" key={index}>
                {el.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
