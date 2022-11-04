import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getScheduleInfoByIdMovieAction } from "../../../redux/actions/movieAction";

export default function MovieDetail() {
  //SET UP STATE, REACT-HOOK METHOD AND CALL API TO GET DATA
  let { id } = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScheduleInfoByIdMovieAction(id));
  }, []);

  let movieDetail_Schedule = useSelector(
    (state) => state.movieReducer.movieDetail_Schedule
  );

  return (
    <div className="text-center flex justify-start container pt-28">
      <div className="w-1/5">
        <img
          className="object-contain"
          src={movieDetail_Schedule?.hinhAnh}
          alt=""
        />
      </div>
      <div className="ml-5 w-4/5 space-y-3 text-justify">
        <div className="text-xl pb-2 font-bold border-b border-gray-500 lg:w-1/2">
          {movieDetail_Schedule?.tenPhim?.toUpperCase()}
        </div>
        <div className="lg:w-1/2">
          <span className="font-bold">Showtimes: </span>
          {moment(movieDetail_Schedule?.ngayKhoiChieu).format(
            "DD//MM/YYYY - hh:mm"
          )}
        </div>
        <div>
          <span className="font-bold">Running time:</span> 120 phút
        </div>
        <div className="lg:w-1/2">
          <span className="font-bold">Description:</span>{" "}
          {movieDetail_Schedule?.moTa}
        </div>
      </div>
    </div>
  );
}
