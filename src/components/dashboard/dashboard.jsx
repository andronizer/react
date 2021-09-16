import React, { useCallback, useState, useEffect } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import "./dashboard.css";
import withAuth from "../../features/auth/withAuth";
import Navbar from "./components/sideBar/SideBar.jsx";
import apiService from "../../services/apiService";
import Board from "./components/board/Board.jsx";
import Footer from "./components/footer/Footer.jsx";
import BoardsList from "./BoardsList";
import { useDispatch, useSelector } from "react-redux";
import { setDashboards } from "../../store/reducers/appSlice";
import { giveDashboards } from "../../store/reducers/appSlice";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentBoardId, setCurrentBoardId] = useState("");
  const [myBoards, setMyBoards] = useState(false);
  const { path, url } = useRouteMatch();

  const dispatch = useDispatch();
  const dashboards = useSelector(giveDashboards);

  const fetchData = useCallback(() => {
    apiService.get("/api/dashboard/all").then((res) => {
      dispatch(setDashboards(res));
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClickAllBoards = () => {
    setMyBoards(false);
  };

  const handleOnClickMyBoards = () => {
    setMyBoards(true);
  };

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

  const circleHandle = (currentBoardItemId) => {
    setCurrentBoardId(currentBoardItemId);
  };

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
            {dashboards.map((el) => {
              if (myBoards && el.joined === true) {
                return (
                  <li className="boardItem" key={el.id}>
                    <Link to={`${url}/${el.id}`}>{el.title}</Link>
                    {el.id === currentBoardId ? (
                      <div className="joinCircle"></div>
                    ) : null}
                  </li>
                );
              } else {
                return (
                  <li className="boardItem" key={el.id}>
                    <Link to={`${url}/${el.id}`}>{el.title}</Link>
                    {el.id === currentBoardId ? (
                      <div className="joinCircle"></div>
                    ) : null}
                  </li>
                );
              }
            })}
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
                <Board
                  key={index}
                  dashboard={dashboard}
                  circleHandle={circleHandle}
                  id={dashboard.id}
                  showJoinedButtons={dashboard.joined}
                />
              ))}
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(Dashboard);
