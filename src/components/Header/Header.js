import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <div className="fixed grid grid-cols-3 p-7 w-full z-50 bg-white opacity-90">
      <div className="flex items-center">
        <NavLink to="/">
          <img
            style={{ width: "40%", height: "40%" }}
            src="http://demo1.cybersoft.edu.vn/logo.png"
          />
        </NavLink>
      </div>
      <div className="space-x-5 flex items-center">
        <NavLink className="text-black font-bold text-xl" to="/">
          Schedule
        </NavLink>
        <NavLink className="text-black font-bold text-xl" to="/">
          News & Promotion
        </NavLink>{" "}
        <NavLink className="text-black font-bold text-xl" to="/">
          Ticket
        </NavLink>
      </div>
      <div className="flex items-center justify-end">
        <UserNav />
      </div>
    </div>
  );
}
