import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import MovieItem from "./MovieItem";
import { Pagination } from "antd";
import { movieServ } from "../../../services/movieService";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../../redux/actions/loadingAction";

const pageSize = 10;

export default function MovieList() {
  //SET UP STATE, REACT-HOOK METHOD AND CALL API TO GET DATA
  let dispatch = useDispatch();
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState({
    data: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });

  useEffect(() => {
    dispatch(loadingOnAction());
    movieServ
      .getListMovie()
      .then((res) => {
        console.log(res);
        setMovie(res.data.content);
        dispatch(loadingOffAction());
        setPage({
          ...page,
          data: res.data.content,
          totalPage: res.data.content.length / pageSize,
          minIndex: 0,
          maxIndex: pageSize,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadingOffAction());
      });
  }, []);

  //BUILD METHOD
  const handleOnChange = (page1) => {
    setPage({
      ...page,
      current: page1,
      minIndex: (page1 - 1) * pageSize,
      maxIndex: page1 * pageSize,
    });
  };

  //DECLARE FUNCTION TO RENDER TO LAYOUT
  const renderMovie = () => {
    return movie?.map((movie, index) => {
      return (
        index >= page.minIndex &&
        index < page.maxIndex && <MovieItem key={index} movie={movie} />
      );
    });
  };

  return (
    <div id="nowShowing" className="container pt-[82px] pb-2 mb-5 ">
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4 mb-3 relative ">
        {renderMovie()}
      </div>
      <div className="flex justify-center">
        <Pagination
          pageSize={pageSize}
          current={page.current}
          total={page.data.length}
          onChange={handleOnChange}
          className="absolute"
        />
      </div>
    </div>
  );
}
