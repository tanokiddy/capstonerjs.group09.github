import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <div className="container flex justify-between mx-auto my-10">
      <h1 className="animate-bounce font-bold text-5xl">Cybersoft</h1>
      <NavLink className="text-black font-bold" to="/">
        Lịch Chiếu
      </NavLink>
      <UserNav />
    </div>
  );
}
