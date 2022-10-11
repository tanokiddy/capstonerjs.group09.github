import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <div className="container flex justify-between mx-auto my-10">
      <button
        disabled
        className="animate-bounce font-bold text-6xl text-yellow-500"
      >
        Cybersoft
      </button>
      <NavLink className="text-black font-bold text-3xl" to="/">
        Lịch Chiếu
      </NavLink>
      <UserNav />
    </div>
  );
}
