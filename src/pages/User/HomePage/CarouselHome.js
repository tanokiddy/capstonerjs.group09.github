import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { BsPlayFill } from "react-icons/bs";
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { movieServ } from "../../../services/movieService";

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
        <SwiperSlide className="relative" key={index}>
          <img
            src={carousel.hinhAnh}
            className="object-contain pb-[50px] pt-[82px]"
            alt=""
          />
          <BsPlayFill
            id="playBannerButton"
            type="button"
            style={{
              position: "absolute",
              top: "40%",
              color: "white",
              border: "4px solid white",
              borderRadius: "50%",
              opacity: 0.5,
              fontSize: "100px",
            }}
          />
        </SwiperSlide>
      );
    });
  };
  return (
    <div className="mx-auto container ">
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
        style={{ paddingTop: "" }}
      >
        {renderCarousel()}
      </Swiper>
    </div>
  );
}
