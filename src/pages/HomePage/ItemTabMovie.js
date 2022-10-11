import React from "react";
import moment from "moment";

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
              <div className="p-3 rounded bg-red-600 text-white" key={index}>
                {moment(gioChieu.ngayChieuGioChieu).format(
                  "DD/MM/YYYY ~ hh:mm"
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
