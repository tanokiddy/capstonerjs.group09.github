import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadingOffAction,
  loadingOnAction,
} from "../../redux/actions/loadingAction";
import { movieServ } from "../../services/movieService";
import MovieItem from "./MovieItem";
import { Pagination } from "antd";

export default function MovieList() {
  const [movie, setMovie] = useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingOnAction());
    movieServ
      .getListMovie()
      .then((res) => {
        console.log(res);
        setMovie(res.data.content);
        dispatch(loadingOffAction());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderMovie = () => {
    return movie.map((movie, index) => {
      return <MovieItem key={index} movie={movie} />;
    });
  };
  return (
    <div className="grid grid-cols-5 gap-4 container mx-auto pb-2">
      {renderMovie()}
      <Pagination />
    </div>
  );
}
