import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";
import { bookTicketAction } from "../../redux/actions/movieAction";
import { movieServ } from "../../services/movieService";

export default function BookingPage() {
  let { id } = useParams();
  const [movieBooking, setMovieBooking] = useState({});
  let dispatch = useDispatch();
  let seatState = useSelector((state) => state.movieReducer.seat);
  let bookingState = useSelector((state) => state.movieReducer.booking);
  console.log({ seatState, bookingState });
  useEffect(() => {
    dispatch(loadingOnAction());
    movieServ
      .getListTheatre(id)
      .then((res) => {
        console.log("res", res);
        setMovieBooking(res.data.content);
        dispatch(loadingOffAction());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBookNow = () => {
    console.log(bookingState);
    dispatch(loadingOnAction());
    movieServ
      .postBookingTicket(bookingState)
      .then((res) => {
        console.log(res);
        dispatch(loadingOffAction());
        alert("Đặt vé thành công");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderBookingPage = () => {
    // console.log("movieBooking", movieBooking);
    let { thongTinPhim, danhSachGhe } = movieBooking;
    return (
      <div className="flex">
        <div className="w-2/3 px-5 grid grid-cols-10 gap-5">
          {danhSachGhe?.map((seat, index) => {
            let statusSeat = seat?.daDat;
            let typeOfSeat = seat?.loaiGhe;
            if (statusSeat === false && typeOfSeat === "Thuong") {
              return (
                <button
                  onClick={() => {
                    dispatch(bookTicketAction(seat, thongTinPhim));
                  }}
                  key={index}
                  className="rounded py-1 bg-gray-300 hover:bg-gray-200 duration-200 text-black"
                >
                  {seat?.tenGhe}
                </button>
              );
            } else if (statusSeat === false && typeOfSeat === "Vip") {
              return (
                <button
                  onClick={() => {
                    dispatch(bookTicketAction(seat, thongTinPhim));
                  }}
                  key={index}
                  className="rounded py-1 bg-orange-400 hover:bg-gray-200 duration-200 text-black"
                >
                  {seat?.tenGhe}
                </button>
              );
            } else if (statusSeat === true) {
              return (
                <button
                  key={index}
                  disabled
                  className="rounded py-1 bg-gray-500 text-black"
                >
                  <span>X</span>
                </button>
              );
            }
          })}
        </div>
        <div className="w-1/3">
          <table className="table p-5 border shadow ">
            <thead>
              <tr>
                <th
                  style={{ borderBottom: 0 }}
                  className="text-center text-2xl"
                >
                  {seatState.giaVe ? (
                    <span> {seatState?.giaVe?.toLocaleString()} VND</span>
                  ) : (
                    <span>0 VND</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="flex justify-between">
                  Theatre:{" "}
                  <span className="text-right">{thongTinPhim?.tenCumRap}</span>
                </th>
              </tr>
              <tr>
                <th className="flex justify-between">
                  Address:{" "}
                  <span className="text-right">{thongTinPhim?.diaChi}</span>
                </th>
              </tr>
              <tr>
                <th className="flex justify-between">
                  Screen:{" "}
                  <span className="text-right">{thongTinPhim?.tenRap}</span>
                </th>
              </tr>
              <tr>
                <th className="flex justify-between">
                  Showtimes:{" "}
                  <span className="text-right">
                    {thongTinPhim?.gioChieu} - {thongTinPhim?.ngayChieu}
                  </span>
                </th>
              </tr>
              <tr>
                <th className="flex justify-between">
                  Movie name:{" "}
                  <span className="text-right">{thongTinPhim?.tenPhim}</span>
                </th>
              </tr>
              <tr>
                <th className="flex justify-between">
                  Selected:{" "}
                  {seatState.tenGhe ? (
                    <span className="text-right">Ghế {seatState?.tenGhe}</span>
                  ) : (
                    <></>
                  )}
                </th>
              </tr>
              <tr>
                <th>
                  <button
                    onClick={() => {
                      handleBookNow(bookingState);
                    }}
                    className="bg-red-500 text-white text-2xl w-full py-2"
                  >
                    BOOK NOW
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  return <div className="">{renderBookingPage()}</div>;
}
