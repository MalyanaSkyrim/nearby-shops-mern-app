import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import NavBar from "./components/NavBar";
import NearbyShops from "./components/ShopsView/NearbyShops";
import PreferredShops from "./components/ShopsView/PreferredShops";
import Signin from "./components/Account/Signin";
import Signup from "./components/Account/Signup";
import { loadUser } from "./state_management/actions/accountAction";
import { connect } from "react-redux";

import "./App.css";
import PrivateRoute from "./Private/PrivateRoute";
import EditProfile from "./components/Account/EditProfile";

class App extends Component {
  state = {
    loadingUser: true
  };

  componentDidMount = async () => {
    await this.props.loadUser();
    this.setState({ loadingUser: false });
  };

  render() {
    const { loadingUser } = this.state;
    return (
      !loadingUser && (
        <Router>
          <NavBar />
          <div className="container">
            <Route exact path="/" component={NearbyShops} />
            <PrivateRoute exact path="/favorite" component={PreferredShops} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/profile" component={EditProfile} />
          </div>
        </Router>
      )
    );
  }
}

export default connect(
  null,
  { loadUser }
)(App);
