import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { localServ } from "../../services/localService";
import { Dropdown, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function UserNav() {
  let user = useSelector((state) => {
    return state.userReducer.userInfo;
  });
  const handleLogOut = () => {
    localServ.user.removeDataUser();
    window.location.href = "/";
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <NavLink className="font-bold sm:text-base text-sm" to="/profile">
              My Profile
            </NavLink>
          ),
          key: "profile",
        },
        {
          label: (
            <NavLink
              className="font-bold sm:text-base text-sm"
              to="/userTickets"
            >
              My Tickets
            </NavLink>
          ),
          key: "tickets",
        },
        {
          label:
            user?.maLoaiNguoiDung.toUpperCase() === "QUANTRI" ? (
              <NavLink className="font-bold sm:text-base text-sm" to="/admin">
                Administrator
              </NavLink>
            ) : (
              <NavLink to="/admin">
                <button className="font-bold sm:text-base text-sm text-gray-300">
                  Administrator
                </button>
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
          <Dropdown overlay={menu} className="2xl:text-4xl text-3xl font-bold">
            <Space type="button">
              <UserOutlined className="mb-2" />
              {user.hoTen}
              <ChevronDownIcon
                className="h-7 w-7 text-gray-700"
                aria-hidden="true"
              />
            </Space>
          </Dropdown>
          <button
            onClick={() => {
              handleLogOut();
            }}
            className="bg-gray-500 duration-200 hover:bg-gray-700 px-2 py-1 md:!px-4 md:!py-2 2xl:!px-6 2xl:!py-4 rounded font-bold text-white 2xl:text-xl"
          >
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div className="space-x-3 flex items-center">
          <NavLink to="/login">
            <button className="bg-red-500 duration-200 hover:bg-red-700 px-2 py-1 md:!px-4 md:!py-2 2xl:!px-6 2xl:!py-4 rounded font-bold text-white 2xl:text-xl">
              Sign In
            </button>
          </NavLink>

          <NavLink to="/register">
            <button className="bg-blue-500 duration-200 hover:bg-blue-700 px-2 py-1 md:!px-4 md:!py-2 2xl:!px-6 2xl:!py-4 rounded font-bold text-white 2xl:text-xl">
              Sign Up
            </button>
          </NavLink>
        </div>
      );
    }
  };
  return <div>{renderUserNav()}</div>;
}
