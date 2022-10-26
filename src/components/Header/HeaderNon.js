import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <div className="p-[12px] grid w-full grid-cols-2 bg-white opacity-90 border-b shadow z-50">
      <div className="flex items-center">
        <NavLink to="/">
          <img
            src="http://demo1.cybersoft.edu.vn/logo.png"
            alt="logoCybersoft"
            className="w-5/12 h-5/12"
          />
        </NavLink>
      </div>
      <div className="flex items-center justify-end">
        <UserNav />
      </div>
    </div>
  );
}
