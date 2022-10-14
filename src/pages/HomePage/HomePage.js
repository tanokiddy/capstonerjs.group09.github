import React from "react";
import "antd/dist/antd.min.css";
import TabMovie from "./TabMovie";
import MovieList from "./MovieList";
import Footer from "../../components/Footer/Footer";
import CarouselHome from "./CarouselHome";

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
