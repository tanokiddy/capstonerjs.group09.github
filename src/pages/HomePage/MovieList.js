import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";
import { movieServ } from "../../services/movieService";
import MovieItem from "./MovieItem";
import { Pagination } from "antd";

const pageSize = 10;
export default function MovieList() {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState({
    data: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });
  let dispatch = useDispatch();
  console.log("page", page);
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
      });
  }, []);
  const handleOnChange = (page1) => {
    setPage({
      ...page,
      current: page1,
      minIndex: (page1 - 1) * pageSize,
      maxIndex: page1 * pageSize,
    });
  };
  const renderMovie = () => {
    return movie?.map((movie, index) => {
      return (
        index >= page.minIndex &&
        index < page.maxIndex && <MovieItem key={index} movie={movie} />
      );
    });
  };
  return (
    <div id="nowShowing" className="container pt-20 pb-2 mb-5 ">
      <div className="grid grid-cols-5 gap-4 mx-auto mb-3 relative">
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
