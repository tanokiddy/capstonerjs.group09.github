import axios from "axios";
import React, { useState, useEffect } from "react";
import { TOKEN_CYBERSOFT } from "../../services/configURL";
import MovieItem from "./MovieItem";

export default function MovieList() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    axios({
      baseURL: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP04`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    })
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
