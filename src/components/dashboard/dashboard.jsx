import React from "react";
import "./dashboard.css";
import withAuth from "../../features/auth/withAuth";
import Navbar from "./components/sideBar/SideBar";
import { useState } from "react";
import apiService from "../../services/apiService";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [boards, setBoards] = useState([]);

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

  const getBoards = () =>
    apiService
      .get("/api/dashboard/all")
      .then((response) => {
        console.log(response);
        setBoards(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

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
      <button type="submit" onClick={getBoards}>
        Show All
      </button>
      <div>
        <div className="divBoards">
          {boards.map((el) => (
            <div className="boardStyle">{el.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
