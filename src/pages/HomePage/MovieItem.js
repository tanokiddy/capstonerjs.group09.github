import React from "react";
import { NavLink } from "react-router-dom";

export default function MovieItem({ movie }) {
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
        <NavLink to={`/detail/${movie.maPhim}`}>
          <button className="rounded bg-red-500 text-white px-4 py-2 my-2">
            More Detail
          </button>
        </NavLink>
      </div>
    </div>
  );
}
