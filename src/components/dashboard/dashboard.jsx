import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./dashboard.css";
import withAuth from "../../features/auth/withAuth";
import Navbar from "./components/sideBar/SideBar.jsx";
import apiService from "../../services/apiService";
import Board from "./components/board/Board.jsx";
import Footer from "./components/footer/Footer.jsx";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboards,
  giveDashboards,
  appendDashboards,
  toggleJoinDashboard,
  setLogOut,
} from "../../store/reducers/appSlice";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [myBoards, setMyBoards] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  const dashboards = useSelector(giveDashboards);

  const { dashboardId } = useParams();

  const fetchData = useCallback(() => {
    apiService.get("/api/dashboard/all").then((res) => {
      dispatch(setDashboards(res));
    });
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
      .then((res) => {
        console.log(res);
        dispatch(appendDashboards(res));
        fetchData();
        setInputValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [inputValue]);

  const circleHandle = (currentBoardItemId, state = true) => {
    dispatch(toggleJoinDashboard({ id: currentBoardItemId, state }));
  };

  const handleClickLogOut = () => {
    dispatch(setLogOut());
    history.push("/login");
  };

  const filteredDashboards = dashboards.filter(
    (el) => dashboardId === "all" || el.id === +dashboardId
  );

  useEffect(() => {
    fetchData();
  }, [inputValue]);

  return (
    <div className="mainWrapper">
      <Navbar
        onClick={onSubmitHandler}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        handleOnClickAllBoards={handleOnClickAllBoards}
        handleOnClickMyBoards={handleOnClickMyBoards}
        handleClickLogOut={handleClickLogOut}
      />

      <div className="contentWrapper">
        <div className="navMenu">
          <ul className="listOfBoards">
            {dashboards
              .filter((dashboard) => !myBoards || dashboard.joined)
              .map((el) => {
                return (
                  <li className="boardItem" key={el.id}>
                    <Link to={`/main/${el.id}`}>{el.title}</Link>
                    {!myBoards && el.joined ? (
                      <div className="joinCircle"></div>
                    ) : null}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="divBoards">
          {filteredDashboards.map((dashboard) => (
            <Board
              key={dashboard.id}
              dashboard={dashboard}
              circleHandle={circleHandle}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(Dashboard);
