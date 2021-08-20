import React from "react";
import Dashboard from "../dashboard/dashboard";
import LoginForm from "../login-form";
import { Route } from "react-router-dom";
import "./app.css";

const App = () => {
  return (
    <div className="signin">
      <Route exact path={"/"} render={() => <LoginForm />} />
      <Route path={"/dashboard"} render={() => <Dashboard />} />
    </div>
  );
};

export default App;
