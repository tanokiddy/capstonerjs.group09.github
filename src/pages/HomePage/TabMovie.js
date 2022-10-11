import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { TOKEN_CYBERSOFT } from "../../services/configURL";
import ItemTabMovie from "./ItemTabMovie";

export default function TabMovie() {
  const [tabMovie, setTabMovie] = useState([]);
  useEffect(() => {
    axios({
      baseURL: ` https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    })
      .then((res) => {
        console.log(res);
        setTabMovie(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderTabMovie = () => {
    return tabMovie.map((theatreSystem, index) => {
      return (
        <Tabs.TabPane
          key={index}
          tab={
            <img
              alt="theatreSystem"
              className="h-16 w-16"
              src={theatreSystem.logo}
            ></img>
          }
        >
          <Tabs style={{ height: 500 }} tabPosition="left">
            {theatreSystem.lstCumRap.map((theatre, index) => {
              return (
                <Tabs.TabPane
                  tab={
                    <div className="text-left w-48">
                      <p className="truncate">{theatre.tenCumRap}</p>
                      <p className="truncate">{theatre.diaChi}</p>
                    </div>
                  }
                  key={index}
                >
                  <div
                    className="scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-32 overflow-y-scroll "
                    style={{ height: 500, overflowY: "scroll" }}
                  >
                    {theatre.danhSachPhim.map((movie, index) => {
                      return <ItemTabMovie key={index} movie={movie} />;
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
    <div className="container my-2">
      <Tabs defaultActiveKey="1" tabPosition="left">
        {renderTabMovie()}
      </Tabs>
    </div>
  );
}
