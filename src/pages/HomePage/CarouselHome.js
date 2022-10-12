import { Carousel } from "antd";
import React, { useState, useEffect } from "react";
import { movieServ } from "../../services/movieService";

export default function CarouselHome() {
  const [carousel, setCarousel] = useState([]);
  useEffect(() => {
    movieServ
      .getMovieBanner()
      .then((res) => {
        console.log(res);
        setCarousel(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderCarousel = () => {
    return carousel.map((carousel, index) => {
      return (
        <div className="w-full h-full">
          <img
            key={index}
            className="object-cover w-full h-full overflow-hidden"
            src={carousel.hinhAnh}
            alt=""
          />
        </div>
      );
    });
  };
  return (
    <div className="my-5 container">
      <Carousel dotPosition="left" autoplay>
        {renderCarousel()}
      </Carousel>
    </div>
  );
}
