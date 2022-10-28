import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import ItemTabMovie from "./ItemTabMovie";
import { movieServ } from "../../services/movieService";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";

export default function TabMovie() {
  const [tabMovie, setTabMovie] = useState([]);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingOnAction());
    movieServ
      .getScheduleMovieByTheatre()
      .then((res) => {
        console.log(res);
        setTabMovie(res.data.content);
        dispatch(loadingOffAction());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderTabMovie = () => {
    return tabMovie.map((theatreSystem, index) => {
      return (
        <Tabs.TabPane
          className="!pl-0"
          key={index}
          tab={
            <img
              alt="theatreSystem"
              className="sm:h-16 sm:w-16 h-6 w-6"
              src={theatreSystem.logo}
            ></img>
          }
        >
          <Tabs style={{ height: 500 }} tabPosition="left">
            {theatreSystem.lstCumRap.map((theatre, index) => {
              return (
                <Tabs.TabPane
                  tab={
                    <div className="text-left md:w-48 w-24">
                      <p className="truncate">{theatre.tenCumRap}</p>
                      <p className="truncate">{theatre.diaChi}</p>
                    </div>
                  }
                  key={index}
                >
                  <div
                    className="scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-32 overflow-y-scroll"
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
    <div id="TabMovie" className="container mb-2 py-20 border-t border-red-500">
      <Tabs
        className="border-black border"
        defaultActiveKey="1"
        tabPosition="left"
      >
        {renderTabMovie()}
      </Tabs>
    </div>
  );
}
