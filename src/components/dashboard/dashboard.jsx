import React, { useCallback, useState, useEffect } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import "./dashboard.css";
import withAuth from "../../features/auth/withAuth";
import Navbar from "./components/sideBar/SideBar.jsx";
import apiService from "../../services/apiService";
import Board from "./components/board/Board.jsx";
import BoardsList from "./BoardsList";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [dashboards, setDashboards] = useState([]);
  const [boards, setBoards] = useState([]);
  const { path, url } = useRouteMatch();

  const fetchData = useCallback(() => {
    apiService.get("/api/dashboard/all").then((res) => {
      apiService.get("/api/user/currentUserId").then((res) => {
        console.log(res);
      });
      setDashboards(res);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClickAllBoards = useCallback(() => {
    apiService
      .get("/api/dashboard/all")
      .then((response) => {
        console.log(response);
        setBoards(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    handleOnClickAllBoards();
  }, []);

  const handleOnClickMyBoards = useCallback(() => {
    apiService
      .get("/api/dashboard")
      .then((response) => {
        console.log(response);
        setBoards(response);
      })
      .catch((error) => {
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
        <div className="navMenu">
          <ul className="listOfBoards">
            {boards.map((el) => (
              <li className="boardItem" key={el.id}>
                <Link to={`${url}/${el.id}`}>{el.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="divBoards">
          <Switch>
            <Route
              children={<BoardsList dashboards={dashboards} />}
              path={`${path}/:dashboardId`}
            />
            <Route path="/main">
              {dashboards.map((dashboard, index) => (
                <Board key={index} dashboard={dashboard} />
              ))}
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
