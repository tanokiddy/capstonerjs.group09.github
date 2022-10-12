import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";

export default function ItemTabMovie({ movie }) {
  return (
    <div className="flex space-x-5 border-b border-red-500 p-3">
      <img
        src={movie.hinhAnh}
        alt="hinhAnh"
        className="w-28 h-36 object-cover mr-3"
      />
      <div className="flex-grow">
        <p>{movie.tenPhim}</p>
        <div className="grid grid-cols-3 gap-5">
          {movie.lstLichChieuTheoPhim.slice(0, 6).map((gioChieu, index) => {
            return (
              <NavLink key={index} to={`/purchase/${gioChieu.maLichChieu}`}>
                <div
                  type="button"
                  className="p-3 rounded bg-red-600 text-white"
                >
                  {moment(gioChieu.ngayChieuGioChieu).format(
                    "DD/MM/YYYY - hh:mm"
                  )}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
