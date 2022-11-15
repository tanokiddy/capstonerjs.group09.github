import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { BsPlayFill } from "react-icons/bs";
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { getMovieBannerAction } from "../../../redux/actions/movieAction";

export default function CarouselHome() {
  //SET UP STATE AND CALL API TO GET DATA
  let dispatch = useDispatch();
  let carousel = useSelector((state) => state.movieReducer.banner);
  useEffect(() => {
    dispatch(getMovieBannerAction());
  }, []);

  //DECLEAR FUNCTION TO RENDER TO LAYOUT
  const renderCarousel = () => {
    return carousel.map((carousel, index) => {
      return (
        <SwiperSlide className="relative" key={index}>
          <img
            src={carousel.hinhAnh}
            className="w-full object-contain pb-[50px]"
            alt=""
          />
          <BsPlayFill
            id="playBannerButton"
            type="button"
            className="absolute sm:top-[40%] top-[45%] text-white border-4 border-white rounded-full opacity-50 xl:text-[150px] md:text-[120px] sm:text-[80px] text-[60px]"
            //
          />
        </SwiperSlide>
      );
    });
  };

  return (
    <div className="mx-auto">
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
