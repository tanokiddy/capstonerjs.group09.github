import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <div
      style={{ padding: "12px" }}
      className="z-50 grid grid-cols-3 w-full  bg-white opacity-90 fixed border-b shadow"
    >
      <div className="flex items-center">
        <NavLink to="/">
          <img
            style={{ width: "40%", height: "40%" }}
            src="http://demo1.cybersoft.edu.vn/logo.png"
            alt="logoCybersoft"
          />
        </NavLink>
      </div>
      <div className="space-x-5 flex items-center justify-between">
        <a href="#nowShowing" className="text-black font-bold text-xl" to="">
          Now Showing
        </a>
        <a href="#TabMovie" className="text-black font-bold text-xl">
          Schedule
        </a>
        <NavLink to="/userTickets" className="text-black font-bold text-xl">
          Your Ticket
        </NavLink>
      </div>
      <div className="flex items-center justify-end">
        <UserNav />
      </div>
    </div>
  );
}
