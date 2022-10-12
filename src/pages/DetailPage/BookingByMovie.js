import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import { movieServ } from "../../services/movieService";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";

export default function BookingByMovie() {
  const [booking, setBooking] = useState([]);
  let { id } = useParams();
  let dispatch = useDispatch();
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

  const renderBookingByMovie = () => {
    // console.log("booking", booking.heThongRapChieu);
    return booking.map((heThongRapChieu, index) => {
      return (
        <Tabs.TabPane
          tab={
            <img
              alt="logo"
              src={heThongRapChieu.logo}
              className="w-16 h-16"
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
                    <div className="text-left w-48">
                      <p className="truncate">{cumRapChieu.tenCumRap}</p>
                      <p className="truncate">{cumRapChieu.diaChi}</p>
                    </div>
                  }
                >
                  <div className="grid grid-cols-3 gap-5">
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
    <div className="container my-5">
      <Tabs tabPosition="left" defaultActiveKey="1">
        {renderBookingByMovie()}
      </Tabs>
    </div>
  );
}
