import React from "react";
import "./dashboard.css";
import withAuth from "../../features/auth/withAuth";
import Navbar from "./components/sideBar/SideBar";

const Dashboard = () => {
  return (
    <div className="mainWrapper">
      <Navbar />
    </div>
  );
};

export default withAuth(Dashboard);
