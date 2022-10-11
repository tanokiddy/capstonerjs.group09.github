import { Tabs } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { TOKEN_CYBERSOFT } from "../../services/configURL";
import moment from "moment";

export default function BookingByMovie() {
  const [booking, setBooking] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    axios({
      baseURL: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    })
      .then((res) => {
        console.log(res);
        setBooking(res.data.content.heThongRapChieu);
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
          tab={<img src={heThongRapChieu.logo} className="w-16 h-16"></img>}
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
                                "DD/MM/YYYY ~ hh:mm"
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
