import React, { useCallback, useEffect } from "react";
import "./dashboard.css";
import withAuth from "../../features/auth/withAuth";
import Navbar from "./components/sideBar/SideBar";
import { useState } from "react";
import apiService from "../../services/apiService";
import Board from "./components/board/Board";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [dashboards, setDashboards] = useState([]);

  const fetchData = useCallback(() => {
    apiService.get("/api/dashboard/all").then((res) => {
      setDashboards(res);
    });
  }, []);

  useEffect(() => {
    fetchData();
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
      />

      <div>
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
