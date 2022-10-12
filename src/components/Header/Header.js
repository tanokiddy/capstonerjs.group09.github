import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <div className="container flex justify-between mx-auto my-10">
      <NavLink to="/">
        <button className="animate-bounce font-bold text-4xl text-yellow-500">
          Cybersoft
        </button>
      </NavLink>
      <div className="space-x-5">
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
      <UserNav />
    </div>
  );
}
