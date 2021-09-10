import React, { useCallback, useEffect } from "react";
import "./dashboard.css";
import withAuth from "../../features/auth/withAuth";
import Navbar from "./components/sideBar/SideBar";
import { useState } from "react";
import apiService from "../../services/apiService";
import Board from "./components/board/Board";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [dashboards, setDashboards] = useState([]);
  const [boards, setBoards] = useState([]);

  const fetchData = useCallback(() => {
    apiService.get("/api/dashboard/all").then((res) => {
      setDashboards(res);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleOnClickAllBoards();
  }, []);

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

  const onSubmitHandler = useCallback(() => {
    apiService
      .post("/api/dashboard", { title: inputValue })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [inputValue]);

  // const deleteBoard = (index) =>
  //   apiService.delete(`/api/dashboard/${index}`).then(() => {
  //     fetchData();
  //   });

  return (
    <div className="mainWrapper">
      <Navbar
        onClick={onSubmitHandler}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        handleOnClickAllBoards={handleOnClickAllBoards}
        handleOnClickMyBoards={handleOnClickMyBoards}
      />

      <div className="contentWrapper">
        {" "}
        <div className="navMenu">
          <ul className="listOfBoards">
            {boards.map((el, index) => (
              <li className="boardItem" key={index}>
                {/* <Link to={`/main/dashboard/${el.id}`}>{el.title}</Link> */}
                <Link to={"/login"}>{el.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="divBoards">
          {dashboards.map((dashboard, index) => (
            <Board
              key={index}
              dashboard={dashboard}
              dashboardId={dashboard.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
