import React from "react";
import { NavLink } from "react-router-dom";
export default function Error403() {
  //DECLARE HANDLE FUNCTION
  const handleShowId = () => {
    let showId = document.getElementById("testId");
    if (showId.style.display === "none") {
      showId.style.display = "inline-block";
    } else {
      showId.style.display = "none";
    }
  };

  return (
    <div className="text-center pt-10 h-screen space-y-3">
      <div className="text-4xl font-bold">ACCESS DENIED</div>
      <div className="text-xl">
        You currently do not have permission to access this page
      </div>
      <NavLink to="/">
        <button className="p-2 rounded bg-blue-500 hover:bg-blue-700 duration-200 text-white mt-3">
          Back to Homepage
        </button>
      </NavLink>
      <br />
      <button
        onClick={() => {
          handleShowId();
        }}
        className="p-2 rounded bg-blue-500 hover:bg-blue-700 duration-200 text-white mt-3"
      >
        ID Test
      </button>
      <br />

      <div
        id="testId"
        className="font-bold text-xl"
        style={{ display: "none" }}
      >
        Account: admin - Password: admin
      </div>

      <img
        src="https://cdn.dribbble.com/users/1363329/screenshots/4341760/media/987fa3b52f9281b6239171c0dd1e3e69.jpg"
        alt=""
        className="mx-auto"
      />
    </div>
  );
}
