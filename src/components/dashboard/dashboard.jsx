import React from "react";
import { Link } from "react-router-dom";

const Dashboard = (href) => {
  return (
    <div>
      <Link to={href}>
        <h1>Let's Create Our First Dashboard</h1>
      </Link>
    </div>
  );
};

export default Dashboard;
