import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../../redux/actions/loadingAction";
import { movieServ } from "../../../services/movieService";

export default function BookingByMovie() {
  //SET UP STATE, REACT-HOOK METHOD AND CALL API TO GET DATA
  let { id } = useParams();
  let dispatch = useDispatch();
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    dispatch(loadingOnAction());
    movieServ
      .getScheduleInfoByIdMovie(id)
      .then((res) => {
        console.log(res);
        setBooking(res.data.content.heThongRapChieu);
        dispatch(loadingOffAction());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //DECLARE FUNCTION TO RENDER TO LAYOUT
  const renderBookingByMovie = () => {
    return booking.map((heThongRapChieu, index) => {
      return (
        <Tabs.TabPane
          className="!pl-0"
          tab={
            <img
              alt="logo"
              src={heThongRapChieu.logo}
              className="sm:h-16 sm:w-16 h-5 w-5"
            ></img>
          }
          key={index}
        >
          <Tabs tabPosition="left">
            {heThongRapChieu.cumRapChieu.map((cumRapChieu, index) => {
              return (
                <Tabs.TabPane
                  key={index}
                  tab={
                    <div className="text-left md:w-48 w-28">
                      <p className="truncate">{cumRapChieu.tenCumRap}</p>
                      <p className="truncate">{cumRapChieu.diaChi}</p>
                    </div>
                  }
                >
                  <div className="grid md:grid-cols-3 md:gap-2 grid-cols-1 gap-1">
                    {cumRapChieu.lichChieuPhim
                      .slice(0, 6)
                      .map((movie, index) => {
                        return (
                          <NavLink
                            key={index}
                            to={`/purchase/${movie.maLichChieu}`}
                          >
                            <div
                              type="button"
                              className="p-3 rounded bg-red-600 text-white"
                            >
                              {moment(movie.ngayChieuGioChieu).format(
                                "DD/MM/YYYY - hh:mm"
                              )}
                            </div>
                          </NavLink>
                        );
                      })}
                  </div>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Tabs.TabPane>
      );
    });
  };

  return (
    <div className="container w-full mx-auto my-5">
      <Tabs tabPosition="left">{renderBookingByMovie()}</Tabs>
    </div>
  );
}
