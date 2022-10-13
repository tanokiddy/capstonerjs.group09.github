import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function MovieItem({ movie }) {
  let user = useSelector((state) => state.userReducer.userInfo);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-96 h-96"
        src={movie.hinhAnh}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
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
            <button className="rounded bg-red-500 text-white px-4 py-2 w-full my-auto">
              More Detail
            </button>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <button className="rounded bg-red-500 text-white px-4 py-2 w-full my-auto">
              More Detail
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
