import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { localServ } from "../../services/localService";
import { Dropdown, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
export default function UserNav() {
  let user = useSelector((state) => {
    return state.userReducer.userInfo;
  });
  const handleLogOut = () => {
    localServ.user.removeDataUser();
    window.location.href = "/";
  };
  const onClick = ({ key }) => {};
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: (
            <NavLink className="font-bold text-md" to="/profile">
              My Profile
            </NavLink>
          ),
          key: "profile",
        },
        {
          label: (
            <NavLink className="font-bold text-md" to="/userTickets">
              My Tickets
            </NavLink>
          ),
          key: "tickets",
        },
        {
          label: (
            <NavLink className="font-bold text-md" to="/admin">
              Administrator
            </NavLink>
          ),
          key: "admin",
        },
      ]}
    />
  );

  let renderUserNav = () => {
    if (user) {
      return (
        <div className="space-x-5 flex items-center">
          <Dropdown overlay={menu} className="text-2xl font-bold">
            {/* <a onClick={(e) => e.preventDefault()}> */}
            <Space type="button">
              <UserOutlined className="mb-2" />
              {user.hoTen}
            </Space>
            {/* </a> */}
          </Dropdown>
          {/* <Menu mode="horizontal">
            <Menu.SubMenu
              className="text-xl font-bold my-auto"
              key="SubMenu"
              title={user.hoTen}
            >
              <Menu.Item key="profile">
                <NavLink to="/profile">My Profile</NavLink>
              </Menu.Item>
              <Menu.Item key="ticket">
                <NavLink to="/userTickets">My Tickets</NavLink>
              </Menu.Item>
              <Menu.Item key="admin">
                <NavLink to="/admin">Administrator</NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu> */}
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
