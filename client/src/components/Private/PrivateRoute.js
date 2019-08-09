import React, { useContext } from "react";
import { __RouterContext } from "react-router";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const useRouter = () => {
  return useContext(__RouterContext);
};

const PrivateRoute = props => {
  const { component, ...restProps } = props;
  const Comp = component;
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  const { location } = useRouter();

  return isAuthenticated ? (
    <Route {...restProps} render={() => <Comp />} />
  ) : (
    <Redirect to={{ pathname: "/signin", lastPath: location.pathname }} />
  );
};

export default PrivateRoute;
