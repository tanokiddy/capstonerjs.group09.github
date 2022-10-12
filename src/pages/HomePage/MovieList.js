import React, { useState, useEffect } from "react";
import { movieServ } from "../../services/movieService";
import MovieItem from "./MovieItem";

export default function MovieList() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    movieServ
      .getListMovie()
      .then((res) => {
        console.log(res);
        setMovie(res.data.content);
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
    <div className="grid grid-cols-5 gap-4 container mx-auto">
      {renderMovie()}
    </div>
  );
}
