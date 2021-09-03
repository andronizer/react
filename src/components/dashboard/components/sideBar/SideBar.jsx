import React, { useState } from "react";
import apiService from "../../../../services/apiService";

import Title from "../../../title/Title";
import "./sideBar.css";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [boards, setBoards] = useState([]);

  const handleOnClickAllBoards = () =>
    apiService
      .get("/api/dashboard/all")
      .then((response) => {
        console.log(response);
        setBoards(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  const handleOnClickMyBoards = () =>
    apiService
      .get("/api/dashboard")
      .then((response) => {
        console.log(response);
        setBoards(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <div className="navBar">
        <button className="headerButton" onClick={showSidebar}>
          Dashboard
        </button>
        <Title className="headerTitle">Todooster</Title>
      </div>
      <div className={sidebar ? "navMenu active" : "navMenu"}>
        <div className="sidebarButtons">
          <button onClick={handleOnClickAllBoards} type={"submit"}>
            all
          </button>
          <button onClick={handleOnClickMyBoards} type={"submit"}>
            my
          </button>
          <button onClick={showSidebar}>x</button>
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
