import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <div
      style={{ padding: "12px" }}
      className="z-50 grid grid-cols-2 w-full bg-white opacity-90 fixed border-b shadow"
    >
      <div className="flex items-center">
        <NavLink to="/">
          <img
            style={{ width: "25%", height: "25%" }}
            src="http://demo1.cybersoft.edu.vn/logo.png"
            alt="logoCybersoft"
          />
        </NavLink>
      </div>
      <div className="flex items-center justify-end">
        <UserNav />
      </div>
    </div>
  );
}
