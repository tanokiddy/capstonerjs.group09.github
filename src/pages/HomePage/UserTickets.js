import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";
import { userServ } from "../../services/userService";

export default function UserTickets() {
  const [userTicket, setUserTicket] = useState({});
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingOnAction());
    userServ
      .userTicket()
      .then((res) => {
        console.log(res);
        setUserTicket(res.data.content);
        dispatch(loadingOffAction());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let { thongTinDatVe } = userTicket;
  console.log("thongTinDatVe: ", thongTinDatVe);
  const listUserTickets = () => {
    return thongTinDatVe?.map((ticket, index) => {
      return (
        <div
          key={index}
          className="justify-center max-w-sm w-full lg:max-w-full lg:flex"
        >
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{ backgroundImage: `url("${ticket.hinhAnh}")` }}
          ></div>
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">
                {ticket.tenPhim}
              </div>
            </div>
            <div className="flex items-center">
              <div key="" className="text-sm">
                <p className="text-gray-900 leading-none">
                  Showtimes:{" "}
                  {moment(ticket.ngayDat).format("DD/MM/YYYY - hh:mm")}
                </p>
                <p className="text-gray-900 leading-none">
                  Theatre: {ticket.danhSachGhe[0]?.maHeThongRap}
                </p>
                <p className="text-gray-900 leading-none">
                  Screen: {ticket.danhSachGhe[0]?.tenCumRap}
                </p>
                <p className="text-gray-900 leading-none">
                  Selected: Ghế{" "}
                  {ticket.danhSachGhe.reduce((total, seat) => {
                    return (total += seat.tenGhe + ", ");
                  }, "")}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container py-20 grid grid-cols-2 gap-3">
      {listUserTickets()}
    </div>
  );
}
