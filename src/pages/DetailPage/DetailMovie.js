import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TOKEN_CYBERSOFT } from "../../services/configURL";

export default function DetailMovie() {
  let [detailMovie, setDetailMovie] = useState({});
  let { id } = useParams();
  useEffect(() => {
    axios({
      baseURL: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    })
      .then((res) => {
        console.log(res);
        setDetailMovie(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="text-center grid grid-cols-4 container">
      <div className="flex">
        <img className="w-full h-full" src={detailMovie?.hinhAnh} alt="" />
      </div>
      <div className="text-left ml-5 my-auto">
        <h6>{detailMovie?.ngayKhoiChieu}</h6>
        <h4>{detailMovie?.tenPhim}</h4>
        <h6>120 phút</h6>
        <button className="rounded px-4 py-2 bg-red-500 text-white">
          Booking
        </button>
      </div>
      <div className=""></div>
    </div>
  );
}
