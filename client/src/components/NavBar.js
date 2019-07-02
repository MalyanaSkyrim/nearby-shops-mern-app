import { Menu, Icon } from "antd";

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../state_management/actions/accountAction";
import { loadShops } from "../state_management/actions/shopActions";
class NavBar extends Component {
  state = {
    current: "home"
  };

  handleClick = async e => {
    this.setState({
      current: e.key
    });
    if (e.key === "logout") {
      this.props.logout();
      this.props.loadShops();
    }
  };

  componentWillMount() {
    let pathname = this.props.location.pathname.substring(1);
    if (pathname === "") pathname = "home";
    this.setState({ current: pathname });
  }

  render() {
    const { isAuthenticated, user } = this.props;
    const username = user.username;
    console.log({ user });

    return (
      <Menu
        class="nav-bar"
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Link to="/">
            {" "}
            <Icon type="home" /> Nearby shops
          </Link>
        </Menu.Item>

        {isAuthenticated && (
          <Menu.Item key="favorite">
            <Link to="/favorite">
              {" "}
              <Icon type="star" /> My preferred shops{" "}
            </Link>
          </Menu.Item>
        )}

        {!isAuthenticated ? (
          <Menu.SubMenu
            title={
              <span className="submenu-title-wrNavBarer">
                <Icon type="user" />
                Account
              </span>
            }
          >
            <Menu.Item key="sign-in">
              <Link to="/signin">Sign in</Link>
            </Menu.Item>
            <Menu.Item key="sign-up">
              <Link to="/signup"> Sign up</Link>
            </Menu.Item>
          </Menu.SubMenu>
        ) : (
          <Menu.SubMenu
            title={
              <span className="submenu-title-wrNavBarer">
                <Icon type="user" />
                {username}
              </span>
            }
          >
            <Menu.Item key="profile">
              <Link to="/profile">Edit Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Icon type="logout" />
              Logout
            </Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.account.isAuthenticated,
  user: state.account.user
});

export default connect(
  mapStateToProps,
  { logout, loadShops }
)(withRouter(NavBar));
