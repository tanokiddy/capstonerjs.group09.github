import React from "react";
import "antd/dist/antd.min.css";
import TabMovie from "./TabMovie";
import MovieList from "./MovieList";
import CarouselHome from "./CarouselHome";
import Footer from "../../../components/Footer/Footer";

export default function HomePage() {
  return (
    <div>
      <CarouselHome />
      <MovieList />
      <TabMovie />
      <Footer />
    </div>
  );
}
