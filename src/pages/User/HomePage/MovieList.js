import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieItem from "./MovieListItem";
import { Pagination } from "antd";
import { getListMovieAction } from "../../../redux/actions/movieAction";

const pageSize = 10;

export default function MovieList() {
  //SET UP STATE, REACT-HOOK METHOD AND CALL API TO GET DATA
  let dispatch = useDispatch();
  const [page, setPage] = useState({
    data: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });

  useEffect(() => {
    dispatch(getListMovieAction());
  }, []);

  let movieList = useSelector((state) => state.movieReducer.movieList);

  useEffect(() => {
    setPage({
      ...page,
      data: movieList,
      totalPage: movieList.length / pageSize,
      minIndex: 0,
      maxIndex: pageSize,
    });
  }, [movieList]);
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
    return movieList?.map((movie, index) => {
      return (
        index >= page.minIndex &&
        index < page.maxIndex && <MovieItem key={index} movie={movie} />
      );
    });
  };

  return (
    <div id="nowShowing" className="container sm:pt-[82px] pb-2 mb-5 ">
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
