import React from "react";
import MovieDetailSchedule from "./MovieDetailSchedule";
import MovieDetail from "./MovieDetail";

export default function DetailPage() {
  return (
    <div>
      <MovieDetail />
      <MovieDetailSchedule />
    </div>
  );
}
