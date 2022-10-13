import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { localServ } from "../../services/localService";

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
          <h1 className="text-xl font-bold underline my-auto">{user.hoTen}</h1>

          <button
            onClick={() => {
              handleLogOut();
            }}
            className="bg-blue-500 duration-200 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white"
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="space-x-5 flex items-center">
          <NavLink to="/login">
            <button className="bg-red-500 duration-200 hover:bg-red-700 px-4 py-2 rounded font-bold text-white">
              Login
            </button>
          </NavLink>

          <NavLink to="/register">
            <button className="bg-blue-500 duration-200 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white">
              Register
            </button>
          </NavLink>
        </div>
      );
    }
  };
  return <div>{renderUserNav()}</div>;
}
