import React from "react";
import { Route, Redirect } from "react-router-dom";
import Signin from "../Account/Signin";
import { useSelector } from "react-redux";

const PrivateRoute = props => {
  const { component, ...restProps } = props;
  const Comp = component;
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  return isAuthenticated ? (
    <Route {...restProps} render={() => <Comp />} />
  ) : (
    <Redirect to="/signin" />
  );
};

export default PrivateRoute;
