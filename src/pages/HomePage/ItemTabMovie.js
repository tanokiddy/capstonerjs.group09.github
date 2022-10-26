import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ItemTabMovie({ movie }) {
  let user = useSelector((state) => state.userReducer.userInfo);
  return (
    <div className="flex  border-b border-red-500 p-3">
      <img
        src={movie.hinhAnh}
        alt="hinhAnh"
        className="sm:w-10 sm:h-16 md:w-28 md:h-36 mr-3 sm:object-cover w-0 h-0"
      />
      <div className="flex-grow">
        <p>{movie.tenPhim}</p>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-1 lg:gap-2">
          {movie.lstLichChieuTheoPhim.slice(0, 6).map((gioChieu, index) => {
            return user ? (
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
            ) : (
              <NavLink key={index} to="/login">
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
