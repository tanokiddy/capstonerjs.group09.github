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
        <a href="#schedule" className="text-black font-bold text-xl" to="">
          Schedule
        </a>
        <NavLink className="text-black font-bold text-xl" to="/">
          News & Promotion
        </NavLink>{" "}
        <a className="text-black font-bold text-xl" href="#TabMovie">
          Ticket
        </a>
      </div>
      <div className="flex items-center justify-end">
        <UserNav />
      </div>
    </div>
  );
}
