import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <div className="p-[12px] grid lg:grid-cols-3 w-full grid-cols-2 bg-white opacity-90 fixed border-b shadow z-50">
      <div className="flex items-center">
        <NavLink to="/">
          <img
            src="http://demo1.cybersoft.edu.vn/logo.png"
            alt="logoCybersoft"
            className="w-5/12 h-5/12"
          />
        </NavLink>
      </div>
      <div className="lg:flex hidden items-center justify-between">
        <a href="#nowShowing" className="text-black font-bold text-xl" to="">
          Now Showing
        </a>
        <a href="#TabMovie" className="text-black font-bold text-xl">
          Schedule
        </a>
        <NavLink to="/userTickets" className="text-black font-bold text-xl">
          My Tickets
        </NavLink>
      </div>
      <div className="flex items-center justify-end">
        <UserNav />
      </div>
    </div>
  );
}
