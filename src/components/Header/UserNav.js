import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { localServ } from "../../services/localService";
import { Menu } from "antd";

export default function UserNav() {
  let user = useSelector((state) => {
    return state.userReducer.userInfo;
  });
  const handleLogOut = () => {
    localServ.user.removeDataUser();
    window.location.href = "/";
  };
  let renderUserNav = () => {
    if (user) {
      return (
        <div className="space-x-5 flex items-center">
          <Menu selectable defaultSelectedKeys mode="horizontal">
            <Menu.SubMenu
              className="text-xl font-bold my-auto"
              key="subMenu"
              title={user.hoTen}
            >
              <Menu.Item>
                <NavLink to="/profile">My Profile</NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to="/userTickets">My Tickets</NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink>Administrator</NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
          <button
            onClick={() => {
              handleLogOut();
            }}
            className="bg-gray-500 duration-200 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white"
          >
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div className="space-x-5 flex items-center">
          <NavLink to="/login">
            <button className="bg-red-500 duration-200 hover:bg-red-700 px-4 py-2 rounded font-bold text-white">
              Sign In
            </button>
          </NavLink>

          <NavLink to="/register">
            <button className="bg-blue-500 duration-200 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white">
              Sign Up
            </button>
          </NavLink>
        </div>
      );
    }
  };
  return <div>{renderUserNav()}</div>;
}
