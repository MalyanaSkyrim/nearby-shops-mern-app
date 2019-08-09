import { Menu, Icon } from "antd";

import React, { useState, useEffect, useContext } from "react";
import { __RouterContext } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state_management/actions/accountAction";

const useRouter = () => {
  return useContext(__RouterContext);
};

const NavBar = props => {
  const { location, history } = useRouter();
  const [current, setCurrent] = useState("home");
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  const username = useSelector(state => state.account.user.username);

  const dispatch = useDispatch();
  const logOut = () => dispatch(logout());

  const handleClick = async e => {
    setCurrent(e.key);
    if (e.key === "logout") {
      await logOut();
      history.push("/signin");
    }
  };

  useEffect(() => {
    let pathname = location.pathname.substring(1);
    if (pathname === "") pathname = "home";
    setCurrent(pathname);
  }, [location.pathname]);

  return (
    <Menu
      className="nav-bar"
      onClick={handleClick}
      selectedKeys={[current]}
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
          key="profile"
          title={
            <span className="submenu-title-wrNavBarer">
              <Icon type="user" />
              Account
            </span>
          }
        >
          <Menu.Item key="signin">
            <Link to="/signin">Sign in</Link>
          </Menu.Item>
          <Menu.Item key="signup">
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
};

export default NavBar;
