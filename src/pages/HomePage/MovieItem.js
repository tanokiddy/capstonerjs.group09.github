import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
export default function MovieItem({ movie }) {
  let user = useSelector((state) => state.userReducer.userInfo);
  return (
    <div
      type="button"
      id="movieItem"
      className="max-w-sm rounded overflow-hidden shadow-lg"
      data-toggle="modal"
      data-target={"#model" + movie.maPhim}
    >
      <div className="relative">
        <img
          className="w-96 h-96"
          src={movie.hinhAnh}
          alt="Sunset in the mountains"
        />
        <i
          style={{
            top: "40%",
            left: "37%",
            fontSize: "40px",
            color: "white",
            border: "2px solid white",
            padding: "10px 20px",
            borderRadius: "50%",
            opacity: 0,
          }}
          className="fa fa-caret-right absolute "
        ></i>
      </div>
      <div
        className="modal fade"
        id={"model" + movie.maPhim}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <ReactPlayer height="500px" controls={true} url={movie.trailer} />
          </div>
        </div>
      </div>
      <div id="movieText" className="px-6 pt-4">
        <div className="font-bold text-xl mb-2 truncate">
          <span className="text-white text-lg rounded bg-red-500 font-normal mr-1 p-1">
            C18
          </span>
          {movie.tenPhim}
        </div>
        <p className="text-gray-700 text-base truncate">{movie.moTa}</p>
      </div>
      <div className="text-center">
        {user ? (
          <NavLink to={`/detail/${movie.maPhim}`}>
            <button
              id="moreDetail"
              style={{ display: "none" }}
              className="rounded bg-red-500 text-white px-4 py-4 w-full"
            >
              More Detail
            </button>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <button
              id="moreDetail"
              style={{ display: "none" }}
              className="rounded bg-red-500 text-white px-4 py-4 w-full"
            >
              More Detail
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
