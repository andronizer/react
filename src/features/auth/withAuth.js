import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { selectIsAuthenticated } from "../../store/reducers/appSlice";

const withAuth = (Component) => {
  const AuthComponent = (props) => {
    const history = useHistory();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
      if (!isAuthenticated) {
        history.push("/login");
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };

  return withRouter(AuthComponent);
};

export default withAuth;
