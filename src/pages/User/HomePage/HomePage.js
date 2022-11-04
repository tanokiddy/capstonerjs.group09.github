import React from "react";
import "antd/dist/antd.min.css";
import MovieTab from "./MovieTab";
import MovieList from "./MovieList";
import CarouselHome from "./CarouselHome";
import Footer from "../../../components/Footer/Footer";

export default function HomePage() {
  return (
    <div>
      <CarouselHome />
      <MovieList />
      <MovieTab />
      <Footer />
    </div>
  );
}
