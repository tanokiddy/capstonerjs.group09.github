import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card } from "antd";
import { userServ } from "../../../services/userService";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../../redux/actions/loadingAction";

export default function UserTickets() {
  //SET UP STATE, REACT-HOOK METHOD AND CALL API TO GET DATA
  let dispatch = useDispatch();
  const [userTicket, setUserTicket] = useState({});

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
        dispatch(loadingOffAction());
      });
  }, []);

  //DESTRUCTURING thongTinDatVe in userTicket
  let { thongTinDatVe } = userTicket;

  //DECLARE FUNCTION TO RENDER TO LAYOUT
  const listUserTickets = () => {
    return thongTinDatVe?.map((ticket, index) => {
      return (
        <Card
          bordered="true"
          key={index}
          className="text-justify m-2 card"
          title={ticket.tenPhim}
          bodyStyle={{
            height: "80%",
            backgroundColor: "#434343",
            borderRadius: " 0 0 5px 5px",
            color: "white",
          }}
          headStyle={{
            background: "#ff4d4f",
            borderRadius: "5px 5px 0 0",
            fontSize: "20px",
          }}
        >
          <p>
            Showtimes: {moment(ticket.ngayDat).format("DD/MM/YYYY - hh:mm")}
          </p>

          <p>Theatre: {ticket.danhSachGhe[0]?.maHeThongRap}</p>
          <p>Screen: {ticket.danhSachGhe[0]?.tenCumRap}</p>

          <p className="truncate">
            Selected: Ghế{" "}
            {ticket.danhSachGhe.reduce((total, seatName) => {
              return (total += seatName.tenGhe + ", ");
            }, "")}
          </p>
        </Card>
      );
    });
  };

  return (
    <div className="container py-28 site-card-border-less-wrapper grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-2 gap-1">
      {listUserTickets()}
    </div>
  );
}
