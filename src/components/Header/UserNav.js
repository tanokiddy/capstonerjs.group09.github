import React from "react";
import { NavLink } from "react-router-dom";

export default function UserNav() {
  return (
    <div className="space-x-5">
      <NavLink to="/login">
        <button className="bg-red-500 hover:bg-red-700  px-4 py-2 duration-200 rounded font-bold text-white">
          Login
        </button>
      </NavLink>
      <button className="bg-blue-500 duration-200 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white">
        Register
      </button>
    </div>
  );
}
