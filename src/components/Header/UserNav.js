import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { localServ } from "../../services/localService";
import { Dropdown, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function UserNav() {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 600) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 600) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

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
  const menu1 = (
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
        {
          label: (
            <span
              onClick={() => {
                handleLogOut();
              }}
              className="font-bold sm:text-base text-sm"
            >
              Sign out
            </span>
          ),
          key: "tickets",
        },
      ]}
    />
  );

  if (user) {
    if (isDesktop) {
      return (
        <div className="space-x-2 flex items-center">
          <Dropdown
            overlay={menu}
            className="2xl:text-4xl lg:text-3xl text-xl font-bold"
          >
            {user.hoTen.length < 6 ? (
              <Space type="button">
                <UserOutlined className="mb-2" />
                {user.hoTen}
                <ChevronDownIcon
                  className="h-7 w-7 text-gray-700"
                  aria-hidden="true"
                />
              </Space>
            ) : (
              <Space type="button">
                <UserOutlined className="mb-2" />
                <span>{user.hoTen.slice(0, 6)}...</span>
                <ChevronDownIcon
                  className="h-7 w-7 text-gray-700"
                  aria-hidden="true"
                />
              </Space>
            )}
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
        <div className="space-x-2 flex items-center">
          <Dropdown
            overlay={menu1}
            className="2xl:text-4xl lg:text-3xl text-xl font-bold"
          >
            {user.hoTen.length < 6 ? (
              <Space type="button">
                <UserOutlined className="mb-2" />
                {user.hoTen}
                <ChevronDownIcon
                  className="h-7 w-7 text-gray-700"
                  aria-hidden="true"
                />
              </Space>
            ) : (
              <Space type="button">
                <UserOutlined className="mb-2" />
                <span>{user.hoTen.slice(0, 6)}...</span>
                <ChevronDownIcon
                  className="h-7 w-7 text-gray-700"
                  aria-hidden="true"
                />
              </Space>
            )}
          </Dropdown>
        </div>
      );
    }
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
}
