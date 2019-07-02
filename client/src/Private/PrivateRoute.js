import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Signin from '../components/Account/Signin';

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
