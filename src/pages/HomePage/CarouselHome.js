import React, { useState, useEffect } from "react";
import { movieServ } from "../../services/movieService";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

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
        <SwiperSlide key={index}>
          <img src={carousel.hinhAnh} className="h-full" alt="" />
        </SwiperSlide>
      );
    });
  };
  return (
    <div className="mb-5 mx-auto">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {renderCarousel()}
      </Swiper>
    </div>
  );
}
