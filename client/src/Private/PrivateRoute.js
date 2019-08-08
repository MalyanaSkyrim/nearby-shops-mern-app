import React, { Component } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "../components/Account/Signin";

const PrivateRoute = props => {
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  const { component, ...restProps } = props;
  const Comp = component;

  return (
    <Route
      {...restProps}
      render={() => (isAuthenticated ? <Comp /> : <Signin />)}
    />
  );
};

export default PrivateRoute;
