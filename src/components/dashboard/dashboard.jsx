import React, { useEffect } from "react";
import "./dashboard.css";
import withAuth from "../../features/auth/withAuth";
import Navbar from "./components/sideBar/SideBar";
import { useState } from "react";
import apiService from "../../services/apiService";
import Board from "./components/board/Board";
import { getBoards } from "../../api/boards";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [boards, setBoards] = useState([]);
  const [filter, setFilteredBoards] = useState([]);
  console.log(filter);

  const onSubmitHandler = () => {
    apiService
      .post("/api/dashboard", { title: inputValue })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const data = getBoards();

  const deleteBoard = (index) =>
    apiService.delete(`/api/dashboard/${index}`).then((res) => {
      console.log(res.data);
      const newList = boards;
      newList.splice(index, 1);
      setFilteredBoards([...newList]);
    });

  useEffect(() => {
    setBoards(data);
  }, [data]);

  return (
    <div className="mainWrapper">
      <Navbar />

      <input
        type="text"
        name="title"
        placeholder="enter dashboard title"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button type="submit" onClick={onSubmitHandler}>
        Create
      </button>
      <div></div>
      <div>
        <div className="divBoards">
          {data &&
            data.map((el, index) => (
              <Board key={index} deleteBoard={() => deleteBoard(el.id)}>
                {el.title}
              </Board>
            ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
