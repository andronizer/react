import React from "react";
import Dashboard from "../dashboard/dashboard";
import Signup from "../signup/signup";
import LoginForm from "../login-form";
import { Route } from "react-router-dom";
import "./app.css";

const App = () => {
  return (
    <div className="signin">
      <Route path={"/login"} render={() => <LoginForm />} />
      <Route path={"/main"} render={() => <Dashboard />} />
      <Route path={"/signup"} render={() => <Signup />} />
    </div>
  );
};

export default App;
