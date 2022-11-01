import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../../redux/actions/loadingAction";
import { bookTicketAction } from "../../../redux/actions/movieAction";
import { movieServ } from "../../../services/movieService";

export default function BookingPage() {
  //SET UP STATE, REACT-HOOK METHOD AND CALL API TO GET DATA
  let { id } = useParams();
  let dispatch = useDispatch();
  const [movieBooking, setMovieBooking] = useState({});

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

  //GET DATA FROM STORE-REDUX
  let seatState = useSelector((state) => state.movieReducer.seat);
  let bookingState = useSelector((state) => state.movieReducer.booking);

  //DECLARE HANDLE FUNCTION
  const handleBookNow = () => {
    dispatch(loadingOnAction());
    movieServ
      .postBookingTicket(bookingState)
      .then((res) => {
        console.log(res);
        dispatch(loadingOffAction());
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Booking Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadingOffAction());
      });
  };

  //DESTRUCTURING thongTinPhim + danhSachGhe in movieBooking
  let { thongTinPhim, danhSachGhe } = movieBooking;

  //DECLARE FUNCTION TO RENDER TO LAYOUT
  const renderSeatBooking = () => {
    return (
      <div className="w-3/5">
        <div className="px-5">
          <div className=" py-3 text-2xl bg-gray-500 text-white mb-3 text-center">
            SCREEN
          </div>
        </div>
        <div className="md:px-5 px-2 grid grid-cols-10 lg:gap-5 gap-1">
          {danhSachGhe?.map((seat, index) => {
            let statusSeat = seat?.daDat;
            let typeOfSeat = seat?.loaiGhe;
            let index1 = seatState.findIndex((item) => {
              return item.maGhe === seat.maGhe;
            });
            if (statusSeat === false && typeOfSeat === "Thuong") {
              return (
                <button
                  onClick={() => {
                    dispatch(bookTicketAction(seat, thongTinPhim));
                  }}
                  key={index}
                  style={index1 !== -1 ? { backgroundColor: "green" } : {}}
                  className="rounded py-1 bg-gray-300 hover:bg-gray-200 duration-200 text-black md:text-base text-[9px]"
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
                  style={
                    index1 !== -1
                      ? {
                          backgroundColor: "green",
                        }
                      : {}
                  }
                  className="rounded py-1 bg-orange-400 hover:bg-gray-200 duration-200 text-black md:text-base text-[9px]"
                >
                  {seat?.tenGhe}
                </button>
              );
            } else if (statusSeat === true) {
              return (
                <button
                  key={index}
                  disabled
                  className="rounded py-1 bg-gray-500 text-black md:text-base text-[9px]"
                >
                  <span>X</span>
                </button>
              );
            }
          })}
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-1 my-3 px-5 space-y-2">
          <div className="flex justify-start items-center">
            <div
              style={{ width: "30px", height: "30px" }}
              className="mr-1 rounded bg-gray-300 text-black md:text-base text-[9px]"
            ></div>
            <span>Standard</span>
          </div>
          <div className="flex justify-start items-center">
            <div
              style={{ width: "30px", height: "30px" }}
              className="mr-1 rounded bg-orange-500 text-black md:text-base text-[9px]"
            ></div>
            <span>VIP</span>
          </div>
          <div className="flex justify-start items-center">
            <div
              style={{ width: "30px", height: "30px" }}
              className="mr-1 rounded bg-green-700 text-black md:text-base text-[9px]"
            ></div>
            <span>Checked</span>
          </div>
          <div className="flex justify-start items-center">
            <div
              style={{ width: "30px", height: "30px" }}
              className="mr-1 pt-1 text-center rounded bg-gray-500 text-black md:text-base text-[9px]"
            >
              X
            </div>
            <span>Occupied</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTicketBooking = () => {
    return (
      <div className="w-2/5">
        <table className="table p-5 border shadow md:text-sm text-[9px]">
          <thead>
            <tr>
              <th className="text-center md:text-2xl text-base w-full !border-b-0">
                <span>
                  {seatState
                    .reduce(
                      (total, seatStateItem) => seatStateItem?.giaVe + total,
                      0
                    )
                    .toLocaleString()}
                  VND
                </span>
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
                {seatState[0]?.tenGhe ? (
                  <span className="text-right">
                    Ghế{" "}
                    {seatState.map((seatStateItem) => {
                      return `${seatStateItem?.tenGhe}, `;
                    })}
                  </span>
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
    );
  };
  return (
    <div className="pt-24 flex max-w-full">
      {renderSeatBooking()}
      {renderTicketBooking()}
    </div>
  );
}
