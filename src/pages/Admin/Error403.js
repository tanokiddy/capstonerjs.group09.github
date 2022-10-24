import React from "react";
import { NavLink } from "react-router-dom";
export default function Error403() {
  return (
    <div className="text-center pt-10 h-screen space-y-3">
      <div className="text-4xl font-bold">ACCESS DENIED</div>
      <div className="text-xl">
        You currently do not have permission to access this page
      </div>
      <NavLink to="/">
        <button className="p-2 rounded bg-blue-500 text-white mt-3">
          Back to Homepage
        </button>
      </NavLink>
      <img
        src="https://cdn.dribbble.com/users/1363329/screenshots/4341760/media/987fa3b52f9281b6239171c0dd1e3e69.jpg"
        alt=""
        className="mx-auto"
      />
    </div>
  );
}
