import React from "react";
import { useParams } from "react-router";
import Board from "./components/board/Board";

const BoardsList = ({ dashboards }) => {
  if (!dashboards.length) {
    return null;
  }
  const { dashboardId } = useParams();

  const dashboard = dashboards.find((e) => e.id == dashboardId);
  return <Board dashboard={dashboard} />;
};

export default BoardsList;
