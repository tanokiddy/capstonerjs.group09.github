import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";
import { movieServ } from "../../services/movieService";

export default function DetailMovie() {
  let [detailMovie, setDetailMovie] = useState({});
  let { id } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingOnAction());
    movieServ
      .getScheduleInfoByIdMovie(id)
      .then((res) => {
        console.log(res);
        setDetailMovie(res.data.content);
        dispatch(loadingOffAction());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="text-center grid grid-cols-4 container pt-20">
      <div className="flex">
        <img className="w-full h-full" src={detailMovie?.hinhAnh} alt="" />
      </div>
      <div className="text-left ml-5 my-auto">
        <h6>
          {moment(detailMovie?.ngayKhoiChieu).format("DD//MM/YYYY - hh:mm")}
        </h6>
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
