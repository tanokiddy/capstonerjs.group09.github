import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../../redux/actions/loadingAction";
import { movieServ } from "../../../services/movieService";

export default function DetailMovie() {
  //SET UP STATE, REACT-HOOK METHOD AND CALL API TO GET DATA
  let { id } = useParams();
  let dispatch = useDispatch();
  let [detailMovie, setDetailMovie] = useState({});

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
        dispatch(loadingOffAction());
      });
  }, []);

  return (
    <div className="text-center flex justify-start container pt-28">
      <div className="w-1/5">
        <img className="object-contain" src={detailMovie?.hinhAnh} alt="" />
      </div>
      <div className="ml-5 w-4/5 space-y-3 text-justify">
        <div className="text-xl pb-2 font-bold border-b border-gray-500 lg:w-1/2">
          {detailMovie?.tenPhim?.toUpperCase()}
        </div>
        <div className="lg:w-1/2">
          <span className="font-bold">Showtimes: </span>
          {moment(detailMovie?.ngayKhoiChieu).format("DD//MM/YYYY - hh:mm")}
        </div>
        <div>
          <span className="font-bold">Running time:</span> 120 phút
        </div>
        <div className="lg:w-1/2">
          <span className="font-bold">Description:</span> {detailMovie?.moTa}
        </div>
      </div>
    </div>
  );
}
