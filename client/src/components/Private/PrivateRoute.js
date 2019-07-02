import React, { Component } from "react";
import { Route } from "react-router-dom";
import PreferredShops from "../ShopsView/PreferredShops";
import Signin from "../Account/Signin";
import { connect } from "react-redux";

class PrivateRoute extends Component {
  render() {
    const { component, isAuthenticated, ...restProps } = this.props;
    const Comp = component;

    return (
      <Route
        {...restProps}
        render={() => (isAuthenticated ? <Comp /> : <Signin />)}
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.account.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
